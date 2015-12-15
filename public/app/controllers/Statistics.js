(function(){
    'use strict';

    angular.module('statisticsController', [])
        .controller('StatisticsController', StatisticsController);

    StatisticsController.$inject = ['Toast', 'Statistic'];

    function StatisticsController(Toast,Statistic){
        var vm = this;
        Toast.success();

        //Users
        vm.userQuarter = 0;
        vm.userYear = 2015;
        Statistic.getUsers()
            .success(function(data){
                vm.uData = data;
                vm.userTabulate();
            });
        vm.userTabulate = function(){
            var u = [0,0,0];
            var g = [0,0,0];
            console.log(vm.userQuarter);
            //vm.userQuarter = 2;
            switch(vm.userQuarter){
                case 0: vm.userLabels = ["January", "February", "March",
                    "April", "May", "June",
                    "July", "August", "September",
                    "October", "November", "December"];
                    var u = [0,0,0,0,0,0,0,0,0,0,0,0];
                    var g = [0,0,0,0,0,0,0,0,0,0,0,0];
                    break;
                case 1: var u = [0,0,0];
                    var g = [0,0,0];
                    vm.userLabels = ["January", "February", "March"];
                    break;
                case 2: var u = [0,0,0];
                    var g = [0,0,0];
                    vm.userLabels = ["April", "May", "June"];
                    break;
                case 3: var u = [0,0,0];
                    var g = [0,0,0];
                    vm.userLabels = ["July", "August", "September"];
                    break;
                case 4: var u = [0,0,0];
                    var g = [0,0,0];
                    vm.userLabels = ["October", "November", "December"];
                    break;
            }
            for(var x in vm.uData){
                var date = new Date(vm.uData[x].created);
                var month = date.getMonth();
                var year = date.getFullYear();
                if((month%12==0)&&(year==vm.userYear)){
                    u[0]+=1;
                    g[0]=(vm.uData[x].guide_id!="")?g[0]+1:g[0];
                }else if((month%12==1)&&(year==vm.userYear)){
                    u[1]+=1;
                    g[1]=(vm.uData[x].guide_id!="")?g[1]+1:g[1];
                }else if((month%12==2)&&(year==vm.userYear)){
                    u[2]+=1;
                    g[2]=(vm.uData[x].guide_id!="")?g[2]+1:g[2];
                }else if((month%12==3)&&(year==vm.userYear)){
                    u[3]+=1;
                    g[3]=(vm.uData[x].guide_id!="")?g[3]+1:g[3];
                }else if((month%12==4)&&(year==vm.userYear)){
                    u[4]+=1;
                    g[4]=(vm.uData[x].guide_id!="")?g[4]+1:g[4];
                }else if((month%12==5)&&(year==vm.userYear)){
                    u[5]+=1;
                    g[5]=(vm.uData[x].guide_id!="")?g[5]+1:g[5];
                }else if((month%12==6)&&(year==vm.userYear)){
                    u[6]+=1;
                    g[6]=(vm.uData[x].guide_id!="")?g[6]+1:g[6];
                }else if((month%12==7)&&(year==vm.userYear)){
                    u[7]+=1;
                    g[7]=(vm.uData[x].guide_id!="")?g[7]+1:g[7];
                }else if((month%12==8)&&(year==vm.userYear)){
                    u[8]+=1;
                    g[8]=(vm.uData[x].guide_id!="")?g[8]+1:g[8];
                }else if((month%12==9)&&(year==vm.userYear)){
                    u[9]+=1;
                    g[9]=(vm.uData[x].guide_id!="")?g[9]+1:g[9];
                }else if((month%12==10)&&(year==vm.userYear)){
                    u[10]+=1;
                    g[10]=(vm.uData[x].guide_id!="")?g[10]+1:g[10];
                }else if((month%12==11)&&(year==vm.userYear)){
                    u[11]+=1;
                    g[11]=(vm.uData[x].guide_id!="")?g[11]+1:g[11];
                }
                vm.userSeries = ['Users', 'Guides'];
                vm.userData = [u,g];
            }
        };
        //End of Users

        //Bookings
        Statistic.getBookings()
            .success(function(data){
                vm.bData = data;
                vm.bookingTabulate();
            });

        vm.bookingTabulate = function(){
            var b = [0,0,0,0,0,0,0,0,0,0,0,0];
            var a = [0,0,0,0,0,0,0,0,0,0,0,0];
            for(var x in vm.bData){
                var date = new Date(vm.bData[x].schedule);
                var month = date.getMonth();
                var year = date.getFullYear();
                if((month%12==0)&&(year==vm.userYear)){
                    b[0]+=1;
                    a[0]=(vm.bData[x].status=="accept")?a[0]+1:a[0];
                }else if((month%12==1)&&(year==vm.userYear)){
                    b[1]+=1;
                    a[1]=(vm.bData[x].status=="accept")?a[1]+1:a[1];
                }else if((month%12==2)&&(year==vm.userYear)){
                    b[2]+=1;
                    a[2]=(vm.bData[x].status=="accept")?a[2]+1:a[2];
                }else if((month%12==3)&&(year==vm.userYear)){
                    b[3]+=1;
                    a[3]=(vm.bData[x].status=="accept")?a[3]+1:a[3];
                }else if((month%12==4)&&(year==vm.userYear)){
                    b[4]+=1;
                    a[4]=(vm.bData[x].status=="accept")?a[4]+1:a[4];
                }else if((month%12==5)&&(year==vm.userYear)){
                    b[5]+=1;
                    a[5]=(vm.bData[x].status=="accept")?a[5]+1:a[5];
                }else if((month%12==6)&&(year==vm.userYear)){
                    b[6]+=1;
                    a[6]=(vm.bData[x].status=="accept")?a[6]+1:a[6];
                }else if((month%12==7)&&(year==vm.userYear)){
                    b[7]+=1;
                    a[7]=(vm.bData[x].status=="accept")?a[7]+1:a[7];
                }else if((month%12==8)&&(year==vm.userYear)){
                    b[8]+=1;
                    a[8]=(vm.bData[x].status=="accept")?a[8]+1:a[8];
                }else if((month%12==9)&&(year==vm.userYear)){
                    b[9]+=1;
                    a[9]=(vm.bData[x].status=="accept")?a[9]+1:a[9];
                }else if((month%12==10)&&(year==vm.userYear)){
                    b[10]+=1;
                    a[10]=(vm.bData[x].status=="accept")?a[10]+1:a[10];
                }else if((month%12==11)&&(year==vm.userYear)){
                    b[11]+=1;
                    a[11]=(vm.bData[x].status=="accept")?a[11]+1:a[11];
                }
            }
            vm.bookingSeries = ['Total Bookings', 'Accepted Bookings'];
            vm.bookingData = [b,a];
        };
        //End of Bookings

        //Tours
        //End of tours
        vm.report = "Monthly";

        vm.labels = ["January", "February", "March", "April", "May", "June", "July"];
        vm.series = ['Series A', 'Series B'];
        vm.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        vm.onClick = function (points, evt) {
            console.log(points, evt);
        };
    }

})();