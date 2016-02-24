(function() {
    "use strict";
    angular
        .module("ChopChopApp")
        .factory("EventService", EventService);


    function EventService($http) {
        var events = [
            {"_id": "000", "image": "","title": "Party", "location": "seattle", "date": "today", "userId": 123},
            {"_id": "010", "image": "","title": "Birthday", "location": "seattle", "date": "today", "userId": 123},
            {"_id": "020", "image": "","title": "Graduation", "location": "seattle", "date": "today", "userId": 234},
        ];

        var api = {
            createEventForUser : createEventForUser,
            findAllEventsForUser : findAllEventsForUser,
            deleteEventById : deleteEventById,
            updateEventById : updateEventById
        };
        return api;

        function createEventForUser(userId, event, callback) {
            event._id = getId();
            event.useId = userId;
            events.push(event);
            callback(event);
        }

        function findAllEventsForUser(userId, callback) {
            var output = [];
            for (var i = 0; i < events.length; i++) {
                if(events[i].userId == userId ) {
                    output.push(events[i]);
                }
            }
            callback(output);
        }

        function deleteEventById(eventId, callback) {
            for (var i = 0; i < events.length; i++) {
                if(events[i]._id == eventId) {
                    events.splice(i,1);
                    break;
                }
            }
            callback(events);
        }


        function updateEventById(eventId, newEvent, callback) {
            for (var i = 0; i < events.length; i++) {
                if(events[i]._id == eventId) {
                    for (var property in newEvent) {
                        events[i][property] = newEvent[property];
                    }
                    break;
                }
            }
            callback(events[i]);
        }

        function getId() {
            var day = new Date();
            var id = day.getTime();
            return id;
        }
    }
})();
