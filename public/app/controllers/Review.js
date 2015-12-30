(function(){
    'use strict';

    angular.module('reviewController', [])
        .controller('ReviewController', ReviewController);

    ReviewController.$inject = ['$location', '$window', 'Review', 'Toast', 'socketio','$timeout'];

    function ReviewController($location, $window, Review, Toast, socketio, $timeout){
        var jq = $.noConflict();
        var vm = this;
        vm.reviewData = {};
        vm.guide = null;
        vm.guides = [];
        vm.reviews = [];
        vm.revID = null;
        vm.review = null;

        Review.getAllGuides()
            .success(function(data){
                vm.guides = data;
            });

        socketio.on('review', function(data){
            vm.reviews.push(data);
            vm.viewGuide();
            Toast.info('Guide Rating Added');
        });

        vm.viewGuide = function(){
            Review.getGuide(vm.reviewData.id)
                .success(function(data){
                    vm.guide = data;
                    console.log(vm.guide);
                    jq("#Guide").rateYo({
                        rating: vm.guide.rating,
                        readOnly: true
                    });
                });

            Review.getReviews(vm.reviewData.id)
                .success(function(data){
                    vm.reviews = data;
                    console.log(data);
                    $timeout(function () {
                        console.log($('.user'));
                        for(var x in vm.reviews){
                            var id = "#"+vm.reviews[x]._id;
                            console.log(jq(id));
                            jq(id).rateYo({
                                rating: vm.reviews[x].rating,
                                readOnly: true,
                                starWidth: "20px"
                            });
                        } 
                    });
                });
        };

        Toast.success();
    }
})();