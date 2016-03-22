(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("SearchEventController", SearchEventController);

    function SearchEventController($rootScope, $location, $routeParams, SearchService, EventfulService) {
        var model = this;

        var eventfulId = $routeParams.id;
        var user = $rootScope.user;
        model.favorite = favorite;

        function init() {
            SearchService
                .findEventByEventfulId(eventfulId)
                .then(function(response){
                model.data = response.data;
            });

            EventfulService
                .findUserLikes (eventfulId)
                .then(function(response){
                    model.event = response.data;
                });
        }
        init();

        function favorite(event) {
            if(user) {
                EventfulService
                    .userLikesEvent(user._id, event);
            } else {
                $location.url("/login");
            }
        }

    }
})();

