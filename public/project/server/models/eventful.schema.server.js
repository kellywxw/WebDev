module.exports = function(mongoose) {
    var EvdbSchema = mongoose.Schema({
        evdbId: String,
        title: String,
        poster: String,
        location: String,
        start: Date,
        end: Date,
        cost: String,
        // ids of users that like this event
        likes: [String],
        // list of users that like this event
        userLikes: [
            {username: String}
        ]
    }, {collection: 'evdbEvent'});

    return EvdbSchema;
};