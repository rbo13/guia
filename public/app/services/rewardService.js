(function(){
    'use strict';

    angular.module('rewardSrvc', [])
        .factory('Reward', function($http, $q){

            var reward = function(rewardData){
                return $http.post('/api/v1/reward', rewardData);
            }

            var getAllRewards = function(){
                return $http.get('/api/v1/rewards');
            }

            return {
                reward: reward,
                getAllRewards: getAllRewards
            }
        });
})();