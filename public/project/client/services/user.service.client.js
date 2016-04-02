(function() {
    "use strict";
    angular
        .module("ChopChopApp")
        .factory("UserService", UserService);

    function UserService($http, $q, $rootScope) {
        var api = {
            createUser : createUser,
            findAllUsers : findAllUsers,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUserById : deleteUserById,

            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout
        };
        return api;

        function createUser(user) {
            var deferred = $q.defer();

            $http
                .post("/api/project/user", user)
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();

            $http
                .get("/api/project/user")
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findUserById(userId) {
            var deferred = $q.defer();

            $http
                .get("/api/project/user/"+ userId)
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findUserByUsername(username) {
            var deferred = $q.defer();

            $http
                .get("/api/project/user?username="+ username)
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findUserByCredentials(username, password) {
            var deferred = $q.defer();

            $http
                .get("/api/project/user?username="+ username + "&password=" + password)
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function updateUser(userId, user) {
            var deferred = $q.defer();

            $http
                .put("/api/project/user/" + userId, user)
                .success(function(response) {
                    deferred.resolve(response);
                })

            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();

            $http
                .delete("/api/project/user/" + userId)
                .success(function(response){
                    deferred.resolve(response);
                })

            return deferred.promise;
        }


        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function getCurrentUser() {
            var deferred = $q.defer();

            $http
                .get("/api/project/loggedin")
                .success(function(response){
                    deferred.resolve(response);
                })

            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();

            $http
                .post("/api/project/logout")
                .success(function(response){
                    deferred.resolve(response);
                })

            return deferred.promise;
        };

    }
})();