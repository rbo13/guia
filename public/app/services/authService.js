(function(){
    'use strict';

    angular.module('authSrvc', [])
        .factory('Auth', function($http, $q, AuthToken){

            var adminLogin = function(username, password){
                return $http.post('/api/v1/admin/login', {
                    username: username,
                    password: password
                }).success(function(data){
                    AuthToken.setToken(data.token);
                    return data;
                });
            };

            var adminLogout = function(){
                AuthToken.setToken();
            };

            var adminIsLoggedIn = function(){
                if(AuthToken.getToken())
                    return true;
                else
                    return false;
            };

            var getAdmin = function(){
                if(AuthToken.getToken())
                    return $http.get('/dashboard');
                else
                    return $q.reject({ message: "User has no token" });
            };


            return {
                adminLogin: adminLogin,
                adminLogout: adminLogout,
                adminIsLoggedIn: adminIsLoggedIn,
                getAdmin: getAdmin
            }
        })	//service factory
        .factory('AuthToken', function($window){

            var setToken = function(token){
                if(token)
                    $window.localStorage.setItem('token', token);
                else
                    $window.localStorage.removeItem('token');
            };

            var getToken = function(){
                return $window.localStorage.getItem('token');
            };

            return {
                setToken: setToken,
                getToken: getToken
            };
        })	//authtoken factory
        .factory('AuthInterceptor', function($q, $location, AuthToken){
            var request = function(config){
                var token = AuthToken.getToken();
                if(token){
                    config.headers['x-access-token'] = token;
                }
                return config;
            };

            var responseError = function(response){
                if(response.status == 403)	$location.path('/admins');

                return $q.reject(response);
            };

            return {
                request: request,
                responseError: responseError
            };
        });

})();