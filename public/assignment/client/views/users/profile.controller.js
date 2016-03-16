(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController)

    function ProfileController($rootScope, $location, UserService) {
        var model = this;
        model.update = update;

        model.user = $rootScope.user;

        function update() {
            UserService
                .updateUser(model.user._id, model.user)
                .then(getUpdatedUser);

            function userUpdate (users) {
                UserService
                    .findUserByCredentials(model.user.username, model.user.password)
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
