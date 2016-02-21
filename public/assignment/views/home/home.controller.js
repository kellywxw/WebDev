(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location) {
        $scope.$location = $location;
    }
})();
