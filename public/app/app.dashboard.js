(function(){
    'use strict';

    angular.module('dashboard', ['dashboardRoute', 'dashboardController', 'userController', 'rewardController',
        'locationController', 'preferenceController', 'statisticsController',
        'authSrvc', 'userSrvc', 'rewardSrvc', 'locationSrvc',
        'preferenceSrvc', 'guideSrvc', 'chart.js', 'googlechart']);
})();