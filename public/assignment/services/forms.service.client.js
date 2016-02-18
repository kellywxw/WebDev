(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);


    function UserService($http, $q) {
        var forms = [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        var api = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById
        };
        return api;

        function createFormForUser(userId, form, callback) {
            var deferred = $q.defer();

            $http
                .post("/api/assignment/user/", userId + "/form", form)
                .success(function(callback) {
                    deferred.resolve(callback);
                });

            return deferred.promise;
        }

        function findAllFormsForUser(userId, callback) {
            var deferred = $q.defer();

            $http
                .get("/api/assignment/user/" + userId + "/form")
                .success(function(callback) {
                    deferred.resolve(callback);
                });

            return deferred.promise;
        }

        function deleteFormById(formId, callback) {
            var deferred = $q.defer();

            $http
                .delete("/api/assignment/form/" + formId)
                .success(function(callback){
                    deferred.resolve(callback);
                })

            return deferred.promise;
        }

        function updateFormById(formId, newForm, callback) {
            var deferred = $q.defer();

            $http
                .put("/api/assignment/form/" + formId, newForm)
                .success(function(callback) {
                    deferred.resolve(callback);
                })

            return deferred.promise;
        }
    }
})();