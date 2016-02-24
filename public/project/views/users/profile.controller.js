(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("ProfileController", ProfileController)

    function ProfileController($scope, $rootScope, $location, UserService) {
        $scope.update = function update() {
            UserService.updateUser($rootScope.user._id, $scope.user, callback);

            function callback (user) {
                $rootScope.user = user;
                $scope.user = user;
            };
        }
    }
})();
