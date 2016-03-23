(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("EventController", EventController);

    function EventController($rootScope, $location, EventService, UserService) {
        var model = this;
        model.addEvent = addEvent;
        model.updateEvent = updateEvent;
        model.selectEvent= selectEvent;
        model.deleteEvent = deleteEvent;

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

        function loadLikedEventsForUser() {
            UserService
                .findUserById(user._id)
                .then(likedEventsLoad);

            function likedEventsLoad(user) {
                console.log(user.likesEvents);
                model.likesEvents = user.likesEvents;
            };
        }

        if(user != null) {
            loadEventsForUser();
            //loadLikedEventsForUser();
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
                _id : event._id,
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
    }
})();

