(function(){
    'use strict';

    angular.module('statisticSrvc', [])
        .factory('Statistic', function($http, $q){

            /*var addSubscriber = function(email){
             var obj = { email: email }
             return $http.post('/api/v1/subscribe/', obj);
             };*/
            var getUsers = function(){
                return $http.get('/api/v1/users');
            };

            var getBookings = function(){
                return $http.get('api/v1/bookings');
            };

            return {
                getBookings: getBookings,
                getUsers: getUsers
            }
        });
})();