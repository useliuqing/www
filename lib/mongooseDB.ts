import UserInfo = DataInfo.UserInfo;
import Gender = DataInfo.Gender;
import { config } from 'config-lite';
import { Document, Schema, connect, Model, model } from 'mongoose';
import * as moment from 'moment';
import { IUser, IStockInfo, IItem, IKind, IViewable, ISupplier } from '../interfaces/DataInterface';

//数据库连接
connect(config.mongodb, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to MongoDB:" + config.mongodb);
    }
});

export interface IUserModel extends IUser, Document { }
export interface IStockInfoModel extends IStockInfo, Document { }
export interface IItemModel extends IItem, Document { }
export interface IKindModel extends IKind, Document { }
export interface IViewableModel extends IViewable, Document { }
export interface ISupplierModel extends ISupplier, Document { }

//用户相关
let userSchema = new Schema({
    name: String,
    password: String,
    avater: String,
    gender: Gender,
    bio: String,
});


//库存信息项目相关
let stockSchema = new Schema({
    itemID: Number,
    name: String,
    price: Number,
    balance: Number,
    kind: Number,
    supplier: String,
    procurementPrice: Number,
    procurementTime: Date,
    lastUpdateTime: Date,
    picture: String,
    status: String
});

//显示项目相关
let infoViewablScheme = new Schema({
    userName: String,
    pageID: Number,
    infoText: String,
    viewable: Boolean
});

//商品属性相关////////////////////////////////////////////////////////////////////////////////
let itemSchema = new Schema({
    itemID: Number,
    name: String,
    kind: Number,
    price: Number,
    supplier: String,
    procurementPrice: Number,
    producingArea: String,
    lastUpdateTime: String,
    userName: String,
    picture: String
});

//商品种类///////////////////////////////////////////////////////////////////////////////////////
let kindSchema = new Schema({
    kindID: Number,
    name: String,
    lastUpdateTime: String,
    userName: String,
    remark: String
});

//供应商////////////////////////////////////////////////////////////////////////////////////////////
let supplierSchema = new Schema({
    supplierID: Number,
    name: String,
    address: String,
    tel: String,
    userName: String,
    remark: String
});


export let UserModel : Model<IUserModel> = model<IUserModel>('users', userSchema);
export let StockModel = model('stocks', stockSchema);
export let InfoViewablModel = model('infoViewable', infoViewablScheme);
export let ItemModel : Model<IItemModel>= model<IItemModel>('items', itemSchema);
export let KindModel = model('kinds', kindSchema);
export let SupplierModel = model('suppliers', supplierSchema);




