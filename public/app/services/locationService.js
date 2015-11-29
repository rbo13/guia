(function(){
    'use strict';

    angular.module('locationSrvc', [])
        .factory('Location', function($http, $q){

            var location = function(locationData){
                return $http.post('/api/v1/location', locationData);
            };

            var getAllLocation = function(){
                return $http.get('/api/v1/locations');
            };

            return {
                location: location,
                getAllLocation: getAllLocation
            }
        });
})();