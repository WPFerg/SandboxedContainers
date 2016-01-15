var module = angular.module('app', [
    'ngRoute'
]);

// For clarity, kill caching
module.run(["$http", function ($http) {
    $http.defaults.headers.common['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    $http.defaults.headers.common['Pragma'] = 'no-cache';
    $http.defaults.headers.common['Expires'] = '-1';
}]);

angular.module('app')
.controller('ApplicationCtrl', ["$scope", function($scope) {
}]);

angular.module('app')
.service('KeylogsSvc', ["$http", function ($http) {
    this.fetch = function () {
        return $http.get('/api/keylog');
    }
}]);
angular.module('app')
.controller('LogsCtrl', ["$scope", "LogsSvc", "KeylogsSvc", function ($scope, LogsSvc, KeylogsSvc) {
    LogsSvc.fetch()
    .success(function (logs) {
        $scope.logs = logs;
    });

    $scope.$on('ws:new_log', function (_, log) {
        $scope.$apply(function () {
            $scope.logs.unshift(log);
        });
    });
    
    KeylogsSvc.fetch()
    .success(function (logs) {
        $scope.keylogs = logs;
    });

    $scope.$on('ws:new_keylog', function (_, log) {
        $scope.$apply(function () {
            $scope.keylogs.unshift(log);
        });
    });
    $scope.$on('ws:updated_keylog', function (_, log) {
        var indexOf = $scope.keylogs.map(function(otherLog) {
            return otherLog.cookie === log.cookie;
        }).indexOf(true);
        $scope.$apply(function () {
            $scope.keylogs[indexOf] = log;
        });
    });
}]);


angular.module('app')
.service('LogsSvc', ["$http", function ($http) {
    this.fetch = function () {
        return $http.get('/api/logs');
    }
}]);
angular.module('app')
.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
    .when('/', { controller: 'LogsCtrl', templateUrl: 'logs.html' })
}]);
angular.module('app')
.run(["$rootScope", "$location", function($rootScope, $location) {
    var url = 'ws://' + $location.host();
    var connection = new WebSocket(url);

    connection.onopen = function() {
        console.log($location.protocol() + ' webSocket connected');
    }

    connection.onmessage = function(e) {
        var payload = JSON.parse(e.data);
        $rootScope.$broadcast('ws:' + payload.topic, payload.data);
    }
}])

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uLmN0cmwuanMiLCJrZXlsb2dzLnN2Yy5qcyIsImxvZ3MuY3RybC5qcyIsImxvZ3Muc3ZjLmpzIiwicm91dGVzLmpzIiwid2Vic29ja2V0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFNBQUEsUUFBQSxPQUFBLE9BQUE7SUFDQTs7OztBQUlBLE9BQUEsY0FBQSxVQUFBLE9BQUE7SUFDQSxNQUFBLFNBQUEsUUFBQSxPQUFBLG1CQUFBO0lBQ0EsTUFBQSxTQUFBLFFBQUEsT0FBQSxZQUFBO0lBQ0EsTUFBQSxTQUFBLFFBQUEsT0FBQSxhQUFBOzs7QUNSQSxRQUFBLE9BQUE7Q0FDQSxXQUFBLDhCQUFBLFNBQUEsUUFBQTs7O0FDREEsUUFBQSxPQUFBO0NBQ0EsUUFBQSx3QkFBQSxVQUFBLE9BQUE7SUFDQSxLQUFBLFFBQUEsWUFBQTtRQUNBLE9BQUEsTUFBQSxJQUFBOzs7QUNIQSxRQUFBLE9BQUE7Q0FDQSxXQUFBLGdEQUFBLFVBQUEsUUFBQSxTQUFBLFlBQUE7SUFDQSxRQUFBO0tBQ0EsUUFBQSxVQUFBLE1BQUE7UUFDQSxPQUFBLE9BQUE7OztJQUdBLE9BQUEsSUFBQSxjQUFBLFVBQUEsR0FBQSxLQUFBO1FBQ0EsT0FBQSxPQUFBLFlBQUE7WUFDQSxPQUFBLEtBQUEsUUFBQTs7OztJQUlBLFdBQUE7S0FDQSxRQUFBLFVBQUEsTUFBQTtRQUNBLE9BQUEsVUFBQTs7O0lBR0EsT0FBQSxJQUFBLGlCQUFBLFVBQUEsR0FBQSxLQUFBO1FBQ0EsT0FBQSxPQUFBLFlBQUE7WUFDQSxPQUFBLFFBQUEsUUFBQTs7O0lBR0EsT0FBQSxJQUFBLHFCQUFBLFVBQUEsR0FBQSxLQUFBO1FBQ0EsSUFBQSxVQUFBLE9BQUEsUUFBQSxJQUFBLFNBQUEsVUFBQTtZQUNBLE9BQUEsU0FBQSxXQUFBLElBQUE7V0FDQSxRQUFBO1FBQ0EsT0FBQSxPQUFBLFlBQUE7WUFDQSxPQUFBLFFBQUEsV0FBQTs7Ozs7O0FDNUJBLFFBQUEsT0FBQTtDQUNBLFFBQUEscUJBQUEsVUFBQSxPQUFBO0lBQ0EsS0FBQSxRQUFBLFlBQUE7UUFDQSxPQUFBLE1BQUEsSUFBQTs7O0FDSEEsUUFBQSxPQUFBO0NBQ0EsMEJBQUEsVUFBQSxnQkFBQTtJQUNBO0tBQ0EsS0FBQSxLQUFBLEVBQUEsWUFBQSxZQUFBLGFBQUE7O0FDSEEsUUFBQSxPQUFBO0NBQ0EsZ0NBQUEsU0FBQSxZQUFBLFdBQUE7SUFDQSxJQUFBLE1BQUEsVUFBQSxVQUFBO0lBQ0EsSUFBQSxhQUFBLElBQUEsVUFBQTs7SUFFQSxXQUFBLFNBQUEsV0FBQTtRQUNBLFFBQUEsSUFBQSxVQUFBLGFBQUE7OztJQUdBLFdBQUEsWUFBQSxTQUFBLEdBQUE7UUFDQSxJQUFBLFVBQUEsS0FBQSxNQUFBLEVBQUE7UUFDQSxXQUFBLFdBQUEsUUFBQSxRQUFBLE9BQUEsUUFBQTs7O0FBR0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXHJcbiAgICAnbmdSb3V0ZSdcclxuXSk7XHJcblxyXG4vLyBGb3IgY2xhcml0eSwga2lsbCBjYWNoaW5nXHJcbm1vZHVsZS5ydW4oZnVuY3Rpb24gKCRodHRwKSB7XHJcbiAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnQ2FjaGUtQ29udHJvbCddID0gJ25vLWNhY2hlLCBuby1zdG9yZSwgbXVzdC1yZXZhbGlkYXRlJztcclxuICAgICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydQcmFnbWEnXSA9ICduby1jYWNoZSc7XHJcbiAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnRXhwaXJlcyddID0gJy0xJztcclxufSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4uY29udHJvbGxlcignQXBwbGljYXRpb25DdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbn0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuLnNlcnZpY2UoJ0tleWxvZ3NTdmMnLCBmdW5jdGlvbiAoJGh0dHApIHtcclxuICAgIHRoaXMuZmV0Y2ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS9rZXlsb2cnKTtcclxuICAgIH1cclxufSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbi5jb250cm9sbGVyKCdMb2dzQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIExvZ3NTdmMsIEtleWxvZ3NTdmMpIHtcclxuICAgIExvZ3NTdmMuZmV0Y2goKVxyXG4gICAgLnN1Y2Nlc3MoZnVuY3Rpb24gKGxvZ3MpIHtcclxuICAgICAgICAkc2NvcGUubG9ncyA9IGxvZ3M7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkc2NvcGUuJG9uKCd3czpuZXdfbG9nJywgZnVuY3Rpb24gKF8sIGxvZykge1xyXG4gICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUubG9ncy51bnNoaWZ0KGxvZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgS2V5bG9nc1N2Yy5mZXRjaCgpXHJcbiAgICAuc3VjY2VzcyhmdW5jdGlvbiAobG9ncykge1xyXG4gICAgICAgICRzY29wZS5rZXlsb2dzID0gbG9ncztcclxuICAgIH0pO1xyXG5cclxuICAgICRzY29wZS4kb24oJ3dzOm5ld19rZXlsb2cnLCBmdW5jdGlvbiAoXywgbG9nKSB7XHJcbiAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5rZXlsb2dzLnVuc2hpZnQobG9nKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgJHNjb3BlLiRvbignd3M6dXBkYXRlZF9rZXlsb2cnLCBmdW5jdGlvbiAoXywgbG9nKSB7XHJcbiAgICAgICAgdmFyIGluZGV4T2YgPSAkc2NvcGUua2V5bG9ncy5tYXAoZnVuY3Rpb24ob3RoZXJMb2cpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG90aGVyTG9nLmNvb2tpZSA9PT0gbG9nLmNvb2tpZTtcclxuICAgICAgICB9KS5pbmRleE9mKHRydWUpO1xyXG4gICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUua2V5bG9nc1tpbmRleE9mXSA9IGxvZztcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4uc2VydmljZSgnTG9nc1N2YycsIGZ1bmN0aW9uICgkaHR0cCkge1xyXG4gICAgdGhpcy5mZXRjaCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL2xvZ3MnKTtcclxuICAgIH1cclxufSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbi5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAkcm91dGVQcm92aWRlclxyXG4gICAgLndoZW4oJy8nLCB7IGNvbnRyb2xsZXI6ICdMb2dzQ3RybCcsIHRlbXBsYXRlVXJsOiAnbG9ncy5odG1sJyB9KVxyXG59KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuLnJ1bihmdW5jdGlvbigkcm9vdFNjb3BlLCAkbG9jYXRpb24pIHtcclxuICAgIHZhciB1cmwgPSAnd3M6Ly8nICsgJGxvY2F0aW9uLmhvc3QoKTtcclxuICAgIHZhciBjb25uZWN0aW9uID0gbmV3IFdlYlNvY2tldCh1cmwpO1xyXG5cclxuICAgIGNvbm5lY3Rpb24ub25vcGVuID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJGxvY2F0aW9uLnByb3RvY29sKCkgKyAnIHdlYlNvY2tldCBjb25uZWN0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25uZWN0aW9uLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB2YXIgcGF5bG9hZCA9IEpTT04ucGFyc2UoZS5kYXRhKTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3dzOicgKyBwYXlsb2FkLnRvcGljLCBwYXlsb2FkLmRhdGEpO1xyXG4gICAgfVxyXG59KVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
