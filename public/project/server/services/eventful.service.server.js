module.exports = function(app, evdbModel, userModel) {
    app.get("/api/project/evdb/:evdbId/user", findUserLikes);
    app.post("/api/project/user/:userId/evdb/like/:evdbId", userLikesEvent);
    app.post("/api/project/user/:userId/evdb/unlike/:evdbId", userUnlikesEvent);

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
                        return userModel.findChopChopUsersByIds(event.likes);
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
                    res.json(event);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    /*
     user likes event
     - add user to event.likes
     - add event to user.likes
     */
    function userLikesEvent(req, res) {
        var evdbEvent  = req.body;
        var userId = req.params.userId;

        evdbModel
            .userLikesEvent(userId, evdbEvent)
            // add user to event likes
            .then(
                function (event) {
                    return userModel.userLikesEvent(userId, event);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add event to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function userUnlikesEvent(req, res) {
        var userId = req.params.userId;
        var evdbId = req.params.evdbId;

        evdbModel
            .userUnlikesEvent(userId, evdbId)
            // remove user from event likes
            .then(
                function (event) {
                    return userModel.userUnlikesEvent(userId, evdbId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // remove event from user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}
