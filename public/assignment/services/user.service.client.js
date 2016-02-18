(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);


    function UserService($http, $q) {
        var users = [
            {"_id":123, "firstName":"Alice",  "lastName":"Wonderland","username":"alice",  "password":"alice"},
            {"_id":234, "firstName":"Bob",    "lastName":"Hope",      "username":"bob",    "password":"bob"},
            {"_id":345, "firstName":"Charlie","lastName":"Brown",     "username":"charlie","password":"charlie"},
            {"_id":456, "firstName":"Dan",    "lastName":"Craig",     "username":"dan",    "password":"dan"},
            {"_id":567, "firstName":"Edward", "lastName":"Norton",    "username":"ed",     "password":"ed"}
        ];

        var api = {
            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        };
        return api;

        function findUserByUsernameAndPassword(username, password, callback) {
            var deferred = $q.defer();

            $http
                .get("/api/assignment/user?username="+ username + "&password=" + password)
                .success(function(callback) {
                    deferred.resolve(callback);
                });

            return deferred.promise;
        }

        function findAllUsers(callback) {
            var deferred = $q.defer();

            $http
                .get("/api/assignment/user")
                .success(function(callback) {
                    deferred.resolve(callback);
                });

            return deferred.promise;
        }

        function createUser(user, callback) {
            var deferred = $q.defer();

            $http
                .post("/api/assignment/user", user)
                .success(function(callback) {
                    deferred.resolve(callback);
                });

            return deferred.promise;
        }

        function deleteUserById(userId, callback) {
            var deferred = $q.defer();

            $http
                .delete("/api/assignment/user/" + userId)
                .success(function(callback){
                    deferred.resolve(callback);
                })

            return deferred.promise;
        }

        function updateUser(userId, user, callback) {
            var deferred = $q.defer();

            $http
                .put("/api/assignment/user/" + userId, user)
                .success(function(callback) {
                    deferred.resolve(callback);
                })

            return deferred.promise;
        }
    }
})();