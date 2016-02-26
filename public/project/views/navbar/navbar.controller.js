(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("NavbarController", NavbarController);

    function NavbarController($scope, $rootScope, $location) {
        $scope.$location = $location;
    }
})();