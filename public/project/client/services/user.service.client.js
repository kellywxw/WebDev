(function() {
    "use strict";
    angular
        .module("ChopChopApp")
        .factory("UserService", UserService);

    function UserService($http, $q, $rootScope) {
        var api = {
            login : login,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout,
            register : register,
            getProfile : getProfile,
            getFollow : getFollow,
            updateUser : updateUser,
            deleteUserById : deleteUserById,

            meFollowsUser : meFollowsUser,
            meUnfollowsUser : meUnfollowsUser
        };
        return api;

        function login(user) {
            var deferred = $q.defer();

            $http
                .post("/api/project/login", user)
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

        function register(user) {
            var deferred = $q.defer();

            $http
                .post("/api/project/register", user)
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getProfile(userId) {
            var deferred = $q.defer();

            $http
                .get("/api/project/profile/user/"+ userId)
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getFollow(userId) {
            var deferred = $q.defer();

            $http
                .get("/api/project/follow/user/"+ userId)
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

        function meFollowsUser(userId1, user2) {
            var deferred = $q.defer();

            $http
                .post("/api/project/follow/"+userId1+"/follow/"+user2._id, user2)
                .success(function(response){
                    deferred.resolve(response);
                })

            return deferred.promise;
        }

        function meUnfollowsUser(userId1, userId2) {
            var deferred = $q.defer();

            $http
                .post("/api/project/follow/"+userId1+"/unfollow/"+userId2)
                .success(function(response){
                    deferred.resolve(response);
                })

            return deferred.promise;
        }

    }
})();