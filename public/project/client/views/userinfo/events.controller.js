(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("EventController", EventController);

    function EventController($rootScope, $location, EventService) {
        var model = this;
        model.addEvent = addEvent;
        model.updateEvent = updateEvent;
        model.selectEvent= selectEvent;
        model.deleteEvent = deleteEvent;
        model.sortEvent = sortEvent;

        model.$location = $location;

        var user = $rootScope.user;


        function loadEventsForUser() {
            EventService
                .findAllEventsForUser(user._id)
                .then(eventsLoad);

            function eventsLoad (events) {
                console.log(events);
                model.events = events;
            };
        }

        if(user != null) {
            loadEventsForUser();
        }

        function addEvent() {
            EventService
                .createEventForUser(user._id, model.newEvent)
                .then(eventAdd);

            function eventAdd (events) {
                loadEventsForUser();
                model.newEvent = null;
            };
        }

        function updateEvent() {
            var event = model.selectedEvent;
            EventService
                .updateEventById(event._id, model.newEvent)
                .then(eventUpdate);

            function eventUpdate () {
                loadEventsForUser();
                model.selectedEvent = null;
                model.newEvent = null;
            };
        }

        function selectEvent(index) {
            var event = model.events[index];

            model.selectedEvent = event;

            model.newEvent = {
                image: event.image,
                title : event.title,
                location: event.location,
                startDate: event.startDate,
                endDate: event.endDate,
                userId : event.userId
            }
        }

        function deleteEvent(index) {
            var eventId  = model.events[index]._id;
            EventService
                .deleteEventById(eventId)
                .then(loadEventsForUser);
        }

        function sortEvent(start, end) {
            EventService
                .sortEvent(user._id, start, end)
                .then(
                    function (response) {
                        console.log(response);
                        model.events = response;
                    },
                    function (err) {
                        model.error = err;
                    }
                );
        }
    }
})();

