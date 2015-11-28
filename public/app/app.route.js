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
                otherwise({
                    redirectTo: '/'
                });;
            $locationProvider.html5Mode(true);
        });
})();