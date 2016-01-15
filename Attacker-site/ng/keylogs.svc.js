angular.module('app')
.service('KeylogsSvc', function ($http) {
    this.fetch = function () {
        return $http.get('/api/keylog');
    }
});