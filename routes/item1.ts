import express = require('express');
import path = require("path");
import moment = require('moment');
import check = require('../middlewares/check');
import Supplier = require('../models/supplierModel');
import { Promise } from "es6-promise";
import { IItem, IKind, ISupplier } from '../interfaces/DataInterface';
import ItemModel from "../models/ItemModel1";
import KindModel from "../models/KindModel1";
import SupplierModel from "../models/SupplierModel1";
import { ItemInfo } from "../lib/datainfo";
import Logger from "../lib/logger";
let router = express.Router();
let checkLogin = check.checkLogin;


//商品编辑页面
router.get("/", checkLogin, function (req: any, res: express.Response, next: express.NextFunction) {
    Promise.all([
        ItemModel.find({ name: req.session.user.name }),
        KindModel.find({ name: req.session.user.name }),
        SupplierModel.find({ name: req.session.user.name })
    ]).then(function (results) {
        let data: { items: Array<IItem>, kinds: Array<IKind>, suppliers: Array<ISupplier> };
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
    let fields = req.fields;//新商品的数量
    let items: Array<IItem>;
    ItemModel.findItemWithMaxId(req.session.user.name)
        .then((item) => new paramInCreatingItem(item.itemId, fields.number, req.session.user.name, fields))
        .then(createNewItems)
        .then(saveItems)
        .then(() => res.redirect("/item"))
        .catch((err) => {
            Logger.error("注册商品失败");
            res.redirect("/item");
        });
});

/**
 * id : 现在存在的最大id
 */
function createNewItems(params: paramInCreatingItem): Array<IItem> {
    let items: ItemInfo[] = [];
    let maxId = params.maxId;
    let products = params.products;
    for (let i = 0; i < params.quantity; i++) {
        maxId++;
        let item = new ItemInfo();
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
        } else {
            item.picture = products['picture' + i].path.split(path.sep).pop();
        }
        item.userName = params.userName;
        items.push(item);
    }
    return items;
}

function saveItems(items: Array<IItem>) {
    return ItemModel.create(items)
}

/**
 * 创建新商品的时候需要的参数,
 * @param maxId : 现存的最大Id
 * @param quantity : 需要创建的商品数量
 */
class paramInCreatingItem {
    maxId: number;
    quantity: number;
    userName: string;
    products: any;
    constructor(maxId: number, quantity: number, userName: string, products: any) {
        this.maxId = (maxId == null) ? 0 : maxId;
        this.quantity = quantity;
        this.userName = userName;
        this.products = products;
    }
}