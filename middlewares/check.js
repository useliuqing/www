module.exports = {
    checkLogin: function checkLogin(req,res,next){
        // if(!req.session.user){
        //     req.flash('error','まだ登録していない');
        //     return res.redirect('/signin');
        // }
        next();
    },
    checkNotLogin: function checkNotLogin(req,res,next){
        // if(req.session.user){
        //     req.flash('error','もう登録済み');
        //     return res.redirect('back');
        // }
        next();
    }
};