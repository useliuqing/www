module.exports = {
    checkLogin: function checkLogin(req,res,next){
        // if(!req.session.user){
        //     req.flash('error','�܂��o�^���Ă��Ȃ�');
        //     return res.redirect('/signin');
        // }
        next();
    },
    checkNotLogin: function checkNotLogin(req,res,next){
        // if(req.session.user){
        //     req.flash('error','�����o�^�ς�');
        //     return res.redirect('back');
        // }
        next();
    }
};