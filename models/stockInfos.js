var StockInfo = require('../lib/mongo').StockInfo;

module.exports = {
  // 注册一个用户
  create: function create(stockInfo) {
    return StockInfo.create(stockInfo).exec();
  },
  getStockInfo: function getStockInfo(userName){
      return StockInfo.find({name: userName});
  }
};