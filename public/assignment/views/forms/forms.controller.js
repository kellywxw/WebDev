
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, $location, FormService) {

        var model = this;
        model.addForm = addForm;
        model.updateForm = updateForm;
        model.selectForm = selectForm;
        model.deleteForm = deleteForm;

        var user = $rootScope.user;
        var form = $scope.form;

        function findAllForms() {
            FormService
                .findAllFormsForUser(user._id, callback)
                .then(function(forms) {
                    user.forms = forms;
                });
        }

        function addForm() {
            FormService
                .createFormForUser(user._id, form, callback);
        }

        function updateForm() {
            FormService
                .updateFormById(form._id, form, callback);
        }

        function selectForm(index) {
            var form = user.forms[index];
            return form;
        }

        function deleteForm(index) {
            var formId  = user.forms[index]._id;

            FormService
                .deleteFormById(formId, callback)
                .then(function(forms) {
                    user.forms = forms;
                });
        }
    }



})();
