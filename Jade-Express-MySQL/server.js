var express = require('express');
var fs = require('fs');
var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');
var config = require('./config');
var winston = require('winston');
var expressWinston = require('express-winston');
var session = require('express-session');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { path: '/', httpOnly: false, secure: false, maxAge: null }
}));

app.use(expressWinston.logger({
    transports: [
        new winston.transports.File({
            json: true,
            filename: './logs/request.log'
        })
    ]
}));

app.use(function(req, res, next) {
    // Please don't do this. We've just enabled it here to allow XSS.
    res.header('X-XSS-Protection', "0");
    res.header('Content-Security-Policy', "script-src 'unsafe-eval' 'unsafe-inline' *");
    next();
});

app.use('/', require('./controllers/posts'));
app.use('/register', require('./controllers/register'));
app.use('/login', require('./controllers/login'));
app.use(require('./controllers/static'));

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.File({
            json: true,
            filename: './logs/error.log'
        })
    ]
}));

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

app.get('/logout', function (req, res) {
    delete req.session.currentUser;
    res.redirect('/');
});

var credentials = {
    key: fs.readFileSync('./jade_express_mysql-key.pem'),
    cert: fs.readFileSync('./jade_express_mysql-cert.pem')
};

var httpServer = http.createServer(app);
httpServer.listen(config.port, function () {
    console.log('Server listening on', config.port);
});

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(config.tlsport, function () {
    console.log('Server listening securely on', config.tlsport);
});
