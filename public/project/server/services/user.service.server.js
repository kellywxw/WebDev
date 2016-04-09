module.exports = function(app, userModel, evdbModel) {
    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findUser);
    app.get("/api/project/user/:id", findUserById);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);

    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);

    function createUser(req, res) {
        var newUser = req.body;
        userModel
            .createUser(newUser)
            .then(
                function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username != null && password != null) {
            var credentials = {
                username: username,
                password: password
            }
            userModel
                .findUserByCredentials(credentials)
                .then(
                    function(user) {
                        req.session.user = user;
                        res.json(user);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        } else if (username != null) {
            userModel
                .findUserByUsername(username)
                .then(
                    function(user) {
                        res.json(user);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            userModel
                .findAllUsers()
                .then(
                    function(users) {
                        res.json(users);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = null;

        userModel
            .findUserById(userId)
            .then(
                function(doc) {
                    user = doc;
                    console.log(user.likes);
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
                    console.log(user);
                    res.json(user);
                },

                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        userModel
            .updateUser(userId,user)
            .then(function(users) {
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
                function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function loggedin(req, res) {
        res.json(req.session.user);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
}
