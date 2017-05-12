import { Document, Schema, Model, model } from 'mongoose';
import { IItem } from '../interfaces/DataInterface';

interface IItemDocument extends IItem, Document { }

interface IUserModel extends Model<IItemDocument> {
    findItemWithMaxId(userName: string): Promise<IItemDocument>;
}


//商品属性相关////////////////////////////////////////////////////////////////////////////////
let ItemSchema = new Schema({
    _itemId: Number,
    _name: String,
    _kind: Number,
    _price: Number,
    _supplier: String,
    _procurementPrice: Number,
    _producingArea: String,
    _lastUpdateTime: String,
    _userName: String,
    _picture: String
});

ItemSchema.statics.findItemWithMaxId = function (userName: string): Promise<IItemDocument> {
    return this.find({ userName: userName }).sort({ itemId: -1 }).limit(1).exec();
}

export default <IUserModel>model('items', ItemSchema);
