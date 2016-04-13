var q = require("q");

module.exports = function(mongoose, db) {
    var EventSchema = require("./event.schema.server.js")(mongoose);
    var Event = mongoose.model('Event', EventSchema);

    var api = {
        createEventForUser : createEventForUser,
        findAllEvents : findAllEvents,
        findAllEventsForUser : findAllEventsForUser,
        findEventById : findEventById,
        findEventByTitle : findEventByTitle,
        updateEventById : updateEventById,
        deleteEventById : deleteEventById,
        sortEvent: sortEvent
    };
    return api;

    function createEventForUser(userId, event) {
        var event = new Event ({
            poster: event.poster,
            title: event.title,
            location: event.location,
            start: event.start,
            end: event.end,
            userId: userId
        });

        var deferred = q.defer();

        event.save(function (err, doc) {
            if (err) {
                deferred.reject(err)
            } else {
                Event.find(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function findAllEvents() {
        var deferred = q.defer();

        Event.find(function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllEventsForUser(userId) {
        var deferred = q.defer();

        Event.find({userId: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findEventById(eventId) {
        var deferred = q.defer();

        Event.findById(eventId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findEventByTitle(eventTitle) {
        var deferred = q.defer();

        Event.find({title: eventTitle}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateEventById(eventId, newEvent) {
        newEvent.updated = Date.now();

        var deferred = q.defer();

        Event.findByIdAndUpdate(eventId, newEvent, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                Event.find(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function deleteEventById(eventId) {
        var deferred = q.defer();

        Event.findByIdAndRemove(eventId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                Event.find(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function sortEvent(userId, startIndex, endIndex) {
        var deferred = q.defer();

        Event.find({userId: userId}, function (err, events) {
            if (err) {
                deferred.reject(err);
            } else {
                events.splice(endIndex, 0, events.splice(startIndex, 1)[0]);
                deferred.resolve(events);
            }
        });

        return deferred.promise;
    }
}

