(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController)

    function ProfileController($rootScope, $location, UserService) {
        var model = this;
        model.update = update;

        model.updatedUser = $rootScope.user;

        function update() {

            UserService
                .updateUser($rootScope.user._id, model.updatedUser)
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
