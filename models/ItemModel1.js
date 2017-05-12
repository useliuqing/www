"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
//商品属性相关////////////////////////////////////////////////////////////////////////////////
var ItemSchema = new mongoose_1.Schema({
    _itemId: Number,
    _name: String,
    _kind: Number,
    _price: Number,
    _supplier: String,
    _procurementPrice: Number,
    _producingArea: String,
    _lastUpdateTime: String,
    _userName: String,
    _picture: String
});
ItemSchema.statics.findItemWithMaxId = function (userName) {
    return this.find({ userName: userName }).sort({ itemId: -1 }).limit(1).exec();
};
exports.default = mongoose_1.model('items', ItemSchema);
//# sourceMappingURL=ItemModel1.js.map