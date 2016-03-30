module.exports = function(mongoose) {

    var FieldSchema = mongoose.Schema({
        _id: String,
        label: String,
        type: {
            type: String,
            default: "TEXT",
            enum: ["TEXT", "TEXTAREA", "DATE", "OPTIONS", "RADIOS", "CHECKBOXES"]
        },
        placeholder: String,
        options: [{label: String, value: String}],
    }, {collection: 'field'});

    return FieldSchema;
};