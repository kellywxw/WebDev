(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("SearchController", SearchController);

    function SearchController($location, SearchService) {
        var model = this;
        model.search = search;

        model.$location = $location;

        function search(event) {
            SearchService
                .findEventByTitle(event.title)
                .then(function(response){
                    model.data = response.data;
                });
        }
    }

})();

