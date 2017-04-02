var express = require('express');
var router = express.Router();
var ItemModel = require("../models/itemModel");
var KindModel = require("../models/kindModel");

var checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/', function (req, res, next) {
  if(!req.session.user){
    req.flash("info","未操作时间过长，请重新登陆");
    return res.render("error",{title : "NO FOUND"});
  }
  Promise.all([
    ItemModel.getItems(req.session.user.name),
    KindModel.getKinds(req.session.user.name)
  ]).then(function (results) {
    res.render('purchase', {
      items : results[0],
      kinds : results[1]
    });
  })

});

module.exports = router;