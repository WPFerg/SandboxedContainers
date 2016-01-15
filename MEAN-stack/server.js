var express = require("express");
var bodyParser = require("body-parser");
var http = require("http");
var https = require("https");
var fs = require("fs");
var ws = require("./websockets")
var config = require("./config");

var mongo = require("mongodb").MongoClient;
var users = require("./server/users");
var posts = require("./server/posts");


var app = express();

app.use(bodyParser.json());
app.use(express.static("./app"));

var credentials = {
    key: fs.readFileSync('./mean_stack-key.pem'),
    cert: fs.readFileSync('./mean_stack-cert.pem')
};

// Connect Mongo
mongo.connect("mongodb://localhost/social", function(err, db) {

    if (err) {
        console.error("[Error] Failed to connect to Mongo:", err);
    } else {
        users(app, db);
        posts(app, db);

        var httpServer = http.createServer(app);
        httpServer.listen(config.port, function() {
            console.log("Listening on port:", config.port);
        });
        ws.connect(httpServer, config.port);

        var httpsServer = https.createServer(credentials, app);
        httpsServer.listen(config.securePort, function() {
            console.log("Listening securely on port:", config.securePort);
        });
        ws.connect(httpsServer, config.securePort);
    }
});

