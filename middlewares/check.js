module.exports = {
    checkLogin: function checkLogin(req,res,next){
        if(!req.session.user){
            req.flash('error','请登陆');
            return res.redirect('/signin');
        }
        next();
    },
    checkNotLogin: function checkNotLogin(req,res,next){
        if(req.session.user){
            req.flash('error','已经登陆');
            return res.redirect('/stock');
        }
        next();
    }
};