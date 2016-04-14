(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("SearchController", SearchController);

    function SearchController($location, SearchService) {
        var model = this;
        model.search = search;
        model.next = next;
        model.prev = prev;

        model.page = 1;
        model.$location = $location;

        function search(title, pageNumber) {
            SearchService
                .findEventByTitle(title, pageNumber)
                .then(function(response){
                    if (!response.events) {
                        model.error = "Sorry. Event does not exist. Please try again."
                        console.log(model.error);
                    } else {
                        model.error = null;
                        model.searchTitle = title;
                        model.events = response.events.event;
                        model.limit = Math.ceil(response.total_items / 10);
                    }
                });
        }

        function next() {
            model.page++;
            search(model.title, model.page);
        }

        function prev() {
            model.page--;
            search(model.title, model.page);
        }
    }

})();

