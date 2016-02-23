(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();
