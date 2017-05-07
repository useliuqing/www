"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ItemInfo = DataInfo.ItemInfo;
var express = require("express");
var path = require("path");
var moment = require("moment");
var check = require("../middlewares/check");
var es6_promise_1 = require("es6-promise");
var DataTool_1 = require("../models/DataTool");
var router = express.Router();
var checkLogin = check.checkLogin;
//商品编辑页面
router.get("/", checkLogin, function (req, res, next) {
    es6_promise_1.Promise.all([
        DataTool_1.ItemDao.getItems(req.session.user.name),
        DataTool_1.KindDao.getKinds(req.session.user.name),
        DataTool_1.SupplierDao.getSuppliers(req.session.user.name)
    ]).then(function (results) {
        var data;
        data.kinds = results[1];
        data.suppliers = results[2];
        res.render('item', {
            items: results[0],
            data: JSON.stringify(data)
        });
    });
});
//新商品注册
router.post('/', checkLogin, function (req, res, next) {
    var fields = req.fields;
    var items;
    DataTool_1.ItemDao.getMaxID(req.session.user.name)
        .then(function (maxID) {
        for (var i = 0; i < parseInt(fields.number); i++) {
            //数字检测在提交之前做
            var item = new ItemInfo();
            maxID = (maxID == null) ? 0 : (++maxID);
            item.itemID = maxID;
            item.name = fields['productName' + i];
            item.price = parseFloat(fields['price' + i]);
            item.kind = parseInt(fields['kind' + i]);
            item.supplier = fields['supplier' + i];
            item.procurementPrice = parseFloat(fields['procurementPrice' + i]);
            item.producingArea = fields['producingArea' + i];
            item.lastUpdateTime = moment().format("YYYY-MM-DD HH:MM:ss");
            item.userName = req.session.user.name;
            if (req.files['picture' + i] == null) {
                item.picture = '';
            }
            else {
                item.picture = req.files['picture' + i].path.split(path.sep).pop();
            }
            items.push(item);
        }
        //插入数据
        ItemModel.create(items)
            .then(function (results) {
            res.redirect('/item');
        }).catch(function (e) {
            //数据库操作失败
            console.log("error in insert item data");
            next(e);
        });
    }).catch(function (e) {
        //数据库操作失败
        next(e);
    });
});
//# sourceMappingURL=item1.js.map