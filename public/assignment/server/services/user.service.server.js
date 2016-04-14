var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel, chopchopUserModel) {
    var auth = authenticated;

    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/register", register);
    app.put("/api/assignment/user/:userId", auth, updateUser);

    app.post("/api/assignment/admin/user", auth, createUserByAdmin);
    app.get("/api/assignment/admin/user/:userId", auth, findUserByIdByAdmin);
    app.get("/api/assignment/admin/user", isAdmin, findAllUsersByAdmin);
    app.put("/api/assignment/admin/user/:userId", isAdmin, updateUserByAdmin);
    app.delete("/api/assignment/admin/user/:userId", isAdmin, deleteUserByAdmin);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        // lookup user by username only. cant compare password since it's encrypted
        userModel
            .findUserByUsername(username)
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

    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done) {
        // project
        if(user.email) {
            chopchopUserModel
                .findChopChopUserById(user._id)
                .then(
                    function(user){
                        delete user.password;
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        // assignment
        } else {
            userModel
                .findUserById(user._id)
                .then(
                    function(user){
                        delete user.password;
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }
    }

    function login(req, res) {
        if(!req.user.likes) {
            res.json(req.user);
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
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
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

    function updateUser(req, res) {
        var newUser = req.body;
        var userId = req.params.userId
        delete newUser.roles;

        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .findUserById(userId)
            .then(
                function(user) {
                    if (newUser.password != user.password) {
                        newUser.password = bcrypt.hashSync(newUser.password);
                    }
                    return newUser;
                }
            )
            .then(function(newUser){
                    return userModel.updateUser(userId, newUser);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    return userModel.findAllUsers();
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

    function createUserByAdmin(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }
        newUser.password = bcrypt.hashSync(newUser.password);

        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    function findUserByIdByAdmin(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsersByAdmin(req, res) {
        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

    function updateUserByAdmin(req, res) {
        var newUser = req.body;
        var userId = req.params.userId
        delete newUser.emails;

        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .findUserById(userId)
            .then(
                function(user) {
                    if (newUser.password != user.password) {
                        newUser.password = bcrypt.hashSync(newUser.password);
                    }
                    return newUser;
                }
            )
            .then(function(newUser){
                    return userModel.updateUserByAdmin(userId, newUser);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    return userModel.findAllUsers();
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

    function deleteUserByAdmin(req, res) {
        userModel
            .deleteUser(req.params.userId)
            .then(
                function(user){
                    return userModel.findAllUsers();
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

    function isAdmin(req, res, next) {
        if (req.isAuthenticated()) {
            userModel
                .findUserById(req.user._id)
                .then(function(user){
                    delete user.password;
                    if(user.roles.indexOf("admin") > -1) {
                        return next();
                    } else {
                        res.send(403);
                        res.redirect('/#login');
                    }
                })
        }
    }

    function authenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/#login');
            res.send(401);
        }
    }
}
