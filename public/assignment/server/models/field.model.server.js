var q = require("q");

module.exports = function(mongoose, db, formModel) {
    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var Field = mongoose.model('Field', FieldSchema);
    var Form = formModel.getFormModel();

    var api = {
        createFieldForForm : createFieldForForm,
        getFieldsForForm : getFieldsForForm,
        getFieldForForm : getFieldForForm,
        updateField : updateField,
        deleteFieldFromForm : deleteFieldFromForm,
        sortField: sortField
    };
    return api;

    function createFieldForForm(formId, field) {
        var deferred = q.defer();

        Form.findById(formId)
            .then(function(form) {
                form.fields.push(field);
                form.save(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc.fields);
                    }
                });
            });

        return deferred.promise;
    }


    function getFieldsForForm(formId) {
        var deferred = q.defer();

        Form.findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form.fields);
            }
        });

        return deferred.promise;
    }

    function getFieldForForm(formId, fieldId) {
        var deferred = q.defer();

        Form.findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                var fields = form.fields;
                for (var i = 0; i < fields.length; i++) {
                    if(fields[i]._id == fieldId) {
                        deferred.resolve(fields[i]);
                        break;
                    }
                }
            }
        });

        return deferred.promise;
    }

    function updateField(formId, fieldId, newField) {
        var deferred = q.defer();

        Form.findById(formId)
            .then (function(form) {
                var fields = form.fields;
                for (var i = 0; i < fields.length; i++) {
                    if(fields[i]._id == fieldId) {
                        for (var property in newField) {
                            fields[i][property] = newField[property];
                        }
                        break;
                    }
                }
                form.save(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc.fields);
                    }
                });
            });

        return deferred.promise;

    }

    function deleteFieldFromForm(formId, fieldId) {
        var deferred = q.defer();

        Form.findById(formId)
            .then (function(form) {
                var fields = form.fields;
                for (var i = 0; i < fields.length; i++) {
                    if(fields[i]._id == fieldId) {
                        fields.splice(i,1);
                        break;
                    }
                }
                form.save(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc.fields);
                    }
                });
            });

        return deferred.promise;
    }

    function sortField(formId, startIndex, endIndex) {
        var deferred = q.defer();

        Form.findById(formId)
            .then(
                function(form) {
                    form.fields.splice(endIndex, 0, form.fields.splice(startIndex, 1)[0]);

                    form.markModified("fields");

                    form.save(function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            );

        return deferred.promise;
    }
}