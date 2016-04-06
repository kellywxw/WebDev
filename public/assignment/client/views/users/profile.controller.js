(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController)

    function ProfileController($rootScope, $location, UserService) {
        var model = this;
        model.update = update;

        var user = $rootScope.user;

        var emails = user.emails.toString();

        model.updatedUser = {
            username: user.username,
            password: user.password,
            firstName : user.firstName,
            lastName : user.lastName,
            emails: emails
        }

        function update() {
            UserService
                .updateUser(user._id, model.updatedUser)
                .then(getUpdatedUser);

            function getUpdatedUser(users) {
                console.log(users);
                UserService.setCurrentUser(user);
                $location.url("/profile");
            }
        }
    }
})();
