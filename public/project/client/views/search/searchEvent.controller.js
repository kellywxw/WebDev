(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("SearchEventController", SearchEventController);

    function SearchEventController($rootScope, $location, $routeParams, SearchService, EvdbService, UserService) {
        var model = this;

        var evdbId = $routeParams.id;
        var user = $rootScope.user;
        model.like = like;
        model.unlike = unlike;

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
                    console.log(response);
                    model.event = response;
                });
        }
        init();

        function like(event) {
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

        function unlike(evdbId) {
            if(user) {
                if(model.event) {
                    model.event.likes = [];
                }
                EvdbService
                    .userUnlikesEvent(user._id, evdbId);
            } else {
                $location.url("/login");
            }
        }
    }
})();

