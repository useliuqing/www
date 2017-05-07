var Kind = require('../lib/mongo').Kind;

module.exports = {
    create : function(kinds){
        return Kind.create(kinds).exec();
    },
    getKinds : function(userName){
        return Kind.find({userName : userName}).exec();
    },
    getMaxID : function(userName){
        return Kind.find({userName : userName}).sort({kindID : -1}).limit(1).select({kindID : 1}).exec();
    }
};