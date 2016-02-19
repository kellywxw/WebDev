(function () {

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {

        var model = this;

        model.login = login;

        function login() {
            UserService
                .findUserByUsernameAndPassword(user.username, user.password, callback)
                .then(function(user) {
                    if (user != null) {
                        $rootScope.user = user;
                        $location.url("/profile");
                    }
                });
        }
    }
})();