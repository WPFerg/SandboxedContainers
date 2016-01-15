var router = require('express').Router();
var connection = require('../db/db');

var errmsg = null;

router.get('/', function (req, res) {
    res.render('login',
    {
        errmsg: errmsg,
        currentUser: req.session.currentUser
    });
    errmsg = null;
});

router.post('/', function (req, res, next) {
    var query = "SELECT * from users WHERE email = '" + req.body.email + "' AND password = '" + req.body.password + "'";
    console.log(query);
    connection.query(query, function (err, rows) {
        if (err) {
            return next(err);
        } 
        console.log(rows);
        if (rows.length !== 1) {
            errmsg = 'Incorrect username or password';
            return res.redirect('/login');
        }
        req.session.currentUser = { email: rows[0].email, name: rows[0].name };
        return res.redirect('/');
    });
});

module.exports = router;
