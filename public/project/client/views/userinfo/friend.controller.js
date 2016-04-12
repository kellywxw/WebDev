(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("FriendController", FriendController);

    function FriendController($rootScope, UserService) {
        var model = this;

        var user = $rootScope.user;

        function loadFollowForUser (userId) {
            UserService
                .getFollow(userId)
                .then(function(response){
                    model.user = response;
                    model.userFollows = response.userFollows;
                    model.userFollowsMe = response.userFollowsMe;
                    model.user.followsMe = response.followsMe;
                });
        }

        function init() {
            loadFollowForUser(user._id);
        }

        init();
    }
})();