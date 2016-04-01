var q = require("q");

module.exports = function(mongoose, db) {
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var Form = mongoose.model('Form', FormSchema);

    var api = {
        createFormForUser : createFormForUser,
        findAllForms : findAllForms,
        findAllFormsForUser : findAllFormsForUser,
        findFormById : findFormById,
        findFormByTitle : findFormByTitle,
        updateFormById : updateFormById,
        deleteFormById : deleteFormById,
        getFormModel: getFormModel
    };
    return api;

    function createFormForUser(userId, form) {
        var form = new Form ({
            title: form.title,
            userId: userId,
            fields: []
        });

        var deferred = q.defer();

        form.save(function (err, doc) {
            if (err) {
                deferred.reject(err)
            } else {
                Form.find(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        console.log(doc);
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function findAllForms() {
        var deferred = q.defer();

        Form.find(function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllFormsForUser(userId) {
        var deferred = q.defer();

        Form.find({userId: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findFormById(formId) {
        var deferred = q.defer();

        Form.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findFormByTitle(formTitle) {
        var deferred = q.defer();

        Form.find({title: formTitle}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateFormById(formId, newForm) {
        newForm.updated = Date.now();

        var deferred = q.defer();

        Form.findByIdAndUpdate(formId, newForm, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                Form.find(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        console.log(doc);
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function deleteFormById(formId) {
        var deferred = q.defer();

        Form.findByIdAndRemove(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                Form.find(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        console.log(doc);
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function getFormModel() {
        return Form;
    }
}

