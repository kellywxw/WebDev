module.exports = function(mongoose) {
    var EvdbSchema = require("./eventful.schema.server.js")(mongoose);

    var ChopChopUserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        // evdbIds of events this user likes
        likes: [String],
        // events this user likes
        likeEvents: [EvdbSchema],
        // userId of users this user follow
        follows: [String],
        // list of users this user follow
        userFollows: [
            {username: String}
        ],
        // userId of users following this user
        followsMe: [String],
        // list of users that following this suser
        userFollowsMe: [
            {username: String}
        ]
    }, {collection: 'ChopChopUser'});

    return ChopChopUserSchema;
};