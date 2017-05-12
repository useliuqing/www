"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var supplierSchema = new mongoose_1.Schema({
    _supplierID: Number,
    _name: String,
    _address: String,
    _tel: String,
    _userName: String,
    _remark: String
});
exports.default = mongoose_1.model("suppliers", supplierSchema);
//# sourceMappingURL=SupplierModel1.js.map