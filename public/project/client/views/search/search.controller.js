(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("SearchController", SearchController);

    function SearchController($rootScope, $location, SearchService, EventService) {
        var model = this;
        model.search = search;
        model.next = next;
        model.prev = prev;

        model.page = 1;
        model.$location = $location;

        var user = $rootScope.user;

        function search(title, pageNumber) {
            model.error = null;
            model.myerror = null;
            model.events = null;
            model.myEvents = null;
            model.page = 1;
            if (!user) {
                searchEvents(title, pageNumber);
            } else {
                if($('#isSearchEvents').is(':checked')) {
                    searchEvents (title, pageNumber);
                }
                if ($('#isSearchMyEvents').is(':checked')) {
                    searchMyEvents (title);
                } else if (!$('#isSearchEvents').is(':checked') && !$('#isSearchMyEvents').is(':checked')){
                    model.error = "Please check event list you want to search in."
                }

            }
        }

        function searchEvents (title, pageNumber) {
            SearchService
                .findEventByTitle(title, pageNumber)
                .then(function(response){
                    if (!response.events) {
                        model.error = 'Oops... "' + title + '" does not exist in ChopChop Event List. Please try again.'
                    } else {
                        model.searchTitle = title;
                        model.events = response.events.event;
                        model.limit = Math.ceil(response.total_items / 10);
                    }
                });
        }

        function searchMyEvents (title) {
            EventService
                .findEventByTitle(user._id, title)
                .then(function(response){
                    if (response.length == 0) {
                        model.myerror = 'Oops... "' + title + '" does not exist in your Event List. Please try again.'
                    } else {
                        model.myEvents = response;
                    }
                });
        }


        function next() {
            model.page++;
            searchEvents(model.title, model.page);
        }

        function prev() {
            model.page--;
            searchEvents(model.title, model.page);
        }
    }

})();

