var users = require("./user.mock.json");

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
        user._id = getId();
        users.push(user);
        return users;
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
            if(users[i].username == credentials.username &&
               users[i].password == credentials.password) {
                user = users[i];
                break;
            }
        }
        return user;
    }

    function updateUser(userId, user) {
        for (var i = 0; i < users.length; i++) {
            if(users[i]._id == userId) {
                for (var property in user) {
                    users[i][property] = user[property];
                }
                break;
            }
        }
    }

    function deleteUser(userId) {
        for (var i = 0; i < users.length; i++) {
            if(users[i]._id == userId) {
                users.splice(i,1);
                break;
            }
        }
    }

    function getId() {
        var day = new Date();
        var id = day.getTime();
        return id;
    }

}

