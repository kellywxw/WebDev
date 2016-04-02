(function() {
    "use strict";
    angular
        .module("ChopChopApp")
        .factory("EvdbService", EvdbService);


    function EvdbService($http, $q) {
        var api = {
            findUserLikes: findUserLikes,
            userLikesEvent : userLikesEvent,
            userUnlikesEvent : userUnlikesEvent
        };
        return api;

        function findUserLikes (evdbId) {
            var deferred = $q.defer();

            $http
                .get("/api/project/evdb/"+evdbId+"/user")
                .success(function(response){
                    deferred.resolve(response);
                })

            return deferred.promise;
        }

        function userLikesEvent(userId, event) {
            var deferred = $q.defer();

            $http
                .post("/api/project/user/"+userId+"/evdb/like/"+event.id, event)
                .success(function(response){
                    deferred.resolve(response);
                })

            return deferred.promise;
        }

        function userUnlikesEvent(userId, eventId) {
            var deferred = $q.defer();

            $http
                .post("/api/project/user/"+userId+"/evdb/unlike/"+eventId)
                .success(function(response){
                    deferred.resolve(response);
                })

            return deferred.promise;
        }
    }
})();
