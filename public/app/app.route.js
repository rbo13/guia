(function(){
    'use strict';

    angular.module('appRoutes', ['ngRoute'])
        .config(function($routeProvider, $locationProvider, $httpProvider){
            $routeProvider
                .when('/admin', {
                    templateUrl: '/app/views/admin/admin.html',
                    controller: 'AdminController',
                    controllerAs: 'admin'
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