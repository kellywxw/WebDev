module.exports = function(mongoose) {

    var FieldSchema = mongoose.Schema({
        label: String,
        type: {
            type: String,
            default: "TEXT",
            enum: ["TEXT", "TEXTAREA", "EMAIL", "PASSWORD", "DATE", "OPTIONS", "RADIOS", "CHECKBOXES"]
        },
        placeholder: String,
        options: [{label: String, value: String}],
    }, {collection: 'field'});

    return FieldSchema;
};