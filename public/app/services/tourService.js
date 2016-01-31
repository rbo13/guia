(function(){
    'use strict';

    angular.module('tourSrvc', [])
        .factory('Tour', function($http, $q){

            var patchTour = function(guide_id, tourData){
                return $http.post('/api/v1/tours/'+guide_id, tourData);
            };

            return {
                patchTour: patchTour
            }
        });
})();