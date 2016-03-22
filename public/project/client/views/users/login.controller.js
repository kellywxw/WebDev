(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {
        var model = this;
        model.login = login;
        model.$location = $location;

        function login() {
            UserService
                .findUserByCredentials(model.user.username, model.user.password)
                .then(userLogin);

            function userLogin(user) {
                if (user != null) {
                    console.log(user);
                    UserService.setCurrentUser(user);
                    $location.url("/events");
                }
            };

        }
    }
})();