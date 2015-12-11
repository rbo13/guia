(function(){
    'use strict';

    angular.module('rewardController', [])
        .controller('RewardController', RewardController);

    RewardController.$inject = ['$location', '$window', 'Reward', 'Toast'];

    function RewardController($location, $window, Reward, Toast){
        var vm = this;

        vm.setReward = "Set Reward";
        Toast.success();
    }
})();