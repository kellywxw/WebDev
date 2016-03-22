module.exports = function(app, eventfulModel, userModel) {
    app.post("/api/project/user/:userId/event/:eventfulId", userLikesEvent);
    app.get("/api/project/event/:eventfulId/user", findUserLikes);

    /*
    user likes event
    - add user to event.likes
    - add event to user.likes
    */
    function userLikesEvent(req, res) {
        var eventfulEvent  = req.body;
        var userId = req.params.userId;
        var eventfulId = req.params.eventfulId;

        // add this user to list of users like this event
        var event = eventfulModel.findEventByEventfulId(eventfulId);
        if(!event) {
            event = eventfulModel.createEvent(eventfulEvent);
        }
        if(!event.likes) {
            event.likes = [];
        }
        event.likes.push(userId);

        // add this event to list of events this user likes
        var user = userModel.findUserById(userId);
        if(!user.likes) {
            user.likes = [];
        }
        user.likes.push(eventfulId);
        console.log(user);
        console.log(event);
        res.send(200);
    }

    /*
    find all users like this event
     */
    function findUserLikes(req, res) {
        var eventfulId = req.params.eventfulId;
        console.log(eventfulId);
        var event = eventfulModel.findEventByEventfulId(eventfulId);
        if(event) {
            var userLikes = event.likes;
            console.log(userLikes);
            var users = userModel.findUsersByIds(userLikes);
            event.userLikes = users;
        }
        res.json(event);
    }
}
