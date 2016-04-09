(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, UserService) {
        $scope.logout = function logout() {
            UserService
                .logout()
                .then(function() {
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }
    }
})();
