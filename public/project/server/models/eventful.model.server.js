var q = require("q");

module.exports = function(mongoose, db) {
    var EvdbSchema = require("./eventful.schema.server.js")(mongoose);
    var Evdb  = mongoose.model("Evdb", EvdbSchema);

    var api = {
        createEvent : createEvent,
        findEventByEvdbId : findEventByEvdbId,
        findEventsByEvdbIds : findEventsByEvdbIds,
        userLikesEvent: userLikesEvent
    };
    return api;

    function createEvent(event) {

        var event = new Evdb({
            evdbId: event.id,
            poster: event.image.url,
            title: event.title,
            location: event.venue,
            startDate: event.start_time,
            endDate: event.stop_time,
            likes: []
        });

        var deferred = q.defer();

        event.save(function (err, doc) {
            if (err) {
                deferred.reject(err)
            } else {
                console.log("evdb model createEvent:")
                console.log(doc);
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    function findEventByEvdbId(evdbId) {
        var deferred = q.defer();

        Evdb.findOne({evdbId: evdbId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findEventsByEvdbIds (evdbIds) {
        var deferred = q.defer();

        Evdb.find(
            {evdbId: {$in: evdbIds}},
            function (err, events) {
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log("evdb model findEventsByEvdbIds:");
                    console.log(events);
                    deferred.resolve(events);
                }
            })

        return deferred.promise;
    }

    function userLikesEvent (userId, event) {

        var deferred = q.defer();

        // find the event by evdbId
        Evdb.findOne({evdbId: event.id},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }

                // if there's an event
                if (doc) {
                    // add user to likes
                    doc.likes.push (userId);
                    // save changes
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            console.log("evdb model userLikesEvent:")
                            console.log(doc);
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    // if there's no event
                    // create a new instance
                    event = new Evdb({
                        evdbId: event.id,
                        poster: event.images.image[0].medium.url,
                        title: event.title,
                        location: event.city_name,
                        startDate: event.start_time,
                        endDate: event.stop_time,
                        likes: []
                    });
                    // add user to likes
                    event.likes.push (userId);
                    // save new instance
                    event.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            console.log("evdb model userLikesEvent:")
                            console.log(doc);
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }
}

