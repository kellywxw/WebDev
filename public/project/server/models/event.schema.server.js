module.exports = function(mongoose) {
    var EventSchema = mongoose.Schema({
        userId: String,
        title: String,
        poster: String,
        location: String,
        start: {type: Date},
        end: {type: Date},
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now},
    }, {collection: 'event'});

    return EventSchema;
};