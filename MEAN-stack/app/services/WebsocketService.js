angular.module("mean.services")
.service('WebsocketService', ['$rootScope', '$location', function($rootScope, $location) {
        var url = $location.protocol() === 'http' ? 'ws://' + $location.host() : 'wss://' + $location.host();
        var connection = new WebSocket(url);

        connection.onopen = function() {
            console.log($location.protocol() + ' webSocket connected');
        }

        connection.onmessage = function(e) {
            var payload = JSON.parse(e.data);
            $rootScope.$broadcast('ws:' + payload.topic, payload.data);
        }
    }
]);