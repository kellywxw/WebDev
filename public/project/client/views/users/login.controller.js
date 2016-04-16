(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {
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
                if (user) {
                    console.log(user);
                    UserService.setCurrentUser(user);
                    $location.url("/profile");
                    checkLoggedin();
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
                    })
            }
        }

    }
})();