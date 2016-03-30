(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location, UserService) {
        var model = this;

        model.isAdmin = isAdmin;
        model.logout = logout;

        function init() {
            model.$location = $location;
            console.log(model.$location);
        }
        init();

        function isAdmin () {
            var roles = $rootScope.user.roles;
            if (roles == null || roles.length == 0) return false;
            for(var i = 0; i < roles.length; i++) {
                if(roles[i] == "admin") {
                    return true;
                }
            }
            return false;
        }

        function logout () {
            UserService.setCurrentUser(null);
            console.log($rootScope.user);
            $location.url("/home");
        }

        /* for session implementation

        function logout () {
            UserService
                .logout()
                .then(function() {
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }
        */
    }
})();
