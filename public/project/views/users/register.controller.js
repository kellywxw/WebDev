(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {
        $scope.register = function register() {
            var user = $scope.user;
            if(user.password1 == user.password2) {
                UserService.createUser(user, callback);
            }

            function callback (user) {
                $rootScope.user = user;
                $location.url("/profile");
            };
        }
    }
})();
