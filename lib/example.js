"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
exports.Schema = mongoose.Schema;
exports.ObjectId = mongoose.Schema.Types.ObjectId;
exports.Mixed = mongoose.Schema.Types.Mixed;
var schema = new exports.Schema({
    name: {
        type: String,
        required: true
    },
    power: {
        type: String,
        required: true
    },
    amountPeopleSaved: {
        type: Number,
        required: false
    },
    createdAt: {
        type: Date,
        required: false
    },
    modifiedAt: {
        type: Date,
        required: false
    }
}).pre('save', function (next) {
    if (this._doc) {
        var doc = this._doc;
        var now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});
exports.HeroSchema = mongoose.model('hero', schema, 'heroes', true);
var HeroModel = (function () {
    function HeroModel(heroModel) {
        this._heroModel = heroModel;
    }
    Object.defineProperty(HeroModel.prototype, "name", {
        get: function () {
            return this._heroModel.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeroModel.prototype, "power", {
        get: function () {
            return this._heroModel.power;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeroModel.prototype, "amountPeopleSaved", {
        get: function () {
            return this._heroModel.amountPeopleSaved;
        },
        enumerable: true,
        configurable: true
    });
    HeroModel.createHero = function (name, power) {
        var p = new Promise(function (resolve, reject) {
            var repo = new HeroRepository();
            var hero = {
                name: name,
                power: power,
                amountPeopleSaved: 0
            };
            repo.create(hero, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
        return p;
    };
    HeroModel.findHero = function (name) {
        var p = new Promise(function (resolve, reject) {
            var repo = new HeroRepository();
            repo.find({ name: name }).sort({ createdAt: -1 }).limit(1).exec(function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    if (res.length) {
                        resolve(res[0]);
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
        return p;
    };
    return HeroModel;
}());
exports.HeroModel = HeroModel;
Object.seal(HeroModel);
var RepositoryBase = (function () {
    function RepositoryBase(schemaModel) {
        this._model = schemaModel;
    }
    RepositoryBase.prototype.create = function (item, callback) {
        this._model.create(item, callback);
    };
    RepositoryBase.prototype.retrieve = function (callback) {
        this._model.find({}, callback);
    };
    RepositoryBase.prototype.update = function (_id, item, callback) {
        this._model.update({ _id: _id }, item, callback);
    };
    RepositoryBase.prototype.delete = function (_id, callback) {
        this._model.remove({ _id: this.toObjectId(_id) }, function (err) { return callback(err, null); });
    };
    RepositoryBase.prototype.findById = function (_id, callback) {
        this._model.findById(_id, callback);
    };
    RepositoryBase.prototype.findOne = function (cond, callback) {
        return this._model.findOne(cond, callback);
    };
    RepositoryBase.prototype.find = function (cond, fields, options, callback) {
        return this._model.find(cond, options, callback);
    };
    RepositoryBase.prototype.toObjectId = function (_id) {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    };
    return RepositoryBase;
}());
exports.RepositoryBase = RepositoryBase;
var HeroRepository = (function (_super) {
    __extends(HeroRepository, _super);
    function HeroRepository() {
        return _super.call(this, exports.HeroSchema) || this;
    }
    return HeroRepository;
}(RepositoryBase));
exports.HeroRepository = HeroRepository;
Object.seal(HeroRepository);
var uri = 'mongodb://localhost/heroes';
mongoose.connect(uri, function (err) {
    if (err) {
        console.log(err.message);
        console.log(err);
    }
    else {
        console.log('Connected to MongoDb');
    }
});
HeroModel.createHero('Steve', 'Flying').then(function (res) {
    console.log('### Created Hero ###');
    console.log(res);
    HeroModel.findHero('Steve').then(function (res) {
        console.log('### Found Hero ###');
        console.log(res);
        // now update the Hero
        var hero = res;
        hero.power = 'Invisibility';
        hero.save(function (err, res) {
            if (err) {
                console.log(err.message);
                console.log(err);
            }
            else {
                console.log(res);
            }
        });
    }, function (err) {
        if (err) {
            console.log(err.message);
        }
    });
}, function (err) {
    if (err) {
        console.log(err.message);
        console.log(err);
    }
});
//# sourceMappingURL=example.js.map