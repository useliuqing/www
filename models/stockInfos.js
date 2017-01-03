var StockInfo = require('../lib/mongo').StockInfo;

module.exports = {
  create: function create(stockInfo) {
    return StockInfo.create(stockInfo).exec();
  },
  getStockInfo: function getStockInfo(userName){
      return StockInfo.find({name: userName}).exec();
  }
};