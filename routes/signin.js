var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');
var sha1 = require('sha1');

var checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/',checkNotLogin,function(req,res,next){
    res.render('signin');
});

//用户退出登陆
router.get('/signout',function(req,res,next){
    req.session.user = null;
    res.render('signin');
})

router.post('/',checkNotLogin,function(req,res,next){
    var name = req.body.name;
    var password = req.body.password;

    UserModel.getUserByName(name)
             .then(function(user){
                 if(!user){
                     req.flash('error','用户不存在');
                     return res.redirect('back');
                 }
                 //检查��?��?
                 if(sha1(password) !== user.password){
                     req.flash('error','用户名�?���?��?��?错误');
                     return res.redirect('back');
                 }
                 //登录�?�功
                 req.flash('success','登录�?�功');
                 //用户信息写�?�session
                 delete user.password;
                 req.session.user = user;
                 res.redirect('/stock');
             }).catch(next);
});


module.exports = router;