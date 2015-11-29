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

            //country
            $scope.countries = [
                "Argentina",
                "Armenia",
                "Bahamas",
                "Belgium",
                "Brazil",
                "Caribbean",
                "Cayman Islands",
                "Chile",
                "China",
                "Denmark",
                "Ecuador",
                "Ethiopia",
                "Finland",
                "France",
                "Germany",
                "Greece",
                "Hong Kong",
                "Indonesia",
                "Korea (south)",
                "Macao",
                "Malaysia",
                "Maldives",
                "Malta",
                "Monaco",
                "Netherlands",
                "North America",
                "Norway",
                "Palau",
                "Peru",
                "Philippines",
                "Poland",
                "Saudi Arabia",
                "Singapore",
                "Spain",
                "Sri Lanka",
                "Sweden",
                "Switzerland",
                "Taiwan",
                "Thailand",
                "United Arab Emirates",
                "United Kingdom",
                "United States",
                "Vatican",
                "Venezuela",
                 "Vietnam",
                "Virgin Islands"
            ];
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
                        console.log(data);
                        $scope.locations.push(data);
                        console.log($scope.locations);
                    });
            }

            $scope.activateLocation = function(id, value){
                console.log('Location Activated');
                Location.activateLocation(id, value)
                    .success(function(data){
                        console.log('Updated Location');

                        console.log(data);
                    }).error(function(){
                        console.log('FAIL');
                    });
            };
    });
})();