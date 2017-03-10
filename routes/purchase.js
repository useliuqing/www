var express = require('express');
var router = express.Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/', function(req, res, next) {
  res.render('purchase');
});

module.exports = router;