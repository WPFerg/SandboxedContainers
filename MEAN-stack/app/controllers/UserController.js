'use strict';

angular.module('mean')
.controller('UserController', ['$scope', '$location', 'UserService', function($scope, $location, UserService) {

    $scope.submitForm = function() {
        $scope.error = false;

        var user = {
            username: $scope.username,
            email: $scope.email,
            password: $scope.password
        };

        UserService.register(user).then(function() {
            $location.path("/login");
        }).catch(function() {
            $scope.error = true;
        });
    };
}]);