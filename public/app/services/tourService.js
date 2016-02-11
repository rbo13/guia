(function(){
    'use strict';

    angular.module('tourSrvc', [])
        .factory('Tour', function($http, $q){

            var patchTour = function(guide_id, tour_guide_id){
                return $http.post('/api/v1/tours/'+guide_id, { tour_guide_id: tour_guide_id });
            };

            return {
                patchTour: patchTour
            }
        });
})();