(function(){
    'use strict';

    angular.module('logSrvc', [])
        .factory('Log', function($http, $q){

            var getLogs = function(){
                return $http.get('/api/v1/logs');
            };

            var createLog = function(logData){
                return $http.post('/api/v1/log', logData);
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
                getLogs: getLogs,
                createLog: createLog
            }
        });
})();