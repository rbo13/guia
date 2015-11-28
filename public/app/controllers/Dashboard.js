(function(){
    'use strict';

    angular.module('locationController', ['locationSrvc'])
        .controller('DashboardController', function(Location, $scope){

            //var vm = this;
            $scope.locations = [];

            Location.getAllLocation()
                .success(function(data){
                $scope.locations = data;
            });

            $scope.addLocation = function(){
                console.log('Added New Location');
                Location.location($scope.locationData)
                    .success(function(data){
                        $scope.commentData = '';
                    });
            }
    });
})();