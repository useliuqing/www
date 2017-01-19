var express = require('express');
var StockInfo = require('../models/stockInfos');
var ViewableInfo = require('../models/viewable');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;
const pageID = 0;
router.get('/',checkLogin,function(req,res,next){
    var user = req.session.user;
    var load = req.query.load;
    Promise.all([
        ViewableInfo.getViewableInfo(user.name,pageID),
        StockInfo.getStockInfo(user.name)
    ]).then(function(results){
        res.render('stock',{
            viewableInfos : results[0],
            stocks : results[1]
        });
    }).catch(next);

});

module.exports = router;
