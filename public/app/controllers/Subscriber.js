(function(){
    'use strict';

    angular.module('subscriberController', [])
        .controller('SubscriberController', SubscriberController);

    SubscriberController.$inject = ['Subscriber'];

    function SubscriberController(Subscriber){
        var vm = this;
        vm.errorMessage = false;

        vm.addSubscriber = function(){
            if(!vm.email){
                console.log('Email is required');
            }else{
                console.log('Added new Subscriber');
                Subscriber.addSubscriber(vm.email)
                    .success(function(data){
                        if(data.success){
                            vm.email = '';
                            console.log(data.message);
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