(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, $location, FormService) {
        var user = $rootScope.user;

        function loadFormsForUser() {
            FormService.findAllFormsForUser(user._id, callback);

            function callback (forms) {
                $scope.forms = forms;
            };
        }

        loadFormsForUser();

        $scope.addForm = function addForm() {
            FormService.createFormForUser(user._id, $scope.form, callback);

            function callback (form) {
                $scope.forms.push(form);
                $scope.form = null;
            };
        }

        $scope.updateForm = function updateForm() {
            var form = $scope.selectedForm;
            FormService.updateFormById(form._id, $scope.form, callback);

            function callback () {
                $scope.selectedForm = null;
            };
        }

        $scope.selectForm = function selectForm(index) {
            var form = $scope.forms[index];

            $scope.selectedForm = form;

            $scope.form = {
                _id : form._id,
                title : form.title,
                userId : form.userId
            }
        }

        $scope.deleteForm = function deleteForm(index) {
            var formId  = $scope.forms[index]._id;
            FormService.deleteFormById(formId, callback);
            loadFormsForUser();

            function callback (forms) {
                $scope.forms = forms;
            };
        }
    }



})();
