var config = require('config-lite');
var Mongolass = require('mongolass');
var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');
const Schema = Mongolass.Schema;
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

//根据ID生成创建时间 created_at
mongolass.plugin('addCreatedAt',{
    afterFind : function(results){
        results.forEach(function(item){
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },
    afterFindOne : function(result){
        if(result){
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});



//用户名相关//////////////////////////////////////////////////////////////////////////
exports.User = mongolass.model('User',{
    name: { type: 'string' },
    password: { type: 'string' },
    avatar: { type: 'string' },
    gender: { type: 'string', enum: ['m', 'f', 'x'] },
    bio: { type: 'string' }
});

exports.User.index({name : 1},{unique : true}).exec();//根据用户名找到用户，用户全局唯一


//商品信息项目相关//////////////////////////////////////////////////////////////////////////
exports.StockInfo = mongolass.model('stock',stockSchema);
var stockSchema = new Schema({
    itemID : {type : 'number'},
    name : {type : 'string'},
    price : {type : 'number'},
    balance : { type : 'number'},
    kind : {type : 'number'},
    supplier : {type : 'string'},
    procurementPrice : {type : 'number'},
    procurementTime : {type : 'date'},
    lastUpdateTime : {type : 'date'},
    picture : [String]
});



//显示项目相关///////////////////////////////////////////////////////////////////////////////
exports.InfoViewable = mongolass.model('InfoViewable',infoViewSchema);
var infoViewSchema = new Schema({
    userName : String,
    pageID   : Number,
    infoText : String,
    viewable : Boolean
});

//商品属性相关////////////////////////////////////////////////////////////////////////////////
exports.Item = mongolass.model('item',itemSchema);
var itemSchema = new Schema({
    itemID : Number,
    name : {type : 'string'},
    kind : {type : 'number'},
    price : {type : 'number'},
    supplier : {type : 'string'},
    procurementPrice : {type : 'number'},
    producingArea : String,
    lastUpdateTime : {type : 'date'},
    userName : String,
    picture : [String]
});


//商品种类///////////////////////////////////////////////////////////////////////////////////////
exports.Kind = mongolass.model('kind',kindSchema);
var kindSchema = new Schema({
    kingID : Number,
    text   : String,
    userName : String
});





