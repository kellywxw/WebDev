(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $location) {
        $scope.$location = $location;
    }
})();
