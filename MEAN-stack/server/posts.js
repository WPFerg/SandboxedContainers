var ws = require('../websockets');
module.exports = function(app, db) {
    var collection = db.collection("posts");

    app.get("/api/posts", function(req, res) {
        var regex = new RegExp(req.query.search || "", "i");
        collection.find({$query: {body: {$regex: regex}}, $orderby: {time: -1}}, function(err, posts) {
            posts.toArray(function(err, doc) {
                res.json(doc);
            });
        });
    });

    app.post("/api/posts", function(req, res) {
        var post = {
            time: new Date().valueOf(),
            username: req.body.username,
            body: req.body.body
        };
        collection.insert(post, function(err, doc) {
            if (err) {
                res.status(500).send();
            } else {
                res.status(201).send();
                ws.broadcast('post', post);
            }
        });
    });
};
