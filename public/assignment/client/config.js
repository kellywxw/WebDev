(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(configure);

    function configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/form", {
                templateUrl: "views/forms/form.view.html",
                controller: "FormController",
                controllerAs: "model"
            })
            .when("/user/:userId/form/:formId/fields", {
                templateUrl: "views/forms/field.view.html",
                controller: "FieldController",
                controllerAs: "model"
            })
            .when("/field", {
                templateUrl: "views/forms/field.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
