module.exports = {
    checkLogin: function checkLogin(req,res,next){
        // if(!req.session.user){
        //     req.flash('error','Ç‹Çæìoò^ÇµÇƒÇ¢Ç»Ç¢');
        //     return res.redirect('/signin');
        // }
        next();
    },
    checkNotLogin: function checkNotLogin(req,res,next){
        // if(req.session.user){
        //     req.flash('error','Ç‡Ç§ìoò^çœÇ›');
        //     return res.redirect('back');
        // }
        next();
    }
};