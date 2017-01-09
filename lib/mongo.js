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
exports.StockInfo = mongolass.model('stock',{
    itemID : {type : 'number'},
    name : {type : 'string'},
    price : {type : 'number'},
    balance : { type : 'number'},
    kind : {type : 'number'},
    supplier : {type : 'string'},
    procurementPrice : {type : 'number'},
    procurementTime : {type : 'date'},
    lastUpdateTime : {type : 'date'},
    picture : {type : 'string'}
});



//显示项目相关///////////////////////////////////////////////////////////////////////////////
exports.InfoViewable = mongolass.model('InfoViewable',{
    userName : {type : 'string'},
    pageID   : {type : 'number'},
    infoText : {type : 'string'},
    viewable : {type : 'boolean'}
});

//商品属性相关////////////////////////////////////////////////////////////////////////////////
exports.Item = mongolass.model('item',{
    itemID : {type : 'number'},
    name : {type : 'string'},
    kind : {type : 'number'},
    price :  {type : 'number'},
    supplier : {type : 'string'},
    procurementPrice : {type : 'number'},
    producingArea : {type : 'string'},
    lastUpdateTime : {type : 'string'},
    userName : {type : 'string'},
    picture : {type : 'string'}
});
//exports.Item.index({itemID : 1});


//商品种类///////////////////////////////////////////////////////////////////////////////////////
exports.Kind = mongolass.model('kind',{
    kindID : {type : 'number'},
    name   : {type : 'string'},
    lastUpdateTime : {type : 'string'},
    userName : {type : 'string'},
    remark   : {type : 'string'}
});

//供应商////////////////////////////////////////////////////////////////////////////////////////////
exports.Supplier = mongolass.model('supplier',{
    supplierID : {type : 'number'},
    name       : {type : 'string'},
    address    : {type : 'string'},
    tel        : {type : 'string'},
    userName   : {type : 'string'},
    remark     : {type : 'string'}
});





