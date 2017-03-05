var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest : 'public/img/'});
var sha1 = require('sha1');
var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;
router.get('/', checkNotLogin, function (req, res, next) {
    res.render('signup');
});

//POST /signup 用户注册
router.post('/', checkNotLogin, upload.single('avatar'), function (req, res, next) {
    var name = req.body.name;
    var gender = req.body.gender;
    var bio = req.body.bio;
    var avatar = req.files;
    var password = req.body.password;
    var repassword = req.body.repassword;

    //校验参数
    try {
        if (!(name.length >= 1 && name.length <= 10)) {
            throw new Error('名字请限制在 1-10 个字符');
        }
        if (['m', 'f', 'x'].indexOf(gender) === -1) {
            throw new Error('性别只能是 m、f 或 x');
        }
        if (!(bio.length >= 1 && bio.length <= 30)) {
            throw new Error('个人简介请限制在 1-30 个字符');
        }
        if (!avatar) {
            throw new Error('缺少头像');
        }
        if (password.length < 6) {
            throw new Error('密码至少 6 个字符');
        }
        if (password !== repassword) {
            throw new Error('两次输入密码不一致');
        }
    } catch (e) {
        //注册失败，异步删除上传的头像
        //fs.unlink(req.files.avatar.path);
        avatar && fs.unlink(avatar.path);
        req.flash('error', e.message);
        return res.redirect('/signup');
    }

    //密码加密
    　　password = sha1(password);
    //待写入数据库的信息
    var user = {
        name : name,
        password : password,
        gender : gender,
        bio : bio,
        avatar : avatar.filename
    };

    //待写入数据库的用户信息
    UserModel.create(user)
        .then(function (result) {
            //此ＵＳＥＲ是插入mongodb后的值，包含_ID
            user = result.ops[0];
            //将用户信息存入session
            delete user.password;
            req.session.user = user;
            //写入flash
            req.flash('success', '注册成功');
            //跳转首页
            res.redirect('/posts');
        }).catch(function (e){
            //注册失败，异步删除上传的头像
            // fs.unlink(req.files.avatar.path);
            avatar && fs.unlink(avatar.path);
            //用户名被占用则跳回注册页，而 不是错误页
            if(e.message.match('E1100 duplicate key')){
                req.flash('error','用户名已经被占用');
                return res.redirect('/signup');
            }
            next(e);
        })
});

module.exports = router;