'use strict';

angular.module('mean', [
  'ngRoute',
  'mean.services',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'templates/PostController.html',
    controller: 'PostController'
  });
  $routeProvider.when('/register', {
    templateUrl: 'templates/UserController.html',
    controller: 'UserController'
  });
  $routeProvider.when('/login', {
    templateUrl: 'templates/LoginController.html',
    controller: 'LoginController'
  });
  $routeProvider.otherwise({redirectTo: '/'});
}]);
