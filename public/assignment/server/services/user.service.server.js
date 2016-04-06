var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function(app, userModel) {
    var auth = authorized;

    app.get("/api/assignment/login", passport.authenticate('local'), login);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post  ('/api/assignment/register', register);

    app.post("/api/assignment/user", auth, createUser);
    app.get("/api/assignment/user", auth, findAllUsers);
    app.get("/api/assignment/user/:id", auth, findUserById);
    app.put("/api/assignment/user/:id", auth, updateUser);
    app.delete("/api/assignment/user/:id", auth, deleteUser);


    app.post("/api/assignment/admin/user", auth, createUserByAdmin);
    app.get("/api/assignment/admin/user", auth, findAllUsersByAdmin);
    app.get("/api/assignment/admin/user/:userId", auth, findUserByIdByAdmin);
    app.put("/api/assignment/admin/user/:userId", auth, updateUserByAdmin);
    app.delete("/api/assignment/admin/user/:userId", auth, deleteUserByAdmin);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
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

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user, return all the users
                        return userModel.createUser(newUser);
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

    function findAllUsers(req, res) {
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

    function findUserById(req, res) {
        var userId = req.params.id;
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

    function updateUser(req, res) {
        var userId = req.params.id;
        var newUser = req.body;

        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .updateUser(userId,newUser)
            .then(
                function(users) {
                    req.session.user = user;
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        userModel
            .deleteUser(userId)
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function isAdmin(user, req, res, next) {
        if(user.roles.indexOf("admin") > 0 && loggedin(req, res)) {
            next();
        }
        res.send(403);
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function createUserByAdmin(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user, return all the users
                        return userModel.createUser(newUser);
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

    function findAllUsersByAdmin(req, res) {
        if(isAdmin(req.user)) {
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
        } else {
            res.status(403);
        }
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

    function updateUserByAdmin(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;

        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .updateUser(userId,newUser)
            .then(
                function(users) {
                    req.session.user = user;
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserByAdmin(req, res) {
        var userId = req.params.userId;
        if(isAdmin(req.user)) {
            userModel
                .deleteUser(userId)
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }
}
