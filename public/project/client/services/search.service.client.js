(function() {
    "use strict";
    angular
        .module("ChopChopApp")
        .factory("SearchService", SearchService);


    function SearchService($http, $q) {
        var api = {
            findEventByTitle : findEventByTitle,
            findEventByEventfulId: findEventByEventfulId
        };
        return api;

        function findEventByTitle(title) {
            var deferred = $q.defer();

            $.ajax({
                url: "http://api.eventful.com/jsonp/events/search?app_key=qpTwFsBDbVd95mkr&keywords="+ title +"&jsonCallback=JSON_CALLBACK",
                dataType: 'JSONP',
                jsonpCallback: 'callback',
                type: 'GET',
                success: function (response) {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }

        function findEventByEventfulId(id) {
            var deferred = $q.defer();

            $.ajax({
                url: "http://api.eventful.com/jsonp/events/get?app_key=qpTwFsBDbVd95mkr&id=" + id +"&jsonCallback=JSON_CALLBACK",
                dataType: 'JSONP',
                jsonpCallback: 'callback',
                type: 'GET',
                success: function (response) {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }
})();
