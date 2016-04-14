var passport = require('passport');
var LocalStrategy_Project = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel, evdbModel) {
    var auth = authenticated;

    app.post("/api/project/login", passport.authenticate('projectLocal'), login);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);
    app.post("/api/project/register", register);
    app.get("/api/project/profile/user/:userId", auth, getProfile);
    app.get("/api/project/follow/user/:userId", auth, getFollow);
    app.put("/api/project/user/:userId", auth, updateUser);
    app.delete("/api/project/user/:userId", auth, deleteUser);

    app.post("/api/project/follow/:userId1/follow/:userId2", auth, meFollowsUser);
    app.post("/api/project/follow/:userId1/unfollow/:userId2", auth, meUnfollowsUser);

    passport.use('projectLocal', new LocalStrategy_Project(localStrategy));

    function localStrategy(username, password, done) {
        // lookup user by username only. cant compare password since it's encrypted
        userModel
            .findChopChopUserByUsername(username)
            .then(
                function(user) {
                    // if the user exists, compare passwords with bcrypt.compareSync
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function authenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/#login');
            res.send(401);
        }
    }

    function login(req, res) {
        var user = req.user;
        if(user.likes) {
            res.json(user);
        }
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        userModel
            .findChopChopUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createChopChopUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getProfile(req, res) {
        var userId = req.params.userId;
        var user = null;

        userModel
            .findChopChopUserById(userId)
            .then(
                function(doc) {
                    user = doc;
                    return evdbModel.findEventsByEvdbIds(user.likes);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                // fetch events this user likes
                function (events) {

                    // list of events this user likes
                    // events are not stored in database
                    // only added for UI rendering
                    user.likeEvents = events;
                    res.json(user);
                },

                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    /*
     find all users this user follows
     find all users following this user
     */
    function getFollow (req, res) {
        var userId = req.params.userId;
        var user = null;

        userModel
        // find user
            .findChopChopUserById(userId)
            .then (
                function (doc) {
                    user = doc;
                    if (doc) {
                        return userModel.findChopChopUsersByIds(user.follows);
                    } else {
                        res.json ({});
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then (
                // fetch users this user follows
                function (users) {
                    user.userFollows = users;
                    return userModel.findChopChopUsersByIds(user.followsMe);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then (
                // fetch users following this user
                function (users) {
                    user.userFollowsMe = users;
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;

        userModel
            .findChopChopUserById(userId)
            .then(
                function(user) {
                    if (newUser.password != user.password) {
                        newUser.password = bcrypt.hashSync(newUser.password);
                    }
                    return newUser;
                }
            )
            .then(function(newUser){
                    return userModel.updateChopChopUser(userId, newUser);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    return userModel.findAllChopChopUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    return userModel.findChopChopUserById(userId);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    req.session.user = user;
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteChopChopUser(userId)
            .then(
                function(user){
                    return userModel.findAllChopChopUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    /*
     user1 (me) follows user2
     - add user2 to user1.follows
     - add user1 to user2.followsMe
     */
    function meFollowsUser(req, res) {
        var user2  = req.body;
        var userId1 = req.params.userId1;

        userModel
            .meFollowsUser_user(userId1, user2)
            // add user1 to user2.followsMe
            .then(
                function (user2) {
                    return userModel.meFollowsUser_me(userId1, user2);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add user2 to user1.follows
            .then(
                function (user1) {
                    res.json(user1);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function meUnfollowsUser(req, res) {
        var userId1 = req.params.userId1;
        var userId2 = req.params.userId2;

        userModel
            .meUnFollowsUser_user(userId1, userId2)
            // remove user1 from user2.followsMe
            .then(
                function (user2) {
                    return userModel.meUnFollowsUser_me(userId1, userId2);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // remove user2 from user1.follows
            .then(
                function (user1) {
                    res.json(user1);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}