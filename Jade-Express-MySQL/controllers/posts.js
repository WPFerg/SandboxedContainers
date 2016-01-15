var router = require('express').Router();
var connection = require('../db/db');

var errmsg = null;

router.get('/', function (req, res) {
    req.query.search = req.query.search || '';
    connection.query('SELECT * from posts WHERE body LIKE "%' + req.query.search + '%" ORDER BY date DESC', function (err, rows) {
        res.render('posts',
        {
            search: req.query.search,
            posts: rows,
            currentUser: req.session.currentUser,
            errmsg: errmsg
        });
    });
});

router.post('/', function (req, res, next) {
    if (!req.session.currentUser) {
        return next('Not authenticated');
    }
    var body = req.body.body;

    // Basic attempt to stop XSS.
    // body = body.replace("<script", "&lt;script");
    // body = body.replace("</script>", "&lt;/script&gt;");

    // Slightly less basic attempt:
    // body = body.replace(/<script/gi, "&lt;script");
    // body = body.replace(/<\/script>/gi, "&lt;/script&gt;");

    // Better attempt:
    // body = body.replace("<", "&lt;");
    // body = body.replace(">", "&gt;");

    var query = "INSERT INTO posts (username, body, date) VALUES ('" + req.session.currentUser.name + "', '" + body + "', NOW())";
    connection.query(query, function (err) {
        errmsg = null;
        if (err) {
            errmsg = err;
            console.log(err);
        }
    });
    res.redirect('/');
});

module.exports = router;
