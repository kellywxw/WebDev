module.exports = function(app, eventModel) {
    app.post("/api/project/user/:userId/event", createEventForUser);
    app.get("/api/project/event", findAllEvents);
    app.get("/api/project/user/:userId/event", findAllEventsForUser);
    app.get("/api/project/event/:eventId", findEventById);
    app.put("/api/project/event/:eventId", updateEventById);
    app.delete("/api/project/event/:eventId", deleteEventById);

    function createEventForUser(req, res) {
        var userId = req.params.userId;
        var event = req.body;
        var events = eventModel.createEventForUser(userId, event);
        res.json(events);
    }

    function findAllEvents(req, res) {
        var events = eventModel.findAllEvents();
        res.json(events);
    }

    function findAllEventsForUser(req, res) {
        var userId = req.params.userId;
        var events = eventModel.findAllEventsForUser(userId);
        res.json(events);
    }

    function findEventById(req, res) {
        var eventId = req.params.eventId;
        var event = eventModel.findEventById(eventId);
        res.json(event);
    }

    function updateEventById(req, res) {
        var eventId = req.params.eventId;
        var event = req.body;
        console.log(eventId);
        console.log(event);
        var events = eventModel.updateEventById(eventId, event);
        res.json(events);
    }

    function deleteEventById(req, res) {
        var eventId = req.params.eventId;
        var events = eventModel.deleteEventById(eventId);
        res.json(events);
    }
}
