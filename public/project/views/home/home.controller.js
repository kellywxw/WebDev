(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location) {
        $scope.$location = $location;
    }
})();
