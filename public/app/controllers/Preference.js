(function(){
    'use strict';

    angular.module('preferenceController', [])
        .controller('PreferenceController', PreferenceController);

    PreferenceController.$inject = ['$location', '$window', 'Preference'];

    function PreferenceController($location, $window, Preference){
        var vm = this;

        //getAllPreference
        Preference.getAllPreferences()
            .success(function(data){
                vm.preferences = data;
                console.log(data);
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