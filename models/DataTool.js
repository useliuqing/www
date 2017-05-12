"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mongo_1 = require("../lib/mongo");
var mongooseDB_1 = require("../lib/mongooseDB");
var UserDao = (function (_super) {
    __extends(UserDao, _super);
    function UserDao() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserDao;
}(mongooseDB_1.UserModel));
exports.UserDao = UserDao;
var ItemDao = (function () {
    function ItemDao() {
    }
    ItemDao.create = function (items) {
        return mongo_1.Item.create(items).exec();
    };
    ItemDao.getItems = function (userName) {
        return mongo_1.Item.find({ userName: userName }).exec();
    };
    ItemDao.getMaxID = function (userName) {
        return mongo_1.Item.find({ userName: userName }).sort({ itemID: -1 }).limit(1).select({ itemID: 1 }).exec();
    };
    return ItemDao;
}());
exports.ItemDao = ItemDao;
var KindDao = (function () {
    function KindDao() {
    }
    KindDao.create = function (kinds) {
        return mongo_1.Kind.create(kinds).exec();
    };
    KindDao.getKinds = function (userName) {
        return mongo_1.Kind.find({ userName: userName }).exec();
    };
    KindDao.getMaxID = function (userName) {
        return mongo_1.Kind.find({ userName: userName }).sort({ kindID: -1 }).limit(1).select({ kindID: 1 }).exec();
    };
    return KindDao;
}());
exports.KindDao = KindDao;
var SupplierDao = (function () {
    function SupplierDao() {
    }
    SupplierDao.create = function (suppliers) {
        return mongo_1.Supplier.create(suppliers).exec();
    };
    SupplierDao.getSuppliers = function (userName) {
        return mongo_1.Supplier.find({ userName: userName }).exec();
    };
    SupplierDao.getMaxID = function (userName) {
        return mongo_1.Supplier.find({ userName: userName }).sort({ supplierID: -1 }).limit(1).select({ supplierID: 1 }).exec();
    };
    return SupplierDao;
}());
exports.SupplierDao = SupplierDao;
//# sourceMappingURL=DataTool.js.map