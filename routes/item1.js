"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var moment = require("moment");
var check = require("../middlewares/check");
var es6_promise_1 = require("es6-promise");
var ItemModel1_1 = require("../models/ItemModel1");
var KindModel1_1 = require("../models/KindModel1");
var SupplierModel1_1 = require("../models/SupplierModel1");
var datainfo_1 = require("../lib/datainfo");
var logger_1 = require("../lib/logger");
var router = express.Router();
var checkLogin = check.checkLogin;
//商品编辑页面
router.get("/", checkLogin, function (req, res, next) {
    es6_promise_1.Promise.all([
        ItemModel1_1.default.find({ name: req.session.user.name }),
        KindModel1_1.default.find({ name: req.session.user.name }),
        SupplierModel1_1.default.find({ name: req.session.user.name })
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
    var fields = req.fields; //新商品的数量
    var items;
    ItemModel1_1.default.findItemWithMaxId(req.session.user.name)
        .then(function (item) { return new paramInCreatingItem(item.itemId, fields.number, req.session.user.name, fields); })
        .then(createNewItems)
        .then(saveItems)
        .then(function () { return res.redirect("/item"); })
        .catch(function (err) {
        logger_1.default.error("注册商品失败");
        res.redirect("/item");
    });
});
/**
 * id : 现在存在的最大id
 */
function createNewItems(params) {
    var items = [];
    var maxId = params.maxId;
    var products = params.products;
    for (var i = 0; i < params.quantity; i++) {
        maxId++;
        var item = new datainfo_1.ItemInfo();
        item.itemId = maxId;
        item.name = products["productName" + i];
        item.price = parseFloat(products['price' + i]);
        item.kind = parseInt(products['kind' + i]);
        item.supplier = products['supplier' + i];
        item.procurementPrice = parseFloat(products['procurementPrice' + i]);
        item.producingArea = products['producingArea' + i];
        item.lastUpdateTime = moment().format("YYYY-MM-DD HH:MM:ss");
        if (products.files['picture' + i] == null) {
            item.picture = '';
        }
        else {
            item.picture = products['picture' + i].path.split(path.sep).pop();
        }
        item.userName = params.userName;
        items.push(item);
    }
    return items;
}
function saveItems(items) {
    return ItemModel1_1.default.create(items);
}
/**
 * 创建新商品的时候需要的参数,
 * @param maxId : 现存的最大Id
 * @param quantity : 需要创建的商品数量
 */
var paramInCreatingItem = (function () {
    function paramInCreatingItem(maxId, quantity, userName, products) {
        this.maxId = (maxId == null) ? 0 : maxId;
        this.quantity = quantity;
        this.userName = userName;
        this.products = products;
    }
    return paramInCreatingItem;
}());
//# sourceMappingURL=item1.js.map