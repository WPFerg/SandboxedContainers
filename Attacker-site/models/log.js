var db = require('../db');

var Log = db.model('Log', {
    date: { type: Number, required: true},
    origin: { type: String, required: true },
    value: { type: String, required: true },
    type: { type: String, required: true }
});

module.exports = Log;
