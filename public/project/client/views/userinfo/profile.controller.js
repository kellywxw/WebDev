(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("ProfileController", ProfileController)

    function ProfileController($rootScope, $location, UserService, EvdbService) {
        var model = this;
        model.update = update;
        model.unlike = unlike;

        var user = $rootScope.user;

        function loadLikedEventsForUser() {
            UserService
                .findUserById(user._id)
                .then(likedEventsLoad);

            function likedEventsLoad(user) {
                model.likeEvents = user.likeEvents;
            };
        }

        if(user != null) {
            loadLikedEventsForUser();
        }

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
                .then(userUpdate);

            function userUpdate (users) {
                UserService
                    .findUserByCredentials(model.updatedUser.username, model.updatedUser.password)
                    .then(getUpdatedUser);
            }

            function getUpdatedUser(user) {
                console.log(user);
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
