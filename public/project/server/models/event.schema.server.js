module.exports = function(mongoose) {
    var EventSchema = mongoose.Schema({
        userId: String,
        title: String,
        poster: String,
        location: String,
        startDate: {type: Date},
        endDate: {type: Date},
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now},
    }, {collection: 'event'});

    return EventSchema;
};