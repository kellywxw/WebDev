(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        var model = this;

        model.register = register;


        function register() {
            var user = $scope.user;
            if(user.password1 == user.password2) {
                UserService
                    .createUser(user, callback)
                    .then(function(user) {
                        $rootScope.user = user;
                    });
                $location.url("/profile");
            }
        }
    }
})();
