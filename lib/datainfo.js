"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserInfo = (function () {
    function UserInfo(name, password, avatar, gender, bio) {
        this.name = name;
        this.password = password;
        this.avater = avatar;
        this.gender = gender;
        this.bio = bio;
    }
    return UserInfo;
}());
exports.UserInfo = UserInfo;
var StockInfo = (function () {
    function StockInfo() {
    }
    return StockInfo;
}());
exports.StockInfo = StockInfo;
var ViewableInfo = (function () {
    function ViewableInfo() {
    }
    return ViewableInfo;
}());
exports.ViewableInfo = ViewableInfo;
var ItemInfo = (function () {
    function ItemInfo(itemId, name, kind, price, supplier, procurementPrice, producingArea, lastUpdateTime, userName, picture) {
        this.itemId = itemId;
        this.name = name;
        this.kind = kind;
        this.price = price;
        this.supplier = supplier;
        this.procurementPrice = procurementPrice;
        this.producingArea = producingArea;
        this.lastUpdateTime = lastUpdateTime;
        this.userName = userName;
        this.picture = picture;
    }
    return ItemInfo;
}());
exports.ItemInfo = ItemInfo;
var KindInfo = (function () {
    function KindInfo() {
    }
    return KindInfo;
}());
exports.KindInfo = KindInfo;
var SupplierInfo = (function () {
    function SupplierInfo() {
    }
    return SupplierInfo;
}());
exports.SupplierInfo = SupplierInfo;
var Gender;
(function (Gender) {
    Gender[Gender["m"] = 0] = "m";
    Gender[Gender["f"] = 1] = "f";
    Gender[Gender["x"] = 2] = "x";
})(Gender = exports.Gender || (exports.Gender = {}));
//# sourceMappingURL=datainfo.js.map