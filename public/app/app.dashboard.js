(function(){
    'use strict';

    angular.module('dashboard', ['ngAnimate', 'jkuri.confirmdialog', 'ngMaterial', 'ui.bootstrap', 'toastr', 'dashboardRoute', 'dashboardController', 'userController', 'rewardController',
        'locationController', 'preferenceController', 'statisticsController', 'logsController','reviewController',
        'authSrvc', 'userSrvc', 'rewardSrvc', 'locationSrvc', 'toastSrvc', 'statisticSrvc',
        'preferenceSrvc', 'guideSrvc', 'logSrvc', 'reviewSrvc', 'tourSrvc', 'chart.js', 'googlechart', 'reverseDirective']);
})();