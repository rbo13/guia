(function(){
    'use strict';

    angular.module('userController', [])
        .controller('UserController', UserController);

    UserController.$inject = ['$location', '$window', 'User', 'Guide', 'socketio', 'Toast', 'Log'];

    function UserController($location, $window, User, Guide, socketio, Toast, Log){
        var vm = this;
        vm.guiaPreloader = true;
        vm.userTable = false;
        vm.guides = [];

        //getAllGuides
        User.getAllGuides()
            .success(function(data){
                vm.guiaPreloader = true;
                vm.guides = data;
                console.log(data);
                vm.guiaPreloader = false;
                vm.userTable = true;
                Toast.success(vm.guides);
            });
        //updateGuide
        vm.activateGuide = function(guide_user_id, id, value){
            vm.user = function(){
                User.patchUser(guide_user_id, id)
                    .success(function(data){
                        console.log(data);
                        Log.createLog(data.name + " - Guide Activated")
                                .success(function(data){
                                    console.log(data.email_address + " - Guide Activated");
                        });
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
        };

        socketio.on('new_guide', function(data){
            vm.guides.push(data);
            Toast.info("New Guide Applicant");
        });

        vm.deactivateGuide = function(guide_user_id, id, value){
            vm.user = function(){
                User.deactivate(guide_user_id)
                    .success(function(data){
                        console.log(data);
                        console.log('Deactivated');
                        Log.createLog(data.name + " - Guide Deactivated")
                            .success(function(data){
                                console.log(data.name + " - Guide Deactivated");
                        });
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
        };
    }
})();