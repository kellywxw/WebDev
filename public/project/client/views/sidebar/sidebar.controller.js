(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("SidebarController", SidebarController);

    function SidebarController(UserService) {
        var model;
        model = this;

        function init () {
            UserService
                .getCurrentUser()
                .then(function(user) {
                    model.user = user;
                    model.username = user.username;
                    console.log(model.username)
                });
        }

        init();
    }
})();