var Item = require('../lib/mongo').Item;

module.exports = {
    create : function(items){
        return Item.create(items).exec();
    },
    getItems : function(userName){
        return Item.find()
    }
}