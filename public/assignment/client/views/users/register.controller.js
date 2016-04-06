(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var model = this;
        model.register = register;

        function register() {
            if(!model.newUser.username != null &&
               model.newUser.password == model.password2) {
                UserService
                    .register(model.newUser)
                    .then(getCreatedUser);
            }

            function getCreatedUser(user) {
                console.log(user);
                UserService.setCurrentUser(user);
                $location.url("/profile");
            }
        }
    }
})();
