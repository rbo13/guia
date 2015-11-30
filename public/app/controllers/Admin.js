(function(){
    'use strict';

    angular.module('adminController', ['authSrv'])
        .controller('Admin', function(Auth, $rootScope, $location){

        var vm = this;

        vm.loggedIn = Auth.adminIsLoggedIn();

        $rootScope.$on('$routeChangeStart', function(){
           vm.loggedIn = Auth.adminIsLoggedIn();

            Auth.getAdmin()
                .then(function(data){
                    vm.admin = data;
                });
        });

        vm.doLogin = function(){
            Auth.adminLogin(vm.loginData.username, vm.loginData.password)
                .success(function(data){
                    Auth.getAdmin()
                        .then(function(data){
                            vm.admin = data.data;
                        });
                    if(data.success)
                        $location.path('/dashboard');
                    else
                        vm.error = data.message;
                });
        };

        vm.doLogout = function(){
            Auth.logout();
            $location.path('/logout');
        };
    });
})();