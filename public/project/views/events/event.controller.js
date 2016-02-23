(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("EventController", EventController);

    function EventController($scope, $location, $http) {
        $scope.$location = $location;

        $scope.search = search;

        function search(query) {
            $http.get("http://api.eventful.com/json/events/search?app_key=qpTwFsBDbVd95mkr&keywords=" + query)
                .success(render);

        }

        function render(response) {
            console.log(response);
            $scope.events = response;
        }
    }

})();

