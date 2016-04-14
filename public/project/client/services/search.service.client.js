(function() {
    "use strict";
    angular
        .module("ChopChopApp")
        .factory("SearchService", SearchService);


    function SearchService($q) {
        var api = {
            findEventByTitle : findEventByTitle,
            findEventByEvdbId: findEventByEvdbId
        };
        return api;

        function findEventByTitle(title, page_number) {
            var deferred = $q.defer();

            $.ajax({
                url: "http://api.eventful.com/jsonp/events/search?app_key=qpTwFsBDbVd95mkr&keywords="+ title + "&page_number="+ page_number ,
                dataType: 'JSONP',
                type: 'GET',
                success: function (response) {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }

        function findEventByEvdbId(id) {
            var deferred = $q.defer();

            $.ajax({
                url: "http://api.eventful.com/jsonp/events/get?app_key=qpTwFsBDbVd95mkr&id=" + id,
                dataType: 'JSONP',
                type: 'GET',
                success: function (response) {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }
})();
