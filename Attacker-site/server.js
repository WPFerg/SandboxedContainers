var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');
var winston = require('winston');
var expressWinston = require('express-winston');
var ws = require('./websockets');

var app = express();
app.use(bodyParser.json());

app.use(expressWinston.logger({
    transports: [
        new winston.transports.File({
            json: true,
            filename: './logs/request.log'
        })
    ]
}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/api/logs', require('./controllers/api/logs'));
app.use('/api/keylog', require('./controllers/api/keylog'));
app.use(require('./controllers/static'));

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.File({
            json: true,
            filename: './logs/error.log'
        })
    ]
}));

var httpServer = http.createServer(app);
httpServer.listen(config.port, function () {
    console.log('Server listening on', config.port);
});

ws.connect(httpServer, config.port);
