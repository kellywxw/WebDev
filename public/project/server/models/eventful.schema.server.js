module.exports = function(mongoose) {
    var EvdbSchema = mongoose.Schema({
        evdbId: String,
        title: String,
        poster: String,
        location: String,
        startDate: {type: Date},
        endDate: {type: Date},
        // ids of users that like this movie
        likes: [String],
        // list of users that like this movie
        userLikes: [
            {username: String}
        ]
    }, {collection: 'evdbEvent'});

    return EvdbSchema;
};