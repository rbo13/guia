(function(){
    'use strict';

    angular.module('appRoutes', ['ngRoute'])
        .config(function($routeProvider, $locationProvider, $httpProvider){
            $routeProvider
                .when('/dashboard', {
                    templateUrl: 'app/views/admin/statistics.html',
                    controller: 'DashboardController',
                    controllerAs: 'dashboard'
                })
                .when('/dashboard/location', {
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
                when('/dashboard/users', {
                    templateUrl: 'app/views/admin/guide.html',
                    controller: 'DashboardController',
                    controllerAs: 'dashboard'
                }).
                when('/admin', {
                    templateUrl: 'app/views/admin/admin_login.html',
                    controller: 'AdminController',
                    controllerAs: 'admin'
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