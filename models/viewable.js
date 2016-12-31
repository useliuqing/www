var InfoViewable = require('../lib/mongo').InfoViewable;

module.exports = {
    getViewableInfo : function getViewableInfo(userName,pageID){
        return InfoViewable.find({userName : userName,pageID : pageID,viewable : true});
    }
}