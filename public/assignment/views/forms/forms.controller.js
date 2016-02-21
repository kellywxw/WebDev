(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, $location, FormService) {
        var user = $rootScope.user;

        function loadForms() {
            FormService.findAllFormsForUser(user._id, callback);

            function callback (forms) {
                $scope.forms = forms;
            };
        }

        loadForms();

        $scope.addForm = function addForm() {
            FormService.createFormForUser(user._id, $scope.form, callback);

            function callback (form) {
                $scope.forms.push(form);
            };
        }

        $scope.updateForm = function updateForm() {
            FormService.updateFormById($scope.form._id, $scope.form, callback);

            function callback (forms) {
                $scope.forms = forms;
            };
        }

        $scope.selectForm = function selectForm(index) {
            var form = $scope.forms[index];
            $scope.form = form;
        }

        $scope.deleteForm = function deleteForm(index) {
            var formId  = $scope.forms[index]._id;
            FormService.deleteFormById(formId, callback);

            function callback (forms) {
                $scope.forms = forms;
            };
        }
    }



})();
