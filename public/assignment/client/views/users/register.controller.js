(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {
        var model = this;
        model.register = register;

        function register() {
            if(model.user.password1 == model.user.password2) {
                UserService
                    .createUser(model.user)
                    .then(userCreate);
            }

            function userCreate (user) {
                $rootScope.user = user;
                $location.url("/profile");
            };
        }
    }
})();
