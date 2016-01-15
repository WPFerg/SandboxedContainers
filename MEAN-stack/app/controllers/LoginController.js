'use strict';

angular.module('mean')
.controller('LoginController', ['$scope', '$location', 'UserService', function($scope, $location, UserService) {

        $scope.submitForm = function() {
            $scope.error = false;

            var user = {
                email: $scope.email,
                password: $scope.password
            };

            UserService.login(user).then(function() {
                $location.path("/");
            }).catch(function() {
                $scope.error = true;
            });
        };
}]);