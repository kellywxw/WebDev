(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, UserService) {

        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;

        $scope.reverse = true;


        function init() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function addUser(user) {
            UserService
                .createUser(user)
                .then(handleSuccess, handleError);
        }

        function updateUser(user) {
            UserService
                .updateUserByAdmin(user._id, user)
                .then(handleSuccess, handleError);
        }

        function deleteUser(user) {
            UserService
                .deleteUserById(user._id)
                .then(handleSuccess, handleError);
        }

        function selectUser(user) {
            $scope.currUser = angular.copy(user);
            delete $scope.currUser._id;
        }

        function handleSuccess(response) {
            $scope.users = response;
            $scope.currUser = null;
            console.log($scope.users);
        }

        function handleError(error) {
            $scope.error = error;
        }
    }
})();
