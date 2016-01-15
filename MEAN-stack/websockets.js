var config = require('./config');
var ws = require('ws');
var _ = require('lodash');

var clients = [];

exports.connect = function(server, port) {
    console.log('WebSockets connected on ', port);
    var wss = new ws.Server({ server: server, perMessageDeflate: false });
    wss.on('connection', function (ws) {
        clients.push(ws);
        ws.on('close', function() {
            _.remove(clients, ws);
        });
    });
}

exports.broadcast = function(topic, data) {
    var json = JSON.stringify({ topic: topic, data: data });
    clients.forEach(function(client) {
        client.send(json, {binary: false, mask: false});
    });
}
