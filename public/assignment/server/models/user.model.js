var users = require("./user.mock.json");
var guid = require("guid");

module.exports = function(app) {
    var api = {
        createUser : createUser,
        findAllUsers : findAllUsers,
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
        return user;
    }

    function findAllUsers() {
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
            if(users[i].username === credentials.username &&
               users[i].password === credentials.password) {
                user = users[i];
                break;
            }
        }
        console.log(user);
        return user;
    }

    function updateUser(userId, user) {
        for (var i = 0; i < users.length; i++) {
            if(users[i]._id == userId) {
                users[i] = {
                    _id: userId,
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                }
                break;
            }
        }
        return users[i];
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

