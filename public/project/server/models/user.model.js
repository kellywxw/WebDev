var users = require("./user.mock.json");
var guid = require("guid");

module.exports = function(app) {
    var api = {
        createUser : createUser,
        findAllUsers : findAllUsers,
        findUsersByIds: findUsersByIds,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        updateUser : updateUser,
        deleteUser : deleteUser
    };
    return api;

    function createUser(user) {
        user._id = guid.create();
        var newUser = {
            _id: guid.create(),
            username: user.username,
            password: user.password,
            email: user.email
        }
        users.push(newUser);
        return users;
    }

    function findAllUsers() {
        return users;
    }

    function findUsersByIds(userIds) {
        var users = [];
        for (var u in userIds) {
            var user = findUserById (userIds[u]);
            if (user) {
                users.push ({
                    username: user.username,
                    _id: user._id
                });
            }
        }
        return users;
    }

    function findUserById(userId) {
        var user = null;
        for (var i = 0; i < users.length; i++) {
            if(users[i]._id == userId) {
                user = users[i];
                break;
            }
        }
        return user;
    }

    function findUserByUsername(username) {
        var user = null;
        for (var i = 0; i < users.length; i++) {
            if(users[i].username == username) {
                user = users[i];
                break;
            }
        }
        return user;
    }

    function findUserByCredentials(credentials) {
        var user = null;
        for (var i = 0; i < users.length; i++) {
            if(users[i].username == credentials.username &&
               users[i].password == credentials.password) {
                user = users[i];
                break;
            }
        }
        return user;
    }

    function updateUser(userId, updatedUser) {
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == userId) {
                for (var property in updatedUser) {
                    users[i][property] = updatedUser[property];
                }
                break;
            }
        }
        return users;
    }

    function deleteUser(userId) {
        for (var i = 0; i < users.length; i++) {
            if(users[i]._id == userId) {
                users.splice(i,1);
                break;
            }
        }
        return users;
    }
}

