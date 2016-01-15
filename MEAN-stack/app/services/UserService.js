angular.module("mean.services")
.service("UserService", ["LocalStorageService", "$rootScope", "$http", "$q",
    function(LocalStorageService, $rootScope, $http, $q) {

        var userToken = LocalStorageService.getItem("token") || {};

        var service = {};
        var baseUrl = "/api";
        service.get = function() {
            return $q(function(resolve, reject) {
                $http.get(baseUrl + "/user", {
                    headers: {
                        "X-Auth": userToken.token
                    }
                }).then(function(success) {
                    LocalStorageService.setItem("loggedInUser", success);
                    resolve(success);
                }).catch(reject);
            });
        };

        service.register = function(data) {
            return $http.post(baseUrl + "/user", data);
        };

        service.getUserName = function() {
            return userToken.username;
        };

        service.login = function(data) {
            return $q(function(resolve, reject) {
                $http.post(baseUrl + "/login", data).then(function(success) {
                    LocalStorageService.setItem("token", JSON.stringify(success.data));
                    userToken = success.data;
                    $rootScope.$broadcast("login", success.data);
                    resolve(success);
                }).catch(reject);
            });
        };

        service.logout = function() {
            LocalStorageService.removeItem("token");
            $rootScope.$broadcast("logout");
        };

        service.get();

        return service;
    }
]);
