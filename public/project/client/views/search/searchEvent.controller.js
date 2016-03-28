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
                    model.data = response;
                    if(model.data.images) {
                        if(model.data.images.image.length > 0) {
                            console.log(model.data.images.image);
                            model.image = model.data.images.image[0].medium.url;
                        } else {
                            console.log(model.data.images.image);
                            model.image = model.data.images.image.medium.url;
                        }
                    }
                    console.log(model.data);
                });

            EventfulService
                .findUserLikes (eventfulId)
                .then(function(response){
                    model.event = response;
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

