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
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .when("/searchEvent/:id", {
                templateUrl: "views/search/searchEvent.view.html",
                controller: "SearchEventController"
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
            .when("/profileUpdate", {
                templateUrl: "views/users/profileUpdate.view.html",
                controller: "ProfileController"
            })
            .when("/events", {
                templateUrl: "views/users/events.view.html",
                controller: "EventController"
            })
            .when("/friends", {
                templateUrl: "views/friends/friends.view.html",
                controller: "FriendController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
