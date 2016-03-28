(function() {
    "use strict";
    angular
        .module("ChopChopApp")
        .factory("EventfulService", EventfulService);


    function EventfulService($http, $q) {
        var api = {
            userLikesEvent : userLikesEvent,
            findUserLikes: findUserLikes
        };
        return api;

        function userLikesEvent(userId, event) {
            var deferred = $q.defer();

            $http
                .post("/api/project/user/"+userId+"/eventful/"+event.eventfulId, event)
                .success(function(response){
                    console.log(response);
                    deferred.resolve(response);
                })

            return deferred.promise;
        }

        function findUserLikes (eventfulId) {
            var deferred = $q.defer();

            $http
                .get("/api/project/eventful/"+eventfulId+"/user")
                .success(function(response){
                    deferred.resolve(response);
                })

            return deferred.promise;
        }
    }
})();
