(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("NavbarController", NavbarController);

    function NavbarController($location) {
        var model = this;

        model.$location = $location;
    }
})();