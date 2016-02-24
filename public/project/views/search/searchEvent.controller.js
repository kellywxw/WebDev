(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("SearchEventController", SearchEventController);

    function SearchEventController($scope, $routeParams, $http) {
        var id = $routeParams.id;
        //SearchService.findEventById(id, renderEvent);
        $http.get("http://www.api.eventful.com/json/events/get?app_key=qpTwFsBDbVd95mkr&id=" + id)
            .success(render);

        function renderEvent(response) {
            $scope.event = response;
        }
    }
})();

