module.exports = function(app, userModel, eventfulModel) {
    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findUser);
    app.get("/api/project/user/loggedin", loggedin);
    app.post("/api/project/user/logout", logout);
    app.get("/api/project/user/:id", findUserById);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);

    function createUser(req, res) {
        var newUser = req.body;
        var user = userModel.createUser(newUser);
        //req.session.user = user;
        res.json(user);
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username != null && password != null) {
            var credentials = {
                username: username,
                password: password
            }
            var user = userModel.findUserByCredentials(credentials);
            //req.session.user = user;
            res.json(user);
        } else if (username != null) {
            var user = userModel.findUserByUsername(username);
            res.json(user);
        } else {
            var users = userModel.findAllUsers();
            res.json(users);
        }
    }

    function loggedin(req, res) {
        res.json(req.session.user);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        var eventfulIds = user.likes;
        console.log(eventfulIds);
        var eventfulEvents = eventfulModel.findEventsByEventfulIds(eventfulIds);
        console.log(eventfulEvents);
        user.likesEvents = eventfulEvents;
        res.json(user);
    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        var updatedUser = userModel.updateUser(userId,user);
        res.json(updatedUser);
    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        var users = userModel.deleteUser(userId);
        res.json(users);
    }
}
