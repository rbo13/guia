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

            //Kentoy: to do, patch request to update "isActivated value"
            var activateLocation = function(id){

            };

            return {
                location: location,
                getAllLocations: getAllLocations,
                activateLocation: activateLocation
            }
        });
})();