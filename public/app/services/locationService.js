(function(){
    'use strict';

    angular.module('locationSrvc', [])
        .factory('Location', function($http, $q){

            var location = function(locationData){
                return $http.post('/api/v1/location', locationData);
            };

            var getAllLocations = function(){
                return $http.get('/api/v1/locations');
            };

            var activateLocation = function(id, updateValue){
                var obj = { isActivated: updateValue };
                return $http.patch('/api/v1/location/'+id, obj);
            };

            var updateLocation = function(id, country, city){
                var obj = { country: country,
                            city: city };
                return $http.patch('/api/v1/location/'+id, obj);            
            };

            return {
                location: location,
                getAllLocations: getAllLocations,
                activateLocation: activateLocation,
                updateLocation: updateLocation
            }
        });
})();