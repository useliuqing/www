var express = require('express');
var StockInfo = require('../models/stockInfos');
var ViewableInfo = require('../models/viewable');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

router.get('/',checkLogin,function(req,res,next){
    var user = req.session.user;

    Promise.all([
        ViewableInfo.getViewableInfo(user.name,0),//pageID = 0代表商品库存页面
        StockInfo.getStockInfo(user.name)
    ]).then(function(results){
        res.render('stock',{
            viewableInfos : results[0],
            stocks : results[1]
        });
    }).catch(next);

});

module.exports = router;
