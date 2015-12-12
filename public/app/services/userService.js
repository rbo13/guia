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
                var obj = { guide_id: "" };
                return $http.patch('/api/v1/user/'+guide_user_id, obj);
            }

            //var patchUser = function(id, updateValue){
            //    var obj = { guide_id: updateValue };
            //    return $http.patch('/api/v1/user/'+id, obj);
            //};

            //Kentoy: to do, patch request to update "isActivated value"
            //var activateLocation = function(id, updateValue){
            //    var obj = { isActivated: updateValue };
            //    return $http.patch('/api/v1/location/'+id, obj);
            //};

            return {
                getAllGuides: getAllGuides,
                patchUser: patchUser,
                deactivate: deactivate
            }
        });
})();