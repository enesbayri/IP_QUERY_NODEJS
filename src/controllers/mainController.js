
const api_request=require("../services/api_service");
const validator=require("../data_process/data_validator");
const database=require("../data_process/database_service");


const home_page=(req,res,next)=>{
    const user=req.session.userName;
    res.render("home_page",{"user":user});
}

const query_page=async (req,res,next)=>{
    let ip_adress=req.body.IPadress;
    const user=req.session.userName;
    try {
        const ip_data=await api_request(ip_adress);
        if(ip_data.country_name==null){
            throw TypeError;
        }
        res.render("query_page",{"data":ip_data,"error":false,"user":user});

    } catch (error) {
        res.render("query_page",{"error":true,"user":user});
    }
    
    
    
}

const login_page=(req,res,next)=>{
    let err=null;
    let registerAcces=null;
    if(req.session.loginError!=null){
        err=req.session.loginError;
        req.session.loginError=null;
    }
    if(req.session.registerAccess){
        registerAcces=req.session.registerAccess;
        req.session.registerAccess=null;
    }
    res.render("login_page",{layout:"./layout/login_layout.ejs","error":err,"registerAcces":registerAcces})
}


const register_page=(req,res,next)=>{
    let err=null;
    if(req.session.registerError!=null){
        err=req.session.registerError;
        req.session.registerError=null;
    }
    res.render("register_page",{layout:"./layout/login_layout.ejs","error":err})
}


const register=async (req,res,next)=>{
    const empty_validator=validator.empty_input_validator(req,req.body.name,req.body.surname,req.body.email,req.body.password);
    if(empty_validator){  
        res.redirect("/register");
    }else{
        const email_validate=await validator.email_validator(req,req.body.email);
        if(email_validate){
            res.redirect("/register");
        }else{
            await database.add_user(req.body.name,req.body.surname,req.body.email,req.body.password);
            req.session.registerAccess="You registered! Please Login!";
            res.redirect("/login")
        }
    }
    
}

const login=async (req,res,next)=>{
    const empty_validator=validator.empty_login_input_validator(req,req.body.email,req.body.password);
    if(empty_validator){
        res.redirect("/login");
    }else{
        const user=await database.login_user(req.body.email,req.body.password);
        if(user==null){
            req.session.loginError="Email or Password is wrong!"
            res.redirect("/login");
        }else{
            req.session.userName=user.name;
            res.redirect("/");
        }
    }
}

const logout=(req,res,next)=>{
    req.session.userName=null;
    res.redirect("/login");
}

module.exports={
    home_page,
    query_page,
    register_page,
    login_page,
    register,
    login,
    logout,
}