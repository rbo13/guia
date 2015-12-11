(function(){
    'use strict';

    angular.module('toastSrvc', [])
        .factory('Toast', function() {

            var success = function(text){
                toastr.success(text, "Success", toastr.options.positionClass);

                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-bottom-right",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
            }

            var error = function(text){
                toastr.error(text);
            }

            var info = function(text){
                toastr.info(text, "Info");
            }

            return {
                success: success,
                error: error,
                info: info
            }
    });
})();