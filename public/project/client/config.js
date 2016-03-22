(function () {
    "use strict";
    angular
        .module("ChopChopApp")
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
            .when("/profile/:username?", {
                templateUrl: "views/userinfo/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/profileUpdate", {
                templateUrl: "views/userinfo/profileUpdate.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/events", {
                templateUrl: "views/userinfo/events.view.html",
                controller: "EventController",
                controllerAs: "model"
            })
            .when("/friends", {
                templateUrl: "views/userinfo/friends.view.html",
                controller: "FriendController",
                controllerAs: "model"
            })

            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
            })
            .when("/searchEvent/:id", {
                templateUrl: "views/search/searchEvent.view.html",
                controller: "SearchEventController",
                controllerAs: "model",
            })

            .otherwise({
                redirectTo: "/home"
            });
    }

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });

        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }
})();

