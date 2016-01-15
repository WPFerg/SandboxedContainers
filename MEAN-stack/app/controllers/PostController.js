'use strict';

angular.module('mean')
.controller('PostController', ['$scope', '$sce', '$location', 'PostService', 'UserService', 'WebsocketService',
    function($scope, $sce, $location, PostService, UserService) {
        var hash = decodeURIComponent($location.search().search || "");
        $scope.searchString = hash;
        $scope.trustedSearch = $sce.trustAsHtml(hash);

        PostService.get(hash).then(function(success) {
            $scope.posts = success.data.map(function(datum) {
                datum.trustedBody = $sce.trustAsHtml(datum.body);
                return datum;
            });
        });

        $scope.loggedIn = UserService.getUserName();

        $scope.$on('ws:post', function(event, data) {
            data.trustedBody = $sce.trustAsHtml(data.body);
            $scope.posts.unshift(data);
            $scope.$apply();
        });

        $scope.submitPost = function() {
            PostService.create($scope.postBody);
            $scope.postBody = "";
        };

        $scope.search = function() {
            $location.search({search: $scope.searchString});
        };
    }
]);