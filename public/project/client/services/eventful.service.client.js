(function() {
    "use strict";
    angular
        .module("ChopChopApp")
        .factory("EvdbService", EvdbService);


    function EvdbService($http, $q) {
        var api = {
            userLikesEvent : userLikesEvent,
            findUserLikes: findUserLikes
        };
        return api;

        function userLikesEvent(userId, event) {
            var deferred = $q.defer();

            $http
                .post("/api/project/user/"+userId+"/evdb/"+event.id, event)
                .success(function(response){
                    console.log(123);
                    deferred.resolve(response);
                })

            return deferred.promise;
        }

        function findUserLikes (evdbId) {
            var deferred = $q.defer();

            $http
                .get("/api/project/evdb/"+evdbId+"/user")
                .success(function(response){
                    deferred.resolve(response);
                })

            return deferred.promise;
        }
    }
})();
