var jwt = require("jwt-simple");
var config = require("../config");

module.exports = function(app, db) {
    var collection = db.collection("users");

    app.get("/api/user", function(req, res) {
        if (!req.headers['x-auth']) {
            return res.sendStatus(401);
        }
        var auth = jwt.decode(req.headers['x-auth'], config.secret);

        collection.findOne({email: auth.email}, function(err, user) {
            if (err) {
                 return res.status(500).send();
            }
            if (user) {
                res.status(200).json({name: user.username});
            } else {
                res.status(403).send();
            }
        });
    });

    app.post("/api/user", function(req, res) {
        var user = {
            username: req.body.username,
            email: req.body.email, 
            password: req.body.password
        };
        collection.findOne({email: user.email}, function(err, doc) {
            if (err) {
                res.status(500).send();
                return;
            }
            if (!doc) {
                collection.insert(user, function(err, doc) {
                    res.status(201).send();
                });
            } else {
                res.status(400).send();
            }
        });
    });

    app.post("/api/login", function(req, res) {
        var user = {
            email: req.body.email, 
            password: req.body.password
        };
        collection.findOne(user, function(err, doc) {
            if (err) {
                res.status(500).send();
            }
            if (doc) {
                var token = jwt.encode({email: user.email}, config.secret);
                res.send({token: token, username: doc.username});
            } else {
                res.status(403).send();
            }
        });
    });
};
