(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var model = this;
        model.login = login;

        model.$location = $location;
        model.clicked = false;

        function login() {
            model.clicked = true;
            model.message = null;
            if (model.user) {
                UserService
                    .login(model.user)
                    .then(userLogin);
            }

            checkLoggedin();

            function userLogin(user) {
                model.message = null;
                if (user) {
                    console.log(user);
                    model.clicked = false;
                    UserService.setCurrentUser(user);
                    $location.url("/profile");
                }
            }
        }

        function checkLoggedin() {
            if(model.clicked) {
                UserService
                    .getCurrentUser()
                    .then(function (user) {
                        if (user == 0) {
                            model.message = "Sorry, your username or password do not match our record."
                        }
                    });
            }
        }

    }
})();