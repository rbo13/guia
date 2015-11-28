(function(){
    'use strict';

    angular.module('appRoutes', ['ngRoute'])
        .config(function($routeProvider, $locationProvider){
            $routeProvider
                .when('/dashboard', {
                    templateUrl: 'app/views/admin/add_location.html',
                    controller: 'DashboardController',
                    controllerAs: 'dashboard'
                }).
<<<<<<< HEAD
                when('/dashboard/rewards', {
                    templateUrl: 'app/views/admin/add_rewards.html',
                    controller: 'DashboardController',
                    controllerAs: 'dashboard'
                }).
                when('/dashboard/preferences', {
=======
                when('/dashboard/preference', {
>>>>>>> 5fd0d1f5eee02576b9422e36c2ed7a1faa23c50a
                    templateUrl: 'app/views/admin/add_preference.html',
                    controller: 'DashboardController',
                    controllerAs: 'dashboard'
                }).
                otherwise({
                    redirectTo: '/'
                });
            $locationProvider.html5Mode(true);
        });
})();