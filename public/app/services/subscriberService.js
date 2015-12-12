(function(){
    'use strict';

    angular.module('subscriberSrvc', [])
        .factory('Subscriber', function($http, $q){

            var addSubscriber = function(email){
                var obj = { email: email }
                return $http.post('/api/v1/subscribe/', obj);
            };

            return {
                addSubscriber: addSubscriber
            }
        });
})();