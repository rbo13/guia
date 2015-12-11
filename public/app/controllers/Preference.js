(function(){
    'use strict';

    angular.module('preferenceController', [])
        .controller('PreferenceController', PreferenceController);

    PreferenceController.$inject = ['$location', '$window', 'Preference', 'socketio', 'Toast'];

    function PreferenceController($location, $window, Preference, socketio, Toast){
        var vm = this;
        vm.guiaPreloader = true;
        vm.preferenceTable = false;
        //getAllPreference
        Preference.getAllPreferences()
            .success(function(data){
                vm.preferences = data;
                console.log(data);
                vm.guiaPreloader = false;
                vm.preferenceTable = true;
                Toast.success();
            });
        //addPreference
        vm.addPreference = function(){
            console.log('Added New Preference');
            Preference.preference(vm.preferenceData)
                .success(function(data){
                    vm.preferenceData = '';
                    console.log(data);
                });
        };
        socketio.on('preference', function(data){
            vm.preferences.push(data);
        });
        //activatePreference
        vm.activatePreference = function(id,value){
            console.log('Preference Activated');
            Preference.activatePreference(id, value)
                .success(function(data){
                    console.log('Updated Preference')
                    console.log(data);
                }).error(function(){
                    console.log('FAIL');
                });
        };
        //getPreferenceInfo
        vm.getPreferenceInfo = function(id,preference){
            vm.preferenceData = {
                _id: id,
                preference: preference
            };
        }
        //updatePreference
        vm.updatePreference = function(id,updatedValue){
            console.log('Preference Updated');
            Preference.updatePreference(id,updatedValue)
                .success(function(data){
                    console.log('Updated Preference')
                    console.log(data);
                }).error(function(){
                    console.log('FAIL');
                });
        };
    }
})();