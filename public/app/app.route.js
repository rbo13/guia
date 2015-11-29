(function(){
    'use strict';

    angular.module('appRoutes', ['ngRoute'])
        .config(function($routeProvider, $locationProvider, $httpProvider){
            $routeProvider
                .when('/dashboard', {
                    templateUrl: 'app/views/admin/add_location.html',
                    controller: 'DashboardController',
                    controllerAs: 'dashboard'
                }).
                when('/dashboard/rewards', {
                    templateUrl: 'app/views/admin/add_rewards.html',
                    controller: 'DashboardController',
                    controllerAs: 'dashboard'
                }).
                when('/dashboard/preference', {
                    templateUrl: 'app/views/admin/add_preference.html',
                    controller: 'DashboardController',
                    controllerAs: 'dashboard'
                }).
                otherwise({
                    redirectTo: '/'
                });
            $locationProvider.html5Mode(true);

            $httpProvider.defaults.headers.patch = {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
})();