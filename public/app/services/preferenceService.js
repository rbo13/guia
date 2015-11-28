(function(){
    'use strict';

    angular.module('preferenceSrvc', [])
        .factory('Preference', function($http, $q){

            var preference = function(preferenceData){
                return $http.post('/api/v1/preference', preferenceData);
            }

            var getAllPreferences = function(){
                return $http.get('/api/v1/preference');
            }

            return {
                preference: preference,
                getAllPreferences: getAllPreferences
            }
        });
})();