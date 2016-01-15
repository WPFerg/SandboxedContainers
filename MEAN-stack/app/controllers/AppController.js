'use strict';

angular.module('mean')
.controller('AppController', ['$scope', '$rootScope', '$location', 'UserService',
    function($scope, $rootScope, $location, UserService) {

        $scope.username = UserService.getUserName();

        $scope.$on("login", function(event, user) {
            $scope.username = user.username;
        });

        $scope.$on("logout", function(event, user) {
            $scope.username = null;
        });

        $scope.logout = function() {
            UserService.logout();
            $location.path('/login');
        };
}]);