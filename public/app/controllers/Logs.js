(function(){
    'use strict';

    angular.module('logsController', [])
        .controller('LogsController', LogsController);

    LogsController.$inject = ['Log', 'Toast', 'socketio', 'User'];

    function LogsController(Log, Toast, socketio, User){
        var vm = this;

        vm.guiaPreloader = false;
        vm.logTable = false;
        vm.logs = [];

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

        Log.getLogs()
            .success(function(data){
                vm.logs = data;
                vm.guiaPreloader = false;
                vm.logTable = true;
                Toast.success();
        });
        socketio.on('new_log', function(data){
            vm.logs.push(data);
        });

    }
})();