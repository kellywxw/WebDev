(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var model = this;
        model.register = register;

        function register() {
            model.message = null;
            if(model.newUser.username != null &&
               model.newUser.password == model.password2) {
                UserService
                    .register(model.newUser)
                    .then(getCreatedUser);
            }

            function getCreatedUser(user) {
                if (user) {
                    console.log(user);
                    UserService.setCurrentUser(user);
                    $location.url("/profile");
                } else {
                    model.fail = true;
                    model.newUser = null;
                    model.password2 = null;
                    model.message = "Sorry, user already exist. Please try again."
                }

            }
        }
    }
})();
