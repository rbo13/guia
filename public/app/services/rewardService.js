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

            var getAllTours = function(){
                return $http.get('/api/v1/tours');
            }

            var getTour = function(_id){
                return $http.get('/api/v1/tour/'+_id);
            }

            var activateReward = function(id,updateValue){
                var obj = { isActivated: updateValue };
                return $http.patch('/api/v1/reward/'+id, obj);
            }

            var updateReward = function(id, redeem_points){
                var obj = { redeem_points: redeem_points };
                return $http.patch('/api/v1/reward/'+id, obj);
            }

            return {
                reward: reward,
                getAllRewards: getAllRewards,
                getAllTours: getAllTours,
                getTour: getTour,
                activateReward: activateReward,
                updateReward: updateReward
            }
        });
})();