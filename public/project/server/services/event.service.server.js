module.exports = function(app, eventModel) {
    app.post("/api/project/user/:userId/event", createEventForUser);
    app.get("/api/project/event", findAllEvents);
    app.get("/api/project/user/:userId/event", findAllEventsForUser);
    app.get("/api/project/event/:eventId", findEventById);
    app.put("/api/project/event/:eventId", updateEventById);
    app.put("/api/project/user/:userId/event", updateEvents);
    app.delete("/api/project/event/:eventId", deleteEventById);

    function createEventForUser(req, res) {
        var userId = req.params.userId;
        var event = req.body;
        eventModel
            .createEventForUser(userId, event)
            .then(
                function(events) {
                    res.json(events);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllEvents(req, res) {
        eventModel
            .findAllEvents()
            .then(
                function(events) {
                    res.json(events);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllEventsForUser(req, res) {
        var userId = req.params.userId;
        eventModel
            .findAllEventsForUser(userId)
            .then(
                function(events) {
                    res.json(events);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findEventById(req, res) {
        var eventId = req.params.eventId;
        eventModel
            .findEventById(eventId)
            .then(
                function(event) {
                    res.json(event);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateEventById(req, res) {
        var eventId = req.params.eventId;
        var event = req.body;
        console.log("update");
        console.log(eventId);
        console.log(event);
        eventModel
            .updateEventById(eventId, event)
            .then(
                function(events) {
                    res.json(events);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteEventById(req, res) {
        var eventId = req.params.eventId;
        eventModel
            .deleteEventById(eventId)
            .then(
                function(events) {
                    res.json(events);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateEvents (req, res) {
        var userId = req.params.userId;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;

        if(startIndex && endIndex) {
            eventModel
                .sortEvent(userId, startIndex, endIndex)
                .then(
                    function(events) {
                        res.json(events);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        }
    }
}
