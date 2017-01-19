var router = require('express').Router();
var SupplierModel = require('../models/supplierModel');
var checkLogin = require('../middlewares/check').checkLogin;
//商品种类编辑页面
router.get('/',checkLogin,function(req,res,next){
    Promise.all([
        SupplierModel.getKinds()
    ]).then(function(results){
        res.render('',{
            kinds : results[0]
        })
    })
})


module.exports = router;