(function(){
    'use strict';

    angular.module('subscriberController', [])
        .controller('SubscriberController', SubscriberController);

    SubscriberController.$inject = ['Subscriber'];

    function SubscriberController(Subscriber){
        var vm = this;
        vm.addSubscriber = function(){
        	console.log("Added new subscriber");
        	Subscriber.addSubscriber(vm.email)
        		.success(function(data){
                    vm.email = '';
                    console.log(data);
                });
        }
    }
})();