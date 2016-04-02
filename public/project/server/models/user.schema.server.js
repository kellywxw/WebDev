module.exports = function(mongoose) {
    var EventSchema = require("./event.schema.server.js")(mongoose);

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        // evdb ids of movies this user likes
        likes: [String],
        // events this user likes
        likeEvents: [EventSchema],
    }, {collection: 'ChopChopUser'});

    return UserSchema;
};