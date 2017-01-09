var router = require('express').Router();
var KindModel = require('../models/kindModel');
var checkLogin = require('../middlewares/check').checkLogin;
//商品种类编辑页面
router.get('/',checkLogin,function(req,res,next){
    Promise.all([
        KindModel.getKinds()
    ]).then(function(results){
        res.render('kind',{
            kinds : results[0]
        })
    })
})


module.exports = router;