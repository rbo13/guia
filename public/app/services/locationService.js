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
            var activateLocation = function(id, updateValue){
                var locationId = '565a6b0bdf00f7bc164a5579';
                return $http.patch('/api/v1/location/'+locationId, updateValue);
            };

            return {
                location: location,
                getAllLocations: getAllLocations,
                activateLocation: activateLocation
            }
        });
})();