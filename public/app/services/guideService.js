(function(){
    'use strict';

    angular.module('guideSrvc', [])
        .factory('Guide', function($http, $q){

            var patchGuide = function(id, updateValue){
                var obj = { isActivated: updateValue }
                return $http.patch('/api/v1/guide/'+id, obj);
            };

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
                patchGuide: patchGuide
            }
        });

})();