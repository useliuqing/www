"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_lite_1 = require("config-lite");
var mongoose_1 = require("mongoose");
//数据库连接
mongoose_1.connect(config_lite_1.config.mongodb, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Connected to MongoDB:" + config_lite_1.config.mongodb);
    }
});
//用户相关
var userSchema = new mongoose_1.Schema({
    name: String,
    password: String,
    avater: String,
    gender: ,
    bio: String,
});
//库存信息项目相关
var stockSchema = new mongoose_1.Schema({
    itemID: Number,
    name: String,
    price: Number,
    balance: Number,
    kind: Number,
    supplier: String,
    procurementPrice: Number,
    procurementTime: Date,
    lastUpdateTime: Date,
    picture: String,
    status: String
});
//显示项目相关
var infoViewablScheme = new mongoose_1.Schema({
    userName: String,
    pageID: Number,
    infoText: String,
    viewable: Boolean
});
//商品属性相关////////////////////////////////////////////////////////////////////////////////
var itemSchema = new mongoose_1.Schema({
    itemID: Number,
    name: String,
    kind: Number,
    price: Number,
    supplier: String,
    procurementPrice: Number,
    producingArea: String,
    lastUpdateTime: String,
    userName: String,
    picture: String
});
//商品种类///////////////////////////////////////////////////////////////////////////////////////
var kindSchema = new mongoose_1.Schema({
    kindID: Number,
    name: String,
    lastUpdateTime: String,
    userName: String,
    remark: String
});
//供应商////////////////////////////////////////////////////////////////////////////////////////////
var supplierSchema = new mongoose_1.Schema({
    supplierID: Number,
    name: String,
    address: String,
    tel: String,
    userName: String,
    remark: String
});
exports.UserModel = mongoose_1.model('users', userSchema);
exports.StockModel = mongoose_1.model('stocks', stockSchema);
exports.InfoViewablModel = mongoose_1.model('infoViewable', infoViewablScheme);
exports.ItemModel = mongoose_1.model('items', itemSchema);
exports.KindModel = mongoose_1.model('kinds', kindSchema);
exports.SupplierModel = mongoose_1.model('suppliers', supplierSchema);
//# sourceMappingURL=mongooseDB.js.map