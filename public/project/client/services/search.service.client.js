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

            $http
                .jsonp("http://api.eventful.com/jsonp/events/search?app_key=qpTwFsBDbVd95mkr&keywords=" + title +"&jsonCallback=JSON_CALLBACK&format=jsonp")
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findEventByEventfulId(id) {
            $http
                .jsonp("http://www.api.eventful.com/jsonp/events/search?app_key=qpTwFsBDbVd95mkr&id=" + id +"&json_callback=JSON_CALLBACK")
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }
})();
