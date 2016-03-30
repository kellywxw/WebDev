(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($location) {
        var model = this;

        model.$location = $location;
    }
})();
