(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("SearchEventController", SearchEventController);

    function SearchEventController($rootScope, $location, $routeParams, SearchService, EvdbService) {
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
                            model.image = model.data.images.image[0].medium.url;
                        } else {
                            model.image = model.data.images.image.medium.url;
                        }
                    }
                });

            EvdbService
                .findUserLikes (evdbId)
                .then(function(response){
                    model.event = response;

                    // only display other users
                    if(response.userLikes) {
                        for (var i = 0; i < response.userLikes.length; i++) {
                            if(response.userLikes[i]._id == user._id) {
                                response.userLikes.splice(i,1);
                                break;
                            }
                        }
                        model.userLikes = response.userLikes;
                    }
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

