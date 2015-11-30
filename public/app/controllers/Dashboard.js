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

    angular.module('preferenceController', ['preferenceSrvc','locationSrvc','rewardSrvc', 'userSrvc', 'guideSrvc', 'authSrvc'])
        .controller('DashboardController', function(Preference, Location, Reward, User, Guide, Auth, $scope){
            //country
            /*$scope.countries = [
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
            ];*/

            //Preferences
            $scope.addPreference = function(){
                console.log('Added New Preference');
            }

            //Locations
            $scope.locations = [];
            $scope.guides = [];

            Location.getAllLocations()
                .success(function(data){
                    $scope.locations = data;
            });

            $scope.getValues = function(id,country,city){
                $scope.locationData = {
                    _id: id,
                    country: country,
                    city: city
                };
            }

            User.getAllGuides()
                .success(function(data){
                    $scope.guides = data;
                    console.log(data);
            });

            $scope.addLocation = function(){
                console.log('Added New Location');
                Location.location($scope.locationData)
                    .success(function(data){
                        $scope.locationData = '';
                    });
            }

            $scope.updateLocation = function(){
                console.log('Updated Location');
                Location.updateLocation($scope.locationData._id,$scope.locationData.country,$scope.locationData.city)
                    .success(function(data){
                        console.log('Updated Location');
                        console.log(data);
                        $scope.locationData = '';
                    }).error(function(){
                        console.log('FAIL');
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

            $scope.activateGuide = function(guide_user_id, id, value){

                $scope.user = function(){
                    User.patchUser(guide_user_id, id)
                        .success(function(data){
                            console.log(data);
                        }).error(function(){
                            console.log('FAIL');
                        });
                };

                console.log('Guide Activated');
                Guide.patchGuide(id, value)
                    .success(function(data){
                        $scope.user();
                        console.log(data);
                    }).error(function(){
                        console.log('FAIL');
                    });
            }

            $scope.activatePreference = function(id,value){
                console.log('Preference Activated');
                Preference.activatePreference(id, value)
                    .success(function(data){
                        console.log('Updated Preference')
                        console.log(data);
                    }).error(function(){
                        console.log('FAIL');
                    });
            };

            $scope.getPreferenceInfo = function(id,preference){
                $scope.preferenceData = {
                    _id: id,
                    preference: preference
                };
            }

            Preference.getAllPreferences()
                .success(function(data){
                    $scope.preferences = data;
            });

            $scope.updatePreference = function(id,updatedValue){
                console.log('Preference Updated');
                Preference.updatePreference(id,updatedValue)
                    .success(function(data){
                        console.log('Updated Preference')
                        console.log(data);
                    }).error(function(){
                        console.log('FAIL');
                    });
            };
    });
})();