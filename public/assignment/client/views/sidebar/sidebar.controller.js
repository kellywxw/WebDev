(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $rootScope, $location) {
        $scope.$location = $location;

        $scope.isAdmin = function isAdmin () {
            var roles = $rootScope.user.roles;
            if (roles == null || roles.length == 0) return false;
            for(var i = 0; i < roles.length; i++) {
                if(roles[i] == "admin") {
                    return true;
                }
            }
            return false;
        }
    }
})();