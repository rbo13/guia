(function(){
    'use strict';

    angular.module('userController', [])
        .controller('UserController', UserController);

    UserController.$inject = ['$location', '$window', 'User', 'Guide', 'socketio'];

    function UserController($location, $window, User, Guide, socketio){
        var vm = this;

        vm.guides = [];
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
        };

        socketio.on('guide', function(data){
            vm.guides.push(data);
        });

    }
})();