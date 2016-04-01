(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, FormService) {
        var model = this;
        model.addForm = addForm;
        model.updateForm = updateForm;
        model.selectForm = selectForm;
        model.updateForm = updateForm;
        model.deleteForm = deleteForm;


        var user = $rootScope.user;

        if(user != null) {
            loadFormsForUser();
        }

        function loadFormsForUser() {
            FormService
                .findAllFormsForUser(user._id)
                .then(formsLoad);

            function formsLoad (forms) {
                console.log(forms);
                model.forms = forms;
            };
        }

        function addForm() {
            FormService
                .createFormForUser(user._id, model.newForm)
                .then(formAdd);

            function formAdd (forms) {
                loadFormsForUser();
                model.newForm = null;
            };
        }

        function updateForm() {
            var form = model.selectedForm;
            FormService
                .updateFormById(form._id, model.newForm)
                .then(formUpdate);

            function formUpdate () {
                loadFormsForUser();
                model.selectedForm = null;
                model.newForm = null;
            };
        }

        function selectForm(index) {
            var form = model.forms[index];

            model.selectedForm = form;

            model.newForm = {
                title : form.title,
                userId : form.userId
            }
        }

        function deleteForm(index) {
            var formId  = model.forms[index]._id;
            FormService
                .deleteFormById(formId)
                .then(loadFormsForUser);
        }
    }
})();
