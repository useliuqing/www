var DataInfo;
(function (DataInfo) {
    var UserInfo = (function () {
        function UserInfo(name, password, avatar, gender, bio) {
            this.name = name;
            this.password = password;
            this.avater = avatar;
            this.gender = gender;
            this.bio = bio;
        }
        return UserInfo;
    }());
    DataInfo.UserInfo = UserInfo;
    var StockInfo = (function () {
        function StockInfo() {
        }
        return StockInfo;
    }());
    DataInfo.StockInfo = StockInfo;
    var ViewableInfo = (function () {
        function ViewableInfo() {
        }
        return ViewableInfo;
    }());
    DataInfo.ViewableInfo = ViewableInfo;
    var ItemInfo = (function () {
        function ItemInfo(itemID, name, kind, price, supplier, procurementPrice, producingArea, lastUpdateTime, userName, picture) {
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
        Object.defineProperty(ItemInfo.prototype, "itemID", {
            get: function () {
                return this.itemID;
            },
            set: function (itemID) {
                this._itemID = itemID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemInfo.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (name) {
                this._name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemInfo.prototype, "kind", {
            get: function () {
                return this._kind;
            },
            set: function (kind) {
                this._kind = kind;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemInfo.prototype, "price", {
            get: function () {
                return this._price;
            },
            set: function (price) {
                this._price = price;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemInfo.prototype, "supplier", {
            get: function () {
                return this._supplier;
            },
            set: function (supplier) {
                this._supplier = supplier;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemInfo.prototype, "procurementPrice", {
            get: function () {
                return this.procurementPrice;
            },
            set: function (procurementPrice) {
                this._procurementPrice = procurementPrice;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemInfo.prototype, "producingArea", {
            get: function () {
                return this._producingArea;
            },
            set: function (producingArea) {
                this._producingArea = producingArea;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemInfo.prototype, "lastUpdateTime", {
            get: function () {
                return this._lastUpdateTime;
            },
            set: function (lastUpdateTime) {
                this._lastUpdateTime = lastUpdateTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemInfo.prototype, "userName", {
            get: function () {
                return this._userName;
            },
            set: function (userName) {
                this._userName = userName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemInfo.prototype, "picture", {
            get: function () {
                return this._picture;
            },
            set: function (picture) {
                this._picture = picture;
            },
            enumerable: true,
            configurable: true
        });
        return ItemInfo;
    }());
    DataInfo.ItemInfo = ItemInfo;
    var KindInfo = (function () {
        function KindInfo() {
        }
        return KindInfo;
    }());
    DataInfo.KindInfo = KindInfo;
    var SupplierInfo = (function () {
        function SupplierInfo() {
        }
        return SupplierInfo;
    }());
    DataInfo.SupplierInfo = SupplierInfo;
    var Gender;
    (function (Gender) {
        Gender[Gender["m"] = 0] = "m";
        Gender[Gender["f"] = 1] = "f";
        Gender[Gender["x"] = 2] = "x";
    })(Gender = DataInfo.Gender || (DataInfo.Gender = {}));
})(DataInfo || (DataInfo = {}));
//# sourceMappingURL=datainfo.js.map