(function(){
    'use strict';

    angular.module('dashboardRoute', ['ngRoute'])
        .config(function($routeProvider, $locationProvider, $httpProvider){
            $routeProvider
                .when('/admin', {
                    templateUrl: '/app/views/admin/admin.html',
                    controller: 'AdminController',
                    controllerAs: 'admin',
                    access: {
                        requiresLogin: true
                    }
                })
                .when('/dashboard', {
                    templateUrl: '/app/views/admin/statistics.html',
                    controller: 'DashboardController',
                    controllerAs: 'dashboard',
                    access: {
                        requiresLogin: true
                    }
                })
                .when('/dashboard/guides', {
                    templateUrl: '/app/views/admin/guide.html',
                    controller: 'UserController',
                    controllerAs: 'user',
                    access: {
                        requiresLogin: true
                    }
                })
                .when('/dashboard/rewards', {
                    templateUrl: '/app/views/admin/add_rewards.html',
                    controller: 'RewardController',
                    controllerAs: 'reward',
                    access: {
                        requiresLogin: true
                    }
                })
                .when('/dashboard/location', {
                    templateUrl: '/app/views/admin/add_location.html',
                    controller: 'LocationController',
                    controllerAs: '_location',
                    access: {
                        requiresLogin: true
                    }
                })
                .when('/dashboard/preference', {
                    templateUrl: '/app/views/admin/add_preference.html',
                    controller: 'PreferenceController',
                    controllerAs: '_preference',
                    access: {
                        requiresLogin: true
                    }
                })
                .when('/dashboard/logs', {
                    templateUrl: '/app/views/admin/logs.html',
                    controller: 'LogsController',
                    controllerAs: '_logs',
                    access: {
                        requiresLogin: true
                    }
                })
                .when('/dashboard/statistics', {
                    templateUrl: '/app/views/admin/statistics.html',
                    controller: 'StatisticsController',
                    controllerAs: 'stat',
                    access: {
                        requiresLogin: true
                    }
                })
                .when('/admin', {
                    templateUrl: '/app/views/admin/admin.html'
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