import { Document, Schema, Model, model } from 'mongoose';
import { IItem } from '../interfaces/DataInterface';

interface IItemDocument extends IItem, Document { }

interface IUserModel extends Model<IItemDocument> {
    getItemWithMaxId(): Promise<IItemDocument>;
}


//商品属性相关////////////////////////////////////////////////////////////////////////////////
let ItemSchema = new Schema({
    itemId: Number,
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

ItemSchema.statics.getItemWithMaxId = function (userName: string,callback:Function) : Promise<IItemDocument> {
    return this.find({ userName: userName }).sort({ itemId: -1 }).limit(1).exec(callback);
}

export let ItemModel = <IUserModel>model('items',ItemSchema);

