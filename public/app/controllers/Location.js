(function(){
    'use strict';

    angular.module('locationController', [])
        .controller('LocationController', LocationController);

    LocationController.$inject = ['$location', '$window', 'Location'];

    function LocationController($location, $window, Location){
        var vm = this;

        //getAllLocations
        Location.getAllLocations()
            .success(function(data){
                vm.locations = data;
                console.log(data);
            });
        //get values of every locations
        vm.getValues = function(id,country,city){
            vm.locationData = {
                _id: id,
                country: country,
                city: city
            };
        };
        //addLocation
        vm.addLocation = function(){
            console.log('Added New Location');
            Location.location(vm.locationData)
                .success(function(data){
                    vm.locationData = '';
                    console.log(data);
                });
        };
        //updateLocation
        vm.updateLocation = function(){
            console.log('Updated Location');
            Location.updateLocation(vm.locationData._id,vm.locationData.country,vm.locationData.city)
                .success(function(data){
                    console.log('Updated Location');
                    console.log(data);
                    vm.locationData = '';
                }).error(function(){
                    console.log('FAIL');
                });
        };
        //activateLocation
        vm.setActiveLocation = function(id, value){
            console.log('Location Activated');
            Location.activateLocation(id, value)
                .success(function(data){
                    console.log('Updated Location');
                    console.log(data);
                }).error(function(){
                    console.log('FAIL');
                });
        };
    }
})();