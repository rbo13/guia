(function(){
    'use strict';

    angular.module('userController', [])
        .controller('UserController', UserController);

    UserController.$inject = ['$location', '$window', 'User', 'Guide'];

    function UserController($location, $window, User, Guide){
        var vm = this;

        //getAllGuides
        User.getAllGuides()
            .success(function(data){
                vm.guides = data;
                console.log(data);
            });
        //updateGuide
        vm.activateGuide = function(guide_user_id, id, value){
            vm.user = function(){
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
                    vm.user();
                    console.log(data);
                }).error(function(){
                    console.log('FAIL');
                });
        }

    }
})();