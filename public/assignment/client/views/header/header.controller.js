(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, UserService) {
        /*
        var model = this;

        model.logout = logout;

        function init() {
            model.$location = $location;
        }
        init();
        */

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
