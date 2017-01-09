var Supplier = require('../lib/mongo').Supplier;

module.exports = {
    create : function(suppliers){
        return Supplier.create(suppliers).exec();
    },
    getSuppliers : function(userName){
        return Supplier.find({userName : userName}).exec();
    },
    getMaxID : function(userName){
        return Supplier.find({userName : userName}).sort({supplierID : -1}).limit(1).select({supplierID : 1}).exec();
    }
};