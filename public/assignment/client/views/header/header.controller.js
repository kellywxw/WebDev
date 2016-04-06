(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, UserService) {
        $scope.logout = function logout() {
            UserService
                .logout()
                .then(function() {
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }
})();
