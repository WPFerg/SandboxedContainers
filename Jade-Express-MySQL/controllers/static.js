var express = require('express');
var path = require('path');
var router = express.Router();

router.use(express.static(__dirname + '/../assets'));

module.exports = router;
