(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
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

            function userLogin(user) {
                console.log(user);
                UserService.setCurrentUser(user);
                $location.url("/profile");
            };
        }
    }
})();