(function(){
    'use strict';

    angular.module('guia', ['appRoutes', 'adminController', 'authSrvc'])
        .config(function($httpProvider){
            $httpProvider.interceptors.push('AuthInterceptor');
        });
})();