const auth_control=(req,res,next)=>{
    if(req.session.userName){
        return next();
    }else{
        req.session.loginError="Please Login!"
        res.redirect("/login");
    }
}

module.exports=auth_control;