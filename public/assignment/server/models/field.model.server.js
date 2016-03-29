var q = require("q");
var Form = require("./form.model.server")(app, mongoose, db);

module.exports = function(app, mongoose, db) {
    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var Field = mongoose.model('Field', FieldSchema);

    var api = {
        createFieldForForm : createFieldForForm,
        getFieldsForForm : getFieldsForForm,
        getFieldForForm : getFieldForForm,
        updateField : updateField,
        deleteFieldFromForm : deleteFieldFromForm
    };
    return api;

    function createFieldForForm(formId, field) {
        var field = new Field ({
            label: field.label,
            type: field.type,
            placeholder: field.placeholder,
            options: field.options
        });

        var deferred = q.defer();

        var form = Form.findFormById(formId);
        form.fields.push(field);

        form.save(function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function getFieldsForForm(formId) {
        var form = findFormById(formId);
        if(form != null) {
            return form.fields;
            console.log(form.fields);
        }
        return null;
    }

    function getFieldForForm(formId, fieldId) {
        var fields = getFieldsForForm(formId);
        var field = null;
        for (var i = 0; i < fields.length; i++) {
            if(fields[i]._id == fieldId) {
                field = fields[i];
                break;
            }
        }
        return field;
    }

    function updateField(formId, fieldId, newField) {
        var fields = getFieldsForForm(formId, fieldId);
        for (var i = 0; i < fields.length; i++) {
            if(fields[i]._id == fieldId) {
                for (var property in newField) {
                    fields[i][property] = newField[property];
                }
                break;
            }
        }
        return fields;
    }

    function deleteFieldFromForm(formId, fieldId) {
        var form = findFormById(formId);
        var fields = form.fields;
        for (var i = 0; i < fields.length; i++) {
            if(fields[i]._id == fieldId) {
                fields.splice(i,1);
                break;
            }
        }
        return form.fields;
    }

}

