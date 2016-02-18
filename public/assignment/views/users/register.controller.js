(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        var model = this;

        model.register = register;


        function register() {
            if(newuser.password1 == newuser.password2) {
                UserService
                    .createUser(newuser, callback)
                    .then(function(newuser) {
                        $rootScope.user = newuser;
                    });
                $location.url("/profile");
            } else {
                $location.url("/register");
            }
        }
    }
})();
