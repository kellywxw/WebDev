(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController)

    function ProfileController($scope, $rootScope, $location, UserService) {

        var model = this;

        model.update = update;

        function update() {
            UserService
                .updateUser($rootScope.user._id, $rootScope.user, callback)
                .then(function (user) {
                    $rootScope.user = user;
                });
        }
    }
})();
