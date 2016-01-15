var router = require('express').Router();
var connection = require('../db/db');

var errmsg = null;

router.get('/', function (req, res) {
    res.render('register',
    {
        errmsg: errmsg,
        currentUser: req.session.currentUser
    });
    errmsg = null;
});

router.post('/', function (req, res, next) {
    connection.query("INSERT INTO users (email, name, password) VALUES ('" + req.body.email + "', '" + req.body.name + "', '" + req.body.password + "')", function(err) {
        if (err) {
            return next(err);
        } else {
            res.redirect('/login');
        }
    });
});

module.exports = router;
