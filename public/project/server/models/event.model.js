var events = require("./event.mock.json");
var guid = require("guid");

module.exports = function(app) {
    var api = {
        createEventForUser : createEventForUser,
        findAllEvents : findAllEvents,
        findAllEventsForUser : findAllEventsForUser,
        findEventById : findEventById,
        findEventByTitle : findEventByTitle,
        updateEventById : updateEventById,
        deleteEventById : deleteEventById
    };
    return api;

    function createEventForUser(userId, event) {
        var newEvent = {
            _id: guid.create(),
            poster: event.poster,
            title: event.title,
            location: event.location,
            startDate: event.startDate,
            endDate: event.endDate,
            userId: userId
        }
        events.push(newEvent);
        console.log(events);
        return events;
    }

    function findAllEvents() {
        return events;
    }

    function findAllEventsForUser(userId) {
        var output = [];
        for (var i = 0; i < events.length; i++) {
            if(events[i].userId == userId ) {
                output.push(events[i]);
            }
        }
        return output;
    }

    function findEventById(eventId) {
        var event = null;
        for (var i = 0; i < events.length; i++) {
            if(events[i]._id == eventId) {
                event = events[i];
                break;
            }
        }
        return event;
    }

    function findEventByTitle(eventTitle) {
        var event = null;
        for (var i = 0; i < events.length; i++) {
            if(events[i].title == eventTitle) {
                event = events[i];
                break;
            }
        }
        return event;
    }

    function updateEventById(eventId, newEvent) {
        for (var i = 0; i < events.length; i++) {
            if(events[i]._id == eventId) {
                for (var property in newEvent) {
                    events[i][property] = newEvent[property];
                }
                break;
            }
        }
        console.log(events);
        return events;
    }

    function deleteEventById(eventId) {
        for (var i = 0; i < events.length; i++) {
            if(events[i]._id == eventId) {
                events.splice(i,1);
                break;
            }
        }
        console.log(events);
        return events;
    }
}

