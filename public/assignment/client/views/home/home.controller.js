(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController($location) {
        var model = this;

        model.$location = $location;
    }
})();
