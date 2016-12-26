var fs = require('fs');
var path = express = require('express');
var router = express.Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;
router.get('/',checkNotLogin,function(req,res,next){
    res.render('signup');
});

module.exports = router;