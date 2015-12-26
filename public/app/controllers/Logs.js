(function(){
    'use strict';

    angular.module('logsController', [])
        .controller('LogsController', LogsController);

    LogsController.$inject = ['Log', 'Toast', 'socketio'];

    function LogsController(Log, Toast, socketio){
        var vm = this;

        vm.guiaPreloader = false;
        vm.logTable = false;
        vm.log = [];

        Log.getLogs()
            .success(function(data){
                vm.logs = data;
                console.log(data.activity);
                vm.guiaPreloader = false;
                vm.logTable = true;
                Toast.success();
        });
        socketio.on('new_log', function(data){
            vm.logs.push(data);
        });

    }
})();