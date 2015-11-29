(function(){
    'use strict';

    angular.module('locationController', ['locationSrvc'])
        .controller('DashboardController', function(Location, $scope){

            //var vm = this;
            $scope.locations = [];

            Location.getAllLocations()
                .success(function(data){
                $scope.locations = data;
            });

            $scope.addLocation = function(){
                console.log('Added New Location');
                Location.location($scope.locationData)
                    .success(function(data){
                        $scope.locationData = '';
                    });
            }
    });

    angular.module('rewardController', ['rewardSrvc'])
        .controller('DashboardController', function(Reward, $scope){
            $scope.addReward = function(){
                console.log('Added New Reward');
                Location.location($scope.rewardData)
                    .success(function(data){
                        $scope.commentData = '';
                    });
            }
    });

    angular.module('preferenceController', ['preferenceSrvc','locationSrvc','rewardSrvc'])
        .controller('DashboardController', function(Preference, Location, Reward, $scope){
            //Preferences
            $scope.addPreference = function(){
                console.log('Added New Preference');
            }

            //Locations
            $scope.locations = [];

            Location.getAllLocations()
                .success(function(data){
                    $scope.locations = data;
            });

            $scope.addLocation = function(){
                console.log('Added New Location');
                Location.location($scope.locationData)
                    .success(function(data){
                        $scope.locationData = '';
                    });
            }

            $scope.activateLocation = function(){
                console.log('Location Activated');
                Location.activateLocation($scope.id, $scope.value)
                    .success(function(data){
                        console.log('Updated Location');
                        console.log(data);
                    }).error(function(){
                        console.log('FAIL');
                    });
            };
    });
})();