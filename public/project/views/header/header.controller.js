(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {
        $scope.$location = $location;

        $scope.logout= function logout () {
            $rootScope.user = null;
            $location.url("/home");
        }
    }
})();
