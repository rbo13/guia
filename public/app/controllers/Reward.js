(function(){
    'use strict';

    angular.module('rewardController', [])
        .controller('RewardController', RewardController);

    RewardController.$inject = ['$location', '$window', 'Reward', 'Toast', 'socketio'];

    function RewardController($location, $window, Reward, Toast, socketio){
        var vm = this;
        vm.guiaPreloader = true;
        vm.tours = [];
        vm.rewards = [];

        Reward.getAllTours()
            .success(function(data){
                vm.tours = data;
                console.log(data);
                vm.guiaPreloader = false;
                vm.rewardTable = true;
                Toast.success();
            });

        Reward.getAllRewards()
            .success(function(data){
                vm.rewards = data;
                console.log(data);
                vm.guiaPreloader = false;
                vm.rewardTable = true;
                Toast.success();
            });

        socketio.on('reward', function(data){
           vm.rewards.push(data);
        });

        vm.getValues = function(id,points){
            vm.rewardData = {
                _id: id,
                redeem_points: points
            };
        };

        vm.getTour = function(id){
            for(var i=0; i<vm.tours.length;i++){
                if(vm.tours[i]._id == id){
                    return vm.tours[i];
                }
            }
        };

        vm.updateReward = function(){
            Reward.updateReward(vm.rewardData._id,vm.rewardData.redeem_points)
                .success(function(data){
                    console.log('Updated Reward');
                    console.log(data);
                }).error(function(){
                    console.log('FAIL');
                });
        };

        vm.setActiveReward = function(id, value){
            console.log('Reward Activated');
            Reward.activateReward(id, value)
                .success(function(data){
                    console.log('Updated Reward');
                    console.log(data);
                }).error(function(){
                    console.log('FAIL');
                });
        };

        vm.addReward = function(){
            vm.rewardData.redeem_points = vm.getTour(vm.rewardData.reward_tour_id).rate;
            console.log('Added New Reward');
            Reward.reward(vm.rewardData)
                .success(function(data){
                    vm.rewardData = '';
                    console.log(data);
                });
        };

        vm.setReward = "Set Reward";
        Toast.success();
    }
})();