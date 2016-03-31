module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);


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
        var user = req.body;
        userModel
            .updateUser(userId,user)
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
        console.log(123);
        req.session.destroy();
        res.send(200);
    }

}
