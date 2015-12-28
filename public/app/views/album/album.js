(function(){
    'use strict';

    angular.module('album', ['ngAnimate', 'ngTouch', 'albumSrvc'])
        .controller('AlbumController', function ($scope) {
            $scope.slides = [
                {image: 'http://wallpaperlayer.com/img/2015/7/spring-scenery-6392-6668-hd-wallpapers.jpg', description: 'Image 00'},
                {image: 'http://attracttour.com/wp-content/uploads/2013/04/kawasan-falls.jpg', description: 'Image 01'},
                {image: 'http://www.saferidecarrental.com/wp-content/uploads/2015/10/4-canyoneers.jpg', description: 'Image 02'},
                {image: 'http://thebudgettraveler.org/wp-content/uploads/2014/09/loqal-cebu-pungko-pungko2_ss.jpg', description: 'Image 03'},
                {image: 'http://aphs.worldnomads.com/loriejoy/16415/Cebu_01.jpg', description: 'Image 04'}
            ];

            $scope.direction = 'left';
            $scope.currentIndex = 0;

            $scope.setCurrentSlideIndex = function (index) {
                $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
                $scope.currentIndex = index;
            };

            $scope.isCurrentSlideIndex = function (index) {
                return $scope.currentIndex === index;
            };

            $scope.prevSlide = function () {
                $scope.direction = 'left';
                $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
            };

            $scope.nextSlide = function () {
                $scope.direction = 'right';
                $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
            };
        })
        .animation('.slide-animation', function () {
            return {
                beforeAddClass: function (element, className, done) {
                    var scope = element.scope();

                    if (className == 'ng-hide') {
                        var finishPoint = element.parent().width();
                        if(scope.direction !== 'right') {
                            finishPoint = -finishPoint;
                        }
                        TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
                    }
                    else {
                        done();
                    }
                },
                removeClass: function (element, className, done) {
                    var scope = element.scope();

                    if (className == 'ng-hide') {
                        element.removeClass('ng-hide');

                        var startPoint = element.parent().width();
                        if(scope.direction === 'right') {
                            startPoint = -startPoint;
                        }

                        TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
                    }
                    else {
                        done();
                    }
                }
            };
        });
})();