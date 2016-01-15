angular.module("mean.services")
.service("PostService", ["$http", "LocalStorageService", function($http, LocalStorageService) {
    this.get = function (search) {
        if (search) {
            search = "?search=" + search;
        }
        return $http.get('/api/posts' + (search ? search : ""));
    };
    
    this.create = function (postBody) {
        var userToken = LocalStorageService.getItem("token") || {};
        var post = {
            username: userToken.username,
            body: postBody
        };

        if (post.username) {
            return $http.post('/api/posts', post, {
                headers: { "X-Auth": userToken.token || ""}
            });
        }
    };
}]);