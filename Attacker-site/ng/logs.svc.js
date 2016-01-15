angular.module('app')
.service('LogsSvc', function ($http) {
    this.fetch = function () {
        return $http.get('/api/logs');
    }
});