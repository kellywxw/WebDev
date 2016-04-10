(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("ProfileController", ProfileController)

    function ProfileController($rootScope, $location, UserService, EvdbService, $routeParams) {
        var model = this;
        model.update = update;
        model.unlike = unlike;

        //var userId = $routeParams.id;
        var user = $rootScope.user;

        function loadLikedEventsForUser(userId) {
            UserService
                .getProfile(userId)
                .then(likedEventsLoad);

            function likedEventsLoad(user) {
                model.user = user;
                model.likeEvents = user.likeEvents;
            };
        }

        function init() {
            if($routeParams.id != null) {
                console.log($routeParams.id);
                loadLikedEventsForUser($routeParams.id);
            } else {
                loadLikedEventsForUser(user._id);
            }
        }

        init();

        model.updatedUser = {
            username: user.username,
            password: user.password,
            firstName : user.firstName,
            lastName : user.lastName,
            email: user.email
        }

        function update() {
            UserService
                .updateUser(user._id, model.updatedUser)
                .then(getUpdatedUser);

            function getUpdatedUser(user) {
                UserService.setCurrentUser(user);
                $location.url("/profile");
            }
        }

        function unlike(index, evdbId) {
            if(user) {
                model.likeEvents.splice(index,1);
                EvdbService
                    .userUnlikesEvent(user._id, evdbId);
            } else {
                $location.url("/login");
            }
        }
    }
})();
