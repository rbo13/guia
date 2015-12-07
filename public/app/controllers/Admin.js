(function(){
    'use strict';

    angular.module('adminController', [])
        .controller('AdminController', AdminController);

    AdminController.$inject = ['Auth', '$rootScope', '$location', '$window'];

    function AdminController(Auth, $rootScope, $location, $window){
        var vm = this;

        vm.loggedIn = Auth.adminIsLoggedIn();

        $rootScope.$on('$routeChangeStart', function(){
            vm.loggedIn = Auth.adminIsLoggedIn();

            Auth.getAdmin()
                .then(function(data){
                    vm.admin = data.data;
                });
        });

        vm.doLogin = function(){
            vm.loader = true;
            vm.errorMessage = false;
            Auth.adminLogin(vm.loginData.username, vm.loginData.password)
                .success(function(data){
                    vm.loader = false;
                    Auth.getAdmin()
                        .then(function(data){
                            vm.admin = data.data;
                        });
                    if(data.success){
                        $window.location.href = '/dashboard';
                    }else{
                        console.log(data.message);
                        vm.errorMessage = true;
                        vm.error = data.message;
                    }
                });
        }
    }
})();