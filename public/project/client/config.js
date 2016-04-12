(function () {
    "use strict";
    angular
        .module("ChopChopApp")
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
            .when("/profileFriend/:id", {
                templateUrl: "views/userinfo/profileFriend.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/profile", {
                templateUrl: "views/userinfo/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/profileUpdate", {
                templateUrl: "views/userinfo/profileUpdate.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/event", {
                templateUrl: "views/userinfo/event.view.html",
                controller: "EventController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/friend", {
                templateUrl: "views/userinfo/friend.view.html",
                controller: "FriendController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })

            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/searchEvent/:id", {
                templateUrl: "views/search/searchEvent.view.html",
                controller: "SearchEventController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })

            .otherwise({
                redirectTo: "/home"
            });
    }

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(user){
                UserService.setCurrentUser(user);
                deferred.resolve();
            });

        return deferred.promise;
    }

    function checkLoggedIn(UserService, $rootScope, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(user) {
                if(user) {
                    UserService.setCurrentUser(user);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }
})();

