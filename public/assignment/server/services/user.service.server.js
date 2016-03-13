module.exports = function(app, model) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user/user?username=username", findUserByUsername);
    app.get("/api/assignment/user/user?username=alice&password=wonderland", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res) {
        var user = req.body;
        var users = model.createUser(user);
        res.json(users);
    }

    function findAllUsers(req, res) {
        var users = model.findAllUsers();
        res.json(users);
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = model.findUserById(userId);
        res.json(user);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        var user = model.findUserByUsername(username);
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        var user = model.findUserByCredentials(credentials);
        res.json(user);
    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        model.updateUser(userId,user);
        var users = model.findAllUsers();
        res.json(users);
    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        model.deleteUser(userId);
        var users = model.findAllUsers();
        res.json(users);
    }
}
