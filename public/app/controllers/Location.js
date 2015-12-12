(function(){
    'use strict';

    angular.module('locationController', [])
        .controller('LocationController', LocationController);

    LocationController.$inject = ['$location', '$window', 'Location', 'socketio', 'Toast'];

    function LocationController($location, $window, Location, socketio, Toast){
        var vm = this;
        vm.guiaPreloader = true;
        vm.locationTable = false;
        //getAllLocations
        Location.getAllLocations()
            .success(function(data){
                vm.locations = data;
                console.log(data);
                vm.guiaPreloader = false;
                vm.locationTable = true;
                Toast.success();
            });
        //addLocation
        vm.addLocation = function(){
            console.log('Added New Location');
            Location.location(vm.locationData)
                .success(function(data){
                    vm.locationData = '';
                    console.log(data);
                });
        };
        socketio.on('location', function(data){
            vm.locations.push(data);
        });
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

        //get values of every locations
        vm.getValues = function(id,country,city){
            vm.locationData = {
                _id: id,
                country: country,
                city: city
            };
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