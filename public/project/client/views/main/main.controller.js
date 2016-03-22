(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("MainController", MainController);

    function MainController($location) {
        var model = this;

        model.$location = $location;
    }
})();
