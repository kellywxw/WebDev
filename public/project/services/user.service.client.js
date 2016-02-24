(function() {
    "use strict";
    angular
        .module("ChopChopApp")
        .factory("UserService", UserService);


    function UserService() {
        var users = [
            {"_id":123, "firstName":"Alice", "lastName":"Wonderland", "username":"alice", "password":"alice", "events": ["lala","haha"]},
            {"_id":234, "firstName":"Bob", "lastName":"Hope", "username":"bob", "password":"bob", "events": ["lala"]},
            {"_id":345, "firstName":"Charlie", "lastName":"Brown", "username":"charlie","password":"charlie", "events": ["lol"]},
            {"_id":456, "firstName":"Dan", "lastName":"Craig", "username":"dan", "password":"dan", "events": ["party", "birthday"]},
            {"_id":567, "firstName":"Edward", "lastName":"Norton", "username":"ed", "password":"ed", "events": ["graduation"]}
        ];

        var api = {
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        };
        return api;

        function findUserByCredentials(username, password, callback) {
            var output = null;
            for (var i = 0; i < users.length; i++) {
                if(users[i].username == username && users[i].password == password) {
                    output = users[i];
                    break;
                }
            }
            callback(output);
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            user._id = getId();
            users.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback) {
            for (var i = 0; i < users.length; i++) {
                if(users[i]._id == userId) {
                    users.splice(i,1);
                    break;
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback) {
            for (var i = 0; i < users.length; i++) {
                if(users[i]._id == userId) {
                    for (var property in user) {
                        users[i][property] = user[property];
                    }
                    break;
                }
            }
            callback(users[i]);
        }

        function getId() {
            var day = new Date();
            var id = day.getTime();
            return id;
        }
    }
})();