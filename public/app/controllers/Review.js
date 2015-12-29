(function(){
    'use strict';

    angular.module('reviewController', [])
        .controller('ReviewController', ReviewController);

    ReviewController.$inject = ['$location', '$window', 'Review', 'Toast', 'socketio'];

    function ReviewController($location, $window, Review, Toast, socketio){
        var vm = this;
        vm.reviewData = {};
        vm.guide = null;
        vm.guides = [];
        vm.reviews = [];
        Review.getAllGuides()
            .success(function(data){
                vm.guides = data;
            });
        vm.viewGuide = function(){
            Review.getGuide(vm.reviewData.id)
                .success(function(data){
                    vm.guide = data;
                    console.log(vm.guide);
                });
            Review.getReviews(vm.reviewData.id)
                .success(function(data){
                    vm.reviews = data;
                    console.log(data);
                });
        };


        Toast.success();
    }
})();