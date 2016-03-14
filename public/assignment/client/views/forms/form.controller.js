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

        function loadFormsForUser() {
            FormService
                .findAllFormsForUser(user._id)
                .then(formsLoad);

            function formsLoad (forms) {
                model.forms = forms;
            };
        }

        if(user != null) {
            loadFormsForUser();
        }

        function addForm() {
            FormService
                .createFormForUser(user._id, model.form)
                .then(formAdd);

            function formAdd (forms) {
                model.forms = forms;
                model.form = null;
            };
        }

        function updateForm() {
            var form = model.selectedForm;
            FormService
                .updateFormById(form._id, model.form)
                .then(formUpdate);

            function formUpdate () {
                model.selectedForm = null;
            };
        }

        function selectForm(index) {
            var form = model.forms[index];

            model.selectedForm = form;

            model.form = {
                _id : form._id,
                title : form.title,
                userId : form.userId
            }
        }

        function deleteForm(index) {
            var formId  = model.forms[index]._id;
            FormService
                .deleteFormById(formId)
                .then(formDelete);

            function formDelete (forms) {
                model.forms = forms;
            };
        }
    }



})();
