import { Document, Schema, Model, model } from 'mongoose';
import { ISupplier } from '../interfaces/DataInterface';

interface ISupplierDocument extends ISupplier, Document { }
interface ISupplierModel extends Model<ISupplierDocument> { }

let supplierSchema = new Schema({
    _supplierID: Number,
    _name: String,
    _address: String,
    _tel: String,
    _userName: String,
    _remark: String
});

export default <ISupplierModel>model("suppliers",supplierSchema);