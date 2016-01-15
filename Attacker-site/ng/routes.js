angular.module('app')
.config(function ($routeProvider) {
    $routeProvider
    .when('/', { controller: 'LogsCtrl', templateUrl: 'logs.html' })
});