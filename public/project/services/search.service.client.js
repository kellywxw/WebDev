(function() {
    "use strict";
    angular
        .module("ChopChopApp")
        .factory("SearchService", SearchService);


    function SearchService($http) {
        var api = {
            findEventsByTitle : findEventsByTitle,
            findEventById: findEventById,
        };
        return api;

        function findEventsByTitle(title, callback) {
            $http.get("http://eventful.com/json/events/search?app_key=qpTwFsBDbVd95mkr&keywords=" + title)
                .success(callback);
        }

        function findEventById(id, callback) {
            $http.get("http://www.api.eventful.com/json/events/search?app_key=qpTwFsBDbVd95mkr&id=" + id)
                .success(callback);
        }
    }
})();
