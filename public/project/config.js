(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .config(configure);

    function configure($routeProvider) {
        $routeProvider
            .when("/events", {
                templateUrl: "views/events/event.view.html",
                controller: "EventController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController"
            })
            .when("/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldController"
            })
            .otherwise({
                redirectTo: "/"
            });
    }
})();
