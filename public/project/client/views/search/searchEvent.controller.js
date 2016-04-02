(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("SearchEventController", SearchEventController);

    function SearchEventController($rootScope, $location, $routeParams, SearchService, EvdbService) {
        var model = this;

        var evdbId = $routeParams.id;
        var user = $rootScope.user;
        model.favorite = favorite;

        function init() {
            SearchService
                .findEventByEvdbId(evdbId)
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

            EvdbService
                .findUserLikes (evdbId)
                .then(function(response){
                    model.event = response;
                });
        }
        init();

        function favorite(event) {
            if(user) {
                if(model.event) {
                    model.event.likes = [];
                    model.event.likes.push(user._id);
                }
                EvdbService
                    .userLikesEvent(user._id, event);
            } else {
                $location.url("/login");
            }
        }

    }
})();

