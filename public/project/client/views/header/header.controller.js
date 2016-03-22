(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location) {
        var model = this;
        model.logout= logout;

        model.$location = $location;

        function logout() {
            UserService
                .logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }
    }
})();
