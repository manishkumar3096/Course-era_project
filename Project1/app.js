(function () {
'use strict'
    angular.module('lunchapp', [])
        .controller('Lunchcontroller', Lunchcontroller)

    Lunchcontroller.$inject = ['$scope', '$filter']

    function Lunchcontroller($scope, $filter) {
        $scope.lunchtextbox = '';
        $scope.checkstatus = '';
        $scope.messagestyle = '';
        $scope.textboxstyle = '';
        $scope.checkitems = function () {
            var checklunch;
            var returnstmt;
            var individualdata = (($scope.lunchtextbox).split(','))
            checklunch = individualdata.length;
            console.log(individualdata,checklunch)
            if (checklunch == 0) { returnstmt = "Please enter data first" 
            $scope.messagestyle = {'color': 'red'}
            $scope.textboxstyle = {'border-color': 'red'}}
            else{
            for(let i=0;i<individualdata.length;i++){
                console.log(individualdata)
                individualdata[i]= individualdata[i].split(/\s/).join('')
                if(individualdata[i].length <= 0){checklunch -=1}
            }
            if (checklunch == 0) { returnstmt = "Please enter data first"
            $scope.messagestyle = {'color': 'red'};
            $scope.textboxstyle = {'border-color': 'red'};}
            else if (checklunch > 3) {
                returnstmt = "Too much!"
                $scope.messagestyle = {'color':'green'}
                $scope.textboxstyle = {'border-color': 'green'};
            }
            else if (checklunch <= 3) {
                returnstmt = "Enjoy!"
                $scope.messagestyle = {'color': 'green'};
                $scope.textboxstyle = {'border-color': 'green'};
            }
        }
        console.log(returnstmt,$scope.messagestyle)
            $scope.checkstatus = returnstmt;
            return $scope.checkstatus;
        }

    }

})();