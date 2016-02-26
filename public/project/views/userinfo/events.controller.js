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
                $scope.event = null;
            };
        }

        $scope.updateEvent = function updateEvent() {
            var form = $scope.selectedEvent;
            EventService.updateEventById($scope.event._id, $scope.event, callback);

            function callback (events) {
                $scope.selectedEvent = null;
            };
        }

        $scope.selectForm = function selectForm(index) {
            var event = $scope.events[index];

            $scope.selectedEvent = event;

            $scope.event = {
                _id : event._id,
                image: event.image,
                title : event.title,
                location: event.location,
                date: event.date,
                userId : event.userId
            }
        }

        $scope.deleteEvent = function deleteEvent(index) {
            var eventId  = $scope.events[index]._id;
            EventService.deleteEventById(eventId, callback);
            loadEvents();

            function callback (events) {
                $scope.events = events;
            };
        }
    }
})();

