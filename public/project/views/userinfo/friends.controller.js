(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("FriendController", FriendController);

    function FriendController($scope, $rootScope, $location) {
        $scope.$location = $location;
    }
})();