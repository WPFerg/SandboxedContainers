var express = require('express');
var path = require('path');
var router = express.Router();

router.use(express.static(__dirname + '/../assets'));
router.use(express.static(__dirname + '/../templates'));

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../layouts', 'app.html'));
});

module.exports = router;
