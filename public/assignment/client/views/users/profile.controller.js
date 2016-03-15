(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController)

    function ProfileController($rootScope, UserService) {
        var model = this;
        model.update = update;

        function update() {
            UserService
                .updateUser($rootScope.user._id, model.user)
                .then(userUpdate);

            function userUpdate (users) {
                console.log(users);
            };
        }
    }
})();
