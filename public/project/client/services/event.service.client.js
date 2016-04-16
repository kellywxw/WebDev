(function() {
    "use strict";
    angular
        .module("ChopChopApp")
        .factory("EventService", EventService);

    function EventService($http, $q) {
        var api = {
            createEventForUser : createEventForUser,
            findAllEventsForUser : findAllEventsForUser,
            findEventById : findEventById,
            findEventByTitle : findEventByTitle,
            updateEventById : updateEventById,
            deleteEventById : deleteEventById,
        };
        return api;

        function createEventForUser(userId, event) {
            var deferred = $q.defer();

            $http
                .post("/api/project/user/" + userId + "/event", event)
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findAllEventsForUser(userId) {
            var deferred = $q.defer();

            $http
                .get("/api/project/user/" + userId + "/event")
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findEventById(eventId) {
            var deferred = $q.defer();

            $http
                .get("/api/project/event/" + eventId)
                .success(function(response) {
                    deferred.resolve(response);
                })

            return deferred.promise;
        }

        function findEventByTitle(userId, eventTitle) {
            var deferred = $q.defer();

            $http
                .get("/api/project/user/"+ userId +"/event/" + eventTitle )
                .success(function(response) {
                    deferred.resolve(response);
                })

            return deferred.promise;
        }

        function updateEventById(eventId, newEvent) {
            var deferred = $q.defer();

            $http
                .put("/api/project/event/" + eventId, newEvent)
                .success(function(response) {
                    deferred.resolve(response);
                })

            return deferred.promise;
        }

        function deleteEventById(eventId) {
            var deferred = $q.defer();

            $http
                .delete("/api/project/event/" + eventId)
                .success(function(response){
                    deferred.resolve(response);
                })

            return deferred.promise;
        }
    }
})();
