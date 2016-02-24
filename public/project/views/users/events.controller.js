(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("EventController", EventController);

    function EventController($scope, $rootScope, $location, EventService) {
        $scope.$location = $location;

        var user = $rootScope.user;

        function loadEvents() {
            EventService.findAllEventsForUser(user._id, callback);

            function callback (events) {
                $scope.events = events;
            };
        }

        loadEvents();

        $scope.addEvent = function addEvent() {
            EventService.createEventForUser(user._id, $scope.event, callback);

            function callback (event) {
                $scope.events.push(event);
            };
        }

        $scope.updateEvent = function updateEvent() {
            EventService.updateEventById($scope.event._id, $scope.event, callback);

            function callback (events) {
                $scope.events = events;
            };
        }

        $scope.selectEvent = function selectEvent(index) {
            var event = $scope.events[index];
            $scope.event = event;
        }

        $scope.deleteEvent = function deleteEvent(index) {
            var eventId  = $scope.events[index]._id;
            EventService.deleteEventById(eventId, callback);

            function callback (events) {
                $scope.events = events;
            };
        }
    }
})();

