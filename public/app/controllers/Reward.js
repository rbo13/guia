(function(){
    'use strict';

    angular.module('rewardController', [])
        .controller('RewardController', RewardController);

    RewardController.$inject = ['$location', '$window', 'Reward'];

    function RewardController($location, $window, Reward){
        var vm = this;

        vm.setReward = "Set Reward";

    }
})();