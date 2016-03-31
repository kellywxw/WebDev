(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService) {
        var model = this;

        model.logout = logout;

        function init() {
            model.$location = $location;
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(function() {
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }
    }
})();
