(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("HomeController", HomeController);

    function HomeController($location) {
        var model = this;

        model.$location = $location;
    }
})();
