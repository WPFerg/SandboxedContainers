angular.module('mean.services', [])

.service('LocalStorageService', ['$window', function($window) {
    var storage = {};
    
    storage.getItem = function(key) {
        var storageItem = $window.localStorage.getItem(key);
        return JSON.parse(storageItem) || storageItem;
    };
    
    storage.setItem = function(key, value) {
        return $window.localStorage.setItem(key, value);
    };

    storage.removeItem = function(key) {
        return $window.localStorage.removeItem(key);
    };

    return storage;
}]);