import { Document, Schema, Model, model } from 'mongoose';
import { IKind } from '../interfaces/DataInterface';

interface IKindDocument extends IKind, Document { }
interface IKindModel extends Model<IKindDocument> { }

//商品种类相关////////////////////////////////////////////////////////////////////////////////
let kindSchema = new Schema({
    _kindID: Number,
    _name: String,
    _lastUpdateTime: String,
    _userName: String,
    _remark: String
});


export default <IKindModel>model('items', kindSchema);