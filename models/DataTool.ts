import SupplierInfo = DataInfo.SupplierInfo;
import KindInfo = DataInfo.KindInfo;
import ItemInfo = DataInfo.ItemInfo;
import { Item, Kind, Supplier } from '../lib/mongo';
import {UserModel} from '../lib/mongooseDB';

export class UserDao extends UserModel {
    
}






export class ItemDao {
    static create(items: Array<ItemInfo>) {
        return Item.create(items).exec();
    }
    static getItems(userName: string) : Array<ItemInfo>{
        return Item.find({ userName: userName }).exec();
    }
    static getMaxID(userName: string) : number{
        return Item.find({ userName: userName }).sort({ itemID: -1 }).limit(1).select({ itemID: 1 }).exec();
    }
}


export class KindDao {
    static create(kinds: Array<KindInfo>) {
        return Kind.create(kinds).exec();
    }
    static getKinds(userName: string) : Array<KindInfo> {
        return Kind.find({ userName: userName }).exec();
    }
    static getMaxID(userName: string) : number{
        return Kind.find({ userName: userName }).sort({ kindID: -1 }).limit(1).select({ kindID: 1 }).exec();
    }
}

export class SupplierDao {
    static create(suppliers : Array<SupplierInfo>) {
        return Supplier.create(suppliers).exec();
    }
    static getSuppliers(userName : string) : Array<SupplierInfo>{
        return Supplier.find({ userName: userName }).exec();
    }
    static getMaxID(userName : string) : number {
        return Supplier.find({ userName: userName }).sort({ supplierID: -1 }).limit(1).select({ supplierID: 1 }).exec();
    }
}