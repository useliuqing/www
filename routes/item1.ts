import ItemInfo = DataInfo.ItemInfo;
import express = require('express');
import path = require("path");
import moment = require('moment');
import check = require('../middlewares/check');
import KindModel = require('../models/kindModel');
import Supplier = require('../models/supplierModel');
import { Promise } from "es6-promise";
import { ItemDao, KindDao, SupplierDao } from "../models/DataTool";

let router = express.Router();
let checkLogin = check.checkLogin;

//商品编辑页面
router.get("/", checkLogin, function (req: any, res: express.Response, next: express.NextFunction) {
    Promise.all([
        ItemDao.getItems(req.session.user.name),
        KindDao.getKinds(req.session.user.name),
        SupplierDao.getSuppliers(req.session.user.name)
    ]).then(function (results) {
        let data: { items: Array<Item>, kinds: Array<Kind>, suppliers: Array<Supplier> };
        data.kinds = results[1];
        data.suppliers = results[2];
        res.render('item', {
            items: results[0],
            data: JSON.stringify(data)
        });
    })
})

//新商品注册
router.post('/', checkLogin, function (req: any, res, next) {
    let fields = req.fields;
    let items: Array<Item>;
    ItemDao.getMaxID(req.session.user.name)
        .then(function (maxID: number) {
            for (let i = 0; i < parseInt(fields.number); i++) {
                //数字检测在提交之前做
                let item = new ItemInfo();
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
                } else {
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
                    console.log("error in insert item data")
                    next(e);
                });
        }).catch(function (e) {
            //数据库操作失败
            next(e);
        });
});
