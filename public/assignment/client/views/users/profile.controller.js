(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController)

    function ProfileController($rootScope, $location, UserService) {
        var model = this;
        model.update = update;

        var user = $rootScope.user;

        model.updatedUser = {
            _id : user._id,
            username: user.username,
            password: user.password,
            firstName : user.firstName,
            lastName : user.lastName,
            emails: user.emails
        }

        function update() {
            UserService
                .updateUser(user._id, model.updatedUser)
                .then(userUpdate);

            function userUpdate (users) {
                UserService
                    .findUserByCredentials(model.updatedUser.username, model.updatedUser.password)
                    .then(getUpdatedUser);
            }

            function getUpdatedUser(user) {
                console.log(user);
                $rootScope.user = user;
                $location.url("/profile");
            }
        }
    }
})();
