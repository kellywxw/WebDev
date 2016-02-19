(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $location) {
        $scope.$location = $location;
    }
})();
