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

        vm.myInterval = 3000;
        vm.slides = [
            {
                image: 'https://pixabay.com/get/e835b8062ce90021d85a5840981318c3fe76e6d01cb5144093f2c5/galaxy-10994_1280.jpg'
            },
            {
                image: 'https://pixabay.com/get/e031b50d2ef51c3e95584500e4454493fe76e6d01cb5144391f4c3/guitar-944261.jpg'
            },
            {
                image: 'https://pixabay.com/get/e835b8062ce90021d85a5840981318c3fe76e6d01cb5144093f2c5/galaxy-10994_1280.jpg'
            },
            {
                image: 'https://pixabay.com/get/e832b50d2bfd1c22d9584518a33219c8b66ae3d11cb4154497f2c578/dahlia-dahlia-174239_1920.jpg'
            }
        ];
    }
})();