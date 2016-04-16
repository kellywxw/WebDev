(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var model = this;
        model.login = login;
        model.$location = $location;

        function login() {
            if(model.user) {
                UserService
                    .login(model.user)
                    .then(userLogin);
            }

            model.message = "Sorry, you username or password do not match our record."

            function userLogin(user) {
                if(user) {
                    console.log(user);
                    UserService.setCurrentUser(user);
                    $location.url("/profile");
                }
            };
        }
    }
})();