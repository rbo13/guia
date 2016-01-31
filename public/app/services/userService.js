(function(){
    'use strict';

    angular.module('userSrvc', [])
        .factory('User', function($http, $q){

            var getAllGuides = function(){
                return $http.get('/api/v1/guides');
            };

            var patchUser = function(guide_user_id,updateValue){
                var obj = { guide_id: updateValue };
                return $http.patch('/api/v1/user/'+guide_user_id, obj);
            }

            var deactivate = function(guide_user_id){
                var obj = { guide_id: "deactivated" };
                return $http.patch('/api/v1/user/'+guide_user_id, obj);
            }

            return {
                getAllGuides: getAllGuides,
                patchUser: patchUser,
                deactivate: deactivate
            }
        });
})();