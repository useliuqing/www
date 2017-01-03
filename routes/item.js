var router = require('express').Router();
var checkLogin = require('../middlewares/check').checkLogin;
var ItemDao = require('../models/ItemDao');
//商品编辑页面
router.get('/',checkLogin,function(req,res,next){
    getAllItemsInfo(req.session.user.name).then(function(results){
        res.render('item',{
            items : results
        });
    })
});


function getAllItemsInfo(userName){
    var p = new Promise(function(resolve,reject){
        var items = ItemDao.getItems(userName);
        resolve(items);
    });
    return p;
}

module.exports = router;