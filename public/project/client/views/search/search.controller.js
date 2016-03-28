(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("SearchController", SearchController);

    function SearchController($location, SearchService) {
        var model = this;
        model.search = search;

        model.$location = $location;

        function search(title, location) {
            SearchService
                .findEventByTitle(title, location)
                .then(function(response){
                    model.events = response.events.event;
                    console.log(model.events);
                });
        }
    }

})();

