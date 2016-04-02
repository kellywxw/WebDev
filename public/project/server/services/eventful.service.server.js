module.exports = function(app, evdbModel, userModel) {
    app.post("/api/project/user/:userId/evdb/:evdbId", userLikesEvent);
    app.get("/api/project/evdb/:evdbId/user", findUserLikes);

    /*
    user likes event
    - add user to event.likes
    - add event to user.likes
    */
    function userLikesEvent(req, res) {
        var evdbEvent  = req.body;
        var userId = req.params.userId;
        var evdbId = req.params.evdbId;
        var event;


        evdbModel
            .userLikesEvent(userId, evdbEvent)
            // add user to event likes
            .then(
                function (event) {
                    console.log("evdb service: userLikesEvent-add user to event likes");
                    console.log(event);
                    return userModel.userLikesEvent(userId, event);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add event to user likes
            .then(
                function (user) {
                    console.log("evdb service: userLikesEvent -add event to user likes");
                    console.log(user);
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    /*
    find all users like this event
     */
    function findUserLikes (req, res) {
        var evdbId = req.params.evdbId;

        var event = null;
        evdbModel
            .findEventByEvdbId(evdbId)
            .then (
                function (doc) {
                    event = doc;
                    if (doc) {
                        console.log("evdb service: findUserLikes - event.likes");
                        console.log(doc.likes);
                        return userModel.findUsersByIds(event.likes);
                    } else {
                        res.json ({});
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then (
                function (users) {
                    event.userLikes = users;
                    console.log("evdb service: findUserLikes - event.userLikes");
                    console.log(users);
                    res.json(event);
                },
                function (err) {
                    console.log("failed:evdb service: findUserLikes - event.userLikes");
                    res.status(400).send(err);
                }
            );
    }
}
