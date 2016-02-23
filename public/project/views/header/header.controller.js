(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {
        $scope.$location = $location;

        $scope.isAdmin = function isAdmin () {
            var roles = $rootScope.user.roles;
            for(var i = 0; i < roles.length; i++) {
                if(roles[i] == "admin") {
                    return true;
                }
            }
            return false;
        }

        $scope.logout= function logout () {
            $rootScope.user = null;
            $location.url("/home");
        }
    }
})();
