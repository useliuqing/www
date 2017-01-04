var Item = require('../lib/mongo').Item;

module.exports = {
    create : function(items){
        return Item.create(items).exec();
    },
    getItems : function(userName){
        return Item.find({naem : userName}).exec();
    },
    getMaxItemID : function(userName){
        return Item.find({name : userName}).sort({itemID : -1}).limit(1).select({itemID : 1}).exec();
    }
};