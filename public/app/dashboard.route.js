(function(){
    'use strict';

    angular.module('dashboardRoute', ['ngRoute'])
        .config(function($routeProvider, $locationProvider, $httpProvider){
            $routeProvider
                .when('/dashboard', {
                    templateUrl: '/app/views/admin/statistics.html',
                    controller: 'DashboardController',
                    controllerAs: 'dashboard'
                })
                .when('/dashboard/guides', {
                    templateUrl: '/app/views/admin/guide.html',
                    controller: 'UserController',
                    controllerAs: 'user'
                })
                .when('/dashboard/rewards', {
                    templateUrl: '/app/views/admin/add_rewards.html',
                    controller: 'RewardController',
                    controllerAs: 'reward'
                })
                .when('/dashboard/location', {
                    templateUrl: '/app/views/admin/add_location.html',
                    controller: 'LocationController',
                    controllerAs: '_location'
                })
                .when('/dashboard/preference', {
                    templateUrl: '/app/views/admin/add_preference.html',
                    controller: 'PreferenceController',
                    controllerAs: '_preference'
                })
                .when('/dashboard/statistics', {
                    templateUrl: '/app/views/admin/statistics.html',
                    controller: 'StatisticsController',
                    controllerAs: 'stat'
                })
                .otherwise({
                    redirectTo: '/'
                });
            $locationProvider.html5Mode(true);

            $httpProvider.defaults.headers.patch = {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
})();