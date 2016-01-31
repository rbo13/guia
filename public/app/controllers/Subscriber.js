(function(){
    'use strict';

    angular.module('subscriberController', [])
        .controller('SubscriberController', SubscriberController);

    SubscriberController.$inject = ['Subscriber'];

    function SubscriberController(Subscriber){
        var vm = this;
        vm.success = false;
        vm.errorMessage = false;

        vm.addSubscriber = function(){
            if(!vm.email){
                console.log('Email is required');
            }else{
                Subscriber.addSubscriber(vm.email)
                    .success(function(data){
                        if(data.success){
                            vm.email = '';
                            console.log(data.message);
                            vm.success = !vm.success;
                        }else{
                            vm.errorMessage = true;
                            vm.errorMessage = data.message;
                            console.log(data.message);
                        }

                    });
            }
        }
    }
})();