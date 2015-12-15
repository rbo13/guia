(function(){
    'use strict';

    angular.module('dashboard', ['ngAnimate', 'toastr', 'dashboardRoute', 'dashboardController', 'userController', 'rewardController',
        'locationController', 'preferenceController', 'statisticsController',
        'authSrvc', 'userSrvc', 'rewardSrvc', 'locationSrvc', 'toastSrvc', 'statisticSrvc',
        'preferenceSrvc', 'guideSrvc', 'chart.js', 'googlechart', 'reverseDirective']);
})();