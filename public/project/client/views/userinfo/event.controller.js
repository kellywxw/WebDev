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

        function loadCalender() {
            var calendar = $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultView: 'month',
                selectable: true,
                events: model.events,

                select: function(start, end) {

                    var title = prompt('Event Title:');
                    if (title) {
                        calendar.fullCalendar('renderEvent',
                            {
                                title: title,
                                start: start,
                                end: end
                            },
                            true // make the event "stick"
                        );
                    }
                    calendar.fullCalendar('unselect');
                }
            });
        }

        function loadEventsForUser() {
            EventService
                .findAllEventsForUser(user._id)
                .then(eventsLoad)
                .then(function() {
                    loadCalender();
                });

            function eventsLoad (events) {
                console.log(events);
                model.events = events;

            };
        }



        if(user != null) {
            loadEventsForUser();
        }

        function addEvent() {
            $('#addEvent').click(function () {
                var event = {
                    title: model.newEvent.title,
                    start: model.newEvent.startDate,
                    end: model.newEvent.endDate,
                }
                $('#calendar').fullCalendar('renderEvent', event, 'stick');
            });

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
    }
})();

