var forms = require("./form.mock.json");
var guid = require("guid");

module.exports = function(app) {
    var api = {
        createFormForUser : createFormForUser,
        findAllForms : findAllForms,
        findAllFormsForUser : findAllFormsForUser,
        findFormById : findFormById,
        findFormByTitle : findFormByTitle,
        updateFormById : updateFormById,
        deleteFormById : deleteFormById,

        createFieldForForm : createFieldForForm,
        getFieldsForForm : getFieldsForForm,
        getFieldForForm : getFieldForForm,
        updateField : updateField,
        deleteFieldFromForm : deleteFieldFromForm
    };
    return api;

    function createFormForUser(userId, form) {
        var newForm = {
            _id: guid.create(),
            title: form.title,
            userId: userId
        }
        forms.push(newForm);
        return forms;
    }

    function findAllForms() {
        return forms;
    }

    function findAllFormsForUser(userId) {
        var output = [];
        for (var i = 0; i < forms.length; i++) {
            if(forms[i].userId == userId ) {
                output.push(forms[i]);
            }
        }
        return output;
    }

    function findFormById(formId) {
        var form = null;
        for (var i = 0; i < forms.length; i++) {
            if(forms[i]._id == formId) {
                form = forms[i];
                break;
            }
        }
        return form;
    }

    function findFormByTitle(formTitle) {
        var form = null;
        for (var i = 0; i < forms.length; i++) {
            if(forms[i].title == formTitle) {
                form = forms[i];
                break;
            }
        }
        return form;
    }

    function updateFormById(formId, newForm) {
        for (var i = 0; i < forms.length; i++) {
            if(forms[i]._id == formId) {
                for (var property in newForm) {
                    forms[i][property] = newForm[property];
                }
                break;
            }
        }
        return forms;
    }

    function deleteFormById(formId) {
        for (var i = 0; i < forms.length; i++) {
            if(forms[i]._id == formId) {
                forms.splice(i,1);
                break;
            }
        }
        return forms;
    }


    function createFieldForForm(formId, field) {
        var form = findFormById(formId);
        field._id = guid.create();
        form.fields.push(field);
        return form.fields;
    }

    function getFieldsForForm(formId) {
        var form = findFormById(formId);
        return form.fields;
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

    function updateField(formId, fieldId, field) {
        var form = findFormById(formId);
        var oldField = form.fields;
        for (var property in oldfield) {
            oldField[property] = field[property];
        }
        return form.fields;
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

