(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);


    function UserService($http, $q, $rootScope) {
        var api = {
            login : login,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout,
            register : register,
            updateUser : updateUser,

            createUser : createUser,
            findUserById : findUserById,
            findAllUsers : findAllUsers,
            updateUserByAdmin : updateUserByAdmin,
            deleteUserById : deleteUserById


        };
        return api;

        function login(user) {
            var deferred = $q.defer();

            $http
                .post("/api/assignment/login", user)
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function getCurrentUser() {
            var deferred = $q.defer();

            $http
                .get("/api/assignment/loggedin")
                .success(function(response){
                    deferred.resolve(response);
                })

            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();

            $http
                .post("/api/assignment/logout")
                .success(function(response){
                    deferred.resolve(response);
                })

            return deferred.promise;
        }

        function register(user) {
            var deferred = $q.defer();

            $http
                .post("/api/assignment/register", user)
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function updateUser(userId, user) {
            var deferred = $q.defer();

            $http
                .put("/api/assignment/user/" + userId, user)
                .success(function(response) {
                    deferred.resolve(response);
                })

            return deferred.promise;
        }

        function createUser(user) {
            var deferred = $q.defer();

            $http
                .post("/api/assignment/admin/user", user)
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findUserById(userId) {
            var deferred = $q.defer();

            $http
                .get("/api/assignment/admin/user/"+ userId)
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();

            $http
                .get("/api/assignment/admin/user")
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function updateUserByAdmin(userId, user) {
            var deferred = $q.defer();

            $http
                .put("/api/assignment/admin/user/" + userId, user)
                .success(function(response) {
                    deferred.resolve(response);
                })

            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();

            $http
                .delete("/api/assignment/admin/user/" + userId)
                .success(function(response){
                    deferred.resolve(response);
                })

            return deferred.promise;
        }

    }
})();