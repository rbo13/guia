(function(){
    'use strict';

    angular.module('guia', ['ngAnimate', 'toastr', 'appRoutes', 'adminController', 'authSrvc', 'toastSrvc'])
        .config(function($httpProvider){
            $httpProvider.interceptors.push('AuthInterceptor');
        });
})();