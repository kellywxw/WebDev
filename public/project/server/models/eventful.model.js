var events = require("./eventful.mock.json");
var guid = require("guid");

module.exports = function(app) {
    var api = {
        createEvent : createEvent,
        findEventByEventfulId : findEventByEventfulId,
        findEventsByEventfulIds : findEventsByEventfulIds
    };
    return api;

    function createEvent(event) {
        var newEvent = {
            _id: guid.create(),
            poster: event.url,
            title: event.title,
            location: event.city_name,
            startDate: event.start_time,
            endDate: event.stop_time,
            eventfulId: event.id
        }
        events.push(newEvent);
        console.log(events);
        return newEvent;
    }

    function findEventByEventfulId(eventfulId) {
        for(var i in events) {
            if(events[i].eventfulId == eventfulId) {
                return events[i];
            }
        }
        return null;
    }

    function findEventsByEventfulIds (eventfulIds) {
        console.log(123);
        var output = [];
        for (var i in eventfulIds) {
            var event= findEventByEventfulId(eventfulIds[i]);
            if (event) {
                output.push({
                    _id: event._id,
                    poster: event.poster,
                    title: event.title,
                    location: event.location,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    eventfulId: event.eventfulId
                });
            }
        }
        console.log(output);
        return ouput;
    }
}

