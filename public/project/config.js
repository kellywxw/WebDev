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
            .when("/events", {
                templateUrl: "views/userinfo/events.view.html",
                controller: "EventController"
            })
            .when("/profile", {
                templateUrl: "views/userinfo/profile.view.html",
                controller: "ProfileController"
            })
            .when("/profileUpdate", {
                templateUrl: "views/userinfo/profileUpdate.view.html",
                controller: "ProfileController"
            })
            .when("/friends", {
                templateUrl: "views/userinfo/friends.view.html",
                controller: "FriendController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
