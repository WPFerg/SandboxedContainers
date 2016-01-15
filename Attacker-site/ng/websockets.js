angular.module('app')
.run(function($rootScope, $location) {
    var url = 'ws://' + $location.host();
    var connection = new WebSocket(url);

    connection.onopen = function() {
        console.log($location.protocol() + ' webSocket connected');
    }

    connection.onmessage = function(e) {
        var payload = JSON.parse(e.data);
        $rootScope.$broadcast('ws:' + payload.topic, payload.data);
    }
})
