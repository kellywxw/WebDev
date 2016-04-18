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

        model.$location = $location;

        var user = $rootScope.user;

        init();

        function init() {
            if(user != null) {
                EventService
                    .findAllEventsForUser(user._id)
                    .then(eventsLoad)
                    .then(function() {
                        loadEventsToCalendar();
                    });
            }

            function eventsLoad (events) {
                model.events = events;
                formatEvents(events);
            };
        }

// ------------------------------  Calendar   ------------------------------

        function loadEventsToCalendar() {
            $('#calendar').fullCalendar({
                timezone:'local',
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },

                defaultView: 'month',
                selectable: true,
                editable: true,
                events: model.renderEvents,

                eventClick: displayEventInCalendar
            });
        }

        function formatEvents(events) {
            model.renderEvents = [];

            for(var i in events) {
                var event = {
                    _id: events[i]._id,
                    poster: events[i].poster,
                    title : events[i].title,
                    location: events[i].location,
                    start: events[i].start,
                    end: events[i].end
                }

                model.renderEvents.push(event);
            }
        }

        function displayEventInCalendar(event) {
            if(event.start) {
                var startTime = moment(event.start).format('YYYY-MM-DD hh:mm A');
            }
            if(event.end) {
                var endTime = moment(event.end).format('YYYY-MM-DD hh:mm A');
            }

            $('#eventTitle').html(event.title);
            $('#eventPoster').attr('src', event.poster);
            $('#eventLocation').html(event.location);
            $('#eventStart').html(startTime);
            $('#eventEnd').html(endTime);
            $('#selectEvent').modal();
        }

// ------------------------------  Event List   ------------------------------


        function loadEventsForUser() {
            EventService
                .findAllEventsForUser(user._id)
                .then(eventsLoad);

            function eventsLoad (events) {
                model.events = events;
                formatEvents(events);
                $('#calendar').fullCalendar('removeEvents');
                $('#calendar').fullCalendar('addEventSource', model.renderEvents);
            };
        }

        function addEvent() {
            EventService
                .createEventForUser(user._id, model.newEvent)
                .then(eventAdd)
                .then($('#calendar').fullCalendar('renderEvent', model.newEvent, 'stick'));

            function eventAdd (events) {
                loadEventsForUser();
                model.newEvent = null;
            }
        }

        function updateEvent() {
            var eventId = model.selectedEvent._id;

            var event = {
                _id: eventId,
                poster: model.newEvent.poster,
                title : model.newEvent.title,
                location: model.newEvent.location,
                start: model.newEvent.start,
                end: model.newEvent.end
            }

            EventService
                .updateEventById(eventId, model.newEvent)
                .then(eventUpdate);

            function eventUpdate () {
                loadEventsForUser();
                model.selectedEvent = null;
                model.newEvent = null;
                $('#calendar').fullCalendar('removeEvents', eventId);
                $('#calendar').fullCalendar('renderEvent', event, 'stick');
            };
        }

        function selectEvent(index) {
            var event = model.events[index];

            model.selectedEvent = event;

            model.newEvent = {
                poster: event.poster,
                title : event.title,
                location: event.location,
                start: event.start,
                end: event.end,
                userId : event.userId
            }
        }

        function deleteEvent(index) {
            var eventId  = model.events[index]._id;

            EventService
                .deleteEventById(eventId)
                .then(loadEventsForUser)
                .then($('#calendar').fullCalendar('removeEvents', eventId));
        }
    }
})();

