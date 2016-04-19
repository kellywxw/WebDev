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
                        formatEvents(model.events);
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

        function formatEvents(events) {
            model.renderEvents = [];

            for(var i in events) {
                if(events[i].start_time) {
                    var start = moment(events[i].start_time).format('YYYY-MM-DD hh:mm A');
                } else {
                    var start = null;
                }

                if(events[i].stop_time) {
                    var end = moment(events[i].stop_time).format('YYYY-MM-DD hh:mm A');
                } else {
                    var end = null;
                }

                if(events[i].image) {
                    var img = events[i].image.url;
                } else {
                    var img = null;
                }

                var event = {
                    id: events[i].id,
                    poster: img,
                    title : events[i].title,
                    location: events[i].city_name,
                    start: start,
                    end: end
                }

                model.renderEvents.push(event);
            }
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

