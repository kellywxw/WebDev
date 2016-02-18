
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $location, FormService) {

        var model = this;
        model.addForm = addForm;
        model.updateForm = updateForm;
        model.selectForm = selectForm;
        model.deleteForm = deleteForm;

        function findAllForms() {
            FormService
                .findAllFormsForUser(user._id, callback)
                .then(function(forms) {
                    user.forms = forms;
                });
        }

        function addForm() {
            FormService
                .createFormForUser(user._id, user.newForm)
                .then(function(forms) {
                    user.forms = forms;
                });
        }

        function updateForm() {
            var curForm = user.form;
            var formId = curForm._id

            FormService
                .updateFormById(formId, curForm)
                .then(function(forms) {
                    user.forms = forms;
                });
        }

        function selectForm(index) {
            var form = user.forms[index];
            return form;
        }

        function deleteForm(index) {
            var formId  = user.forms[index]._id;

            FormService
                .deleteFormById(formId)
                .then(function(forms) {
                    user.forms = forms;
                });
        }
    }



})();
