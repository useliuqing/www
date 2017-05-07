namespace DataInfo {



    export class UserInfo {
        name: string;
        password: string;
        avater: string;
        gender: Gender;
        bio: string;
        constructor(name?: string, password?: string, avatar?: string, gender?: Gender, bio?: string) {
            this.name = name;
            this.password = password;
            this.avater = avatar;
            this.gender = gender;
            this.bio = bio;
        }
    }

    
    

    export class StockInfo {
        itemID: number;
        name: string;
        price: number;
        balance: number;
        kind: number;
        supplier: string;
        procurementPrice: number;
        procurementTime: Date;
        lastUpdateTime: Date;
        picture: string;
    }

    export class ViewableInfo {
        userName: string;
        pageID: number;
        infoText: string;
        viewable: boolean;
    }

    export class ItemInfo {
        _itemID: number;
        _name: string;
        _kind: number;
        _price: number;
        _supplier: string;
        _procurementPrice: number;
        _producingArea: string;
        _lastUpdateTime: string;
        _userName: string;
        _picture: string;
        constructor(itemID?: number, name?: string, kind?: number, price?: number, supplier?: string, procurementPrice?: number,
            producingArea?: string, lastUpdateTime?: string, userName?: string, picture?: string) {
            this._itemID = itemID;
            this._name = name;
            this._kind = kind;
            this._price = price;
            this._supplier = supplier;
            this._procurementPrice = procurementPrice;
            this._producingArea = producingArea;
            this._lastUpdateTime = lastUpdateTime;
            this._userName = userName;
            this._picture = picture;
        }
        get itemID(){
            return this.itemID;
        }
        get name(){
            return this._name;
        }
        get kind(){
            return this._kind;
        }
        get price(){
            return this._price;
        }
        get supplier(){
            return this._supplier;
        }
        get procurementPrice(){
            return this.procurementPrice;
        }
        get producingArea(){
            return this._producingArea;
        }
        get lastUpdateTime(){
            return this._lastUpdateTime;
        }
        get userName(){
            return this._userName;
        }
        get picture(){
            return this._picture;
        }
        set itemID(itemID : number){
            this._itemID = itemID;
        }
        set name(name : string){
            this._name = name;
        }
        set kind(kind : number){
            this._kind = kind;
        }
        set price(price : number){
            this._price = price;
        }
        set supplier(supplier : string){
            this._supplier = supplier;
        }
        set procurementPrice(procurementPrice : number){
            this._procurementPrice = procurementPrice;
        }
        set producingArea(producingArea : string){
            this._producingArea = producingArea;
        }
        set lastUpdateTime(lastUpdateTime : string){
            this._lastUpdateTime = lastUpdateTime;
        }
        set userName(userName : string){
            this._userName = userName;
        }
        set picture(picture : string){
            this._picture = picture;
        }
    }

    export class KindInfo {
        kindID: number;
        name: string;
        lastUpdateTime: string;
        userName: string;
        remark: string;
    }

    export class SupplierInfo {
        supplierID: number;
        name: string;
        address: string;
        tel: string;
        userName: string;
        remark: string;
    }

    export enum Gender {
        "m", "f", "x"
    }
}
