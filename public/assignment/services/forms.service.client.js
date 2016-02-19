(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);


    function FormService() {
        var forms = [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        var api = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById
        };
        return api;

        function createFormForUser(userId, form, callback) {
            form._id = getID();;
            form.useId = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var output = [];
            for (var i = 0; i < forms.length; i++) {
                if(forms[i].userId == userId ) {
                    output.push(forms[i]);
                }
            }
            callback(output);
        }

        function deleteFormById(formId, callback) {
            for (var i = 0; i < forms.length; i++) {
                if(forms[i]._id == formId) {
                    forms.splice(i,1);
                    break;
                }
            }
            callback(forms);
        }


        function updateFormById(formId, newForm, callback) {
            for (var i = 0; i < forms.length; i++) {
                if(forms[i]._id == formId) {
                    for (var property in newForm) {
                        forms[i][property] = newForm[property];
                    }
                    break;
                }
            }
            callback(forms[i]);
        }

        function getID() {
            var day = new Date();
            var id = day.getTime();
            return id;
        }
    }
})();