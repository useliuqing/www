var Item = require('../lib/mongo').Item;

module.exports = {
    create : function(items){
        return Item.create(items).exec();
    },
    getItems : function(userName){
        return Item.find({userName : userName}).exec();
    },
    getMaxID : function(userName){
        return Item.find({userName : userName}).sort({itemID : -1}).limit(1).select({itemID : 1}).exec();
    }
};