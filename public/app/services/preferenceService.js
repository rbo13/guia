(function(){
    'use strict';

    angular.module('preferenceSrvc', [])
        .factory('Preference', function($http, $q){

            var preference = function(preferenceData){
                return $http.post('/api/v1/preference', preferenceData);
            }

            var getAllPreferences = function(){
                return $http.get('/api/v1/preferences');
            }

            var activatePreference = function(id, updatevalue){
                var obj = { isActivated: updatevalue };
                return $http.patch('/api/v1/preference/'+id, obj);

            }

            var updatePreference = function(id, updatevalue){
                var obj = { preference: updatevalue };
                return $http.patch('/api/v1/preference/'+id, obj);

            }

            return {
                preference: preference,
                getAllPreferences: getAllPreferences,
                activatePreference: activatePreference,
                updatePreference: updatePreference
            }
        });
})();