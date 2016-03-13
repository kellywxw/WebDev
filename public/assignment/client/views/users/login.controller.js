(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        $scope.login = function login() {
            UserService.findUserByCredentials($scope.username, $scope.password, callback);

            function callback (user) {
                if (user != null) {
                    $rootScope.user = user;
                    $scope.$location.url("/profile");
                }
            };
        }
    }
})();