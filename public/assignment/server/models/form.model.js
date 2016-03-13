var forms = require("./form.mock.json");

module.exports = function(app) {
    var api = {
        createFormForUser : createFormForUser,
        findAllForms : findAllForms,
        findAllFormsForUser : findAllFormsForUser,
        findFormById : findFormById,
        findFormByTitle : findFormByTitle,
        updateFormById : updateFormById,
        deleteFormById : deleteFormById
    };
    return api;

    function createFormForUser(userId, form) {
        var newForm = {
            _id: getId(),
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
        var count = 0;
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
    }

    function deleteFormById(formId) {
        for (var i = 0; i < forms.length; i++) {
            if(forms[i]._id == formId) {
                forms.splice(i,1);
                break;
            }
        }
    }

    function getId() {
        var day = new Date();
        var id = day.getTime();
        return id;
    }
}

