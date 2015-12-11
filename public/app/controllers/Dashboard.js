(function(){
    'use strict';

    angular.module('dashboardController', [])
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$rootScope', '$location', '$window', 'Auth', 'Toast'];

    function DashboardController($rootScope, $location, $window, Auth, Toast){
        var vm = this;
        vm.guiaPreloader = true;
        vm.adminLoggedIn = Auth.adminIsLoggedIn();

        vm.guide = function(){
            if($location.path() == '/dashboard/guides'){
                return true;
            }else{
                return false;
            }
        };

        vm.reward = function(){
            if($location.path() == '/dashboard/rewards'){
                return true;
            }else{
                return false;
            }
        };

        vm.location = function(){
            if($location.path() == '/dashboard/location'){
                return true;
            }else{
                return false;
            }
        };

        vm.preference = function(){
            if($location.path() == '/dashboard/preference'){
                return true;
            }else{
                return false;
            }
        };

        vm.statistics = function(){
            if($location.path() == '/dashboard/statistics' || $location.path() == '/dashboard'){
                return true;
            }else{
                return false;
            }
        };

        vm.doLogout = function(){
            Auth.adminLogout();
            $window.location.href = '/admin';
        };
    }
})();