export interface IUser {
    name: string;
    password: string;
    avater: string;
    gender: Gender;
    bio: string;
}

export interface IStockInfo {
    itemId: number;
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

export interface IViewable {
    userName: string;
    pageId: number;
    infoText: string;
    viewable: boolean;
}

export interface IItem {
    itemId: number;
    name: string;
    kind: number;
    price: number;
    supplier: string;
    procurementPrice: number;
    producingArea: string;
    lastUpdateTime: string;
    userName: string;
    picture: string;
}

export interface IKind {
    kindId: number;
    name: string;
    lastUpdateTime: string;
    userName: string;
    remark: string;
}

export interface ISupplier {
    supplierId: number;
    name: string;
    address: string;
    tel: string;
    userName: string;
    remark: string;
}

export enum Gender {
    "m", "f", "x"
}