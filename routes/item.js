var router = require('express').Router();
var path = require('path');
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

//新商品注册
router.post('/',function(req,res,next){
    var fields  = req.fields;
    var items = [];
    for(var i = 0; i < fields.number;i++){
        var item = {};
        item.productName = fields.productName[i];
        item.price = fields.price[i];
        item.kind = fields.kind[i];
        item.supplier = fields.supplier[i];
        item.procurementPrice = fields.procurementPrice[i];
        item.producingArea = fields.producingArea[i];
        item.picture = files.picture[i].path.split(path.sep).pop();
        items.push(item);
    }

    ItemDao.create(items)
           .then(function(results){
               res.redirect('/item');
           }).catch(function(e){
               next(e);
           })

});

function getAllItemsInfo(userName){
    return new Promise(function(resolve,reject){
        var items = ItemDao.getItems(userName);
        resolve(items);
    });
}

module.exports = router;