"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
//商品种类相关////////////////////////////////////////////////////////////////////////////////
var kindSchema = new mongoose_1.Schema({
    _kindID: Number,
    _name: String,
    _lastUpdateTime: String,
    _userName: String,
    _remark: String
});
exports.default = mongoose_1.model('items', kindSchema);
//# sourceMappingURL=kindModel1.js.map