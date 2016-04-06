(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(configure);

    function configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
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
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when('/admin', {
                templateUrl: 'views/admin/admin.view.html',
                controller: 'AdminController',
                resolve: {
                    checkLoggedIn: checkAdmin
                }
            })
            .when("/form", {
                templateUrl: "views/forms/form.view.html",
                controller: "FormController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/form/:formId/fields", {
                templateUrl: "views/forms/field.view.html",
                controller: "FieldController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/field", {
                templateUrl: "views/forms/field.view.html",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    function getLoggedIn(UserService, $q, $rootScope) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(user) {
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0') {
                    UserService.setCurrentUser(user);
                }
                deferred.resolve();
            });

        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location, $rootScope) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(user) {
                $rootScope.errorMessage = null;
                if(user) {
                    UserService.setCurrentUser(user);
                    deferred.resolve();
                } else {
                    $rootScope.errorMessage = 'You need to log in.';
                    deferred.reject();
                    $location.url("/login");
                }
            });

        return deferred.promise;
    }

    var checkAdmin = function(UserService, $q, $timeout, $rootScope) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0' && user.roles.indexOf('admin') != -1) {
                    UserService.setCurrentUser(user);
                    deferred.resolve();
                }
            });

        return deferred.promise;
    };

})();
