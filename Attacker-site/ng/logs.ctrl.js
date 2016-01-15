angular.module('app')
.controller('LogsCtrl', function ($scope, LogsSvc, KeylogsSvc) {
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
});

