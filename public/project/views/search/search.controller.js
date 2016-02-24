(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location, $http) {
        $scope.$location = $location;

        $scope.search = search;

        function search(title) {
            $location.url("/search/" + title);
            //SearchService.findEventsByTitle(title, render);
            $http.get("http://eventful.com/json/events/search?app_key=qpTwFsBDbVd95mkr&keywords=" + title)
                .success(render);
        }

        function render(response) {
            console.log(response);
            $scope.events = response;
        }
    }

})();

