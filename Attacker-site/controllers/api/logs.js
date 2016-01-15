var Log = require('../../models/log');
var Keylog = require('../../models/keylog');
var router = require('express').Router();
var ws = require('../../websockets');

router.get('/', function (req, res, next) {
    Log.find()
    .sort('-date')
    .exec(function (err, logs) {
        if (err) {
            console.log(err);
            return next(err);
        }
        return res.status(200).json(logs);
    });
});

router.get('/add', function (req, res, next) {
    var log = new Log({
        date: new Date().valueOf(),
        origin: req.query.origin,
        value: req.query.value,
        type: req.query.type,
    });
    log.save(function (err, log) {
        if (err) {
            console.log(err);
            return next(err);
        }
        ws.broadcast('new_log', log);
        return res.status(201).json(log);
    });
});

module.exports = router;
