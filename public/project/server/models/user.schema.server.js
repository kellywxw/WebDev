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
    }, {collection: 'ChopChopUser'});

    return ChopChopUserSchema;
};