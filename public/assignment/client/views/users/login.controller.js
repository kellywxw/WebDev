(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {
        var model = this;
        model.login = login;

        function login() {
            UserService
                .findUserByCredentials(model.username, model.password)
                .then(userLogin);

            function userLogin(user) {
                if (user != null) {
                    $rootScope.user = user;
                    $location.url("/profile");
                }
            };
        }
    }
})();