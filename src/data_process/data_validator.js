const database=require("./database_service");

const empty_input_validator=(req,name,surname,email,password)=>{
    if(name.length==0){
        req.session.registerError="Name can't be empty!";
        return true;
    }else if(surname.length==0){
        req.session.registerError="Surname can't be empty!";
        return true;
    }else if(email.length==0){
        req.session.registerError="Email can't be empty!";
        return true;
    }else if(password.length==0){
        req.session.registerError="Password can't be empty!";
        return true;
    }
    return false;
}
const empty_login_input_validator=(req,email,password)=>{
    if(email.length==0){
        req.session.loginError="Email can't be empty!";
        return true;
    }else if(password.length==0){
        req.session.loginError="Password can't be empty!";
        return true;
    }
    return false;
}
const email_validator=async (req,email)=>{
    const findTpye="email";
    const row= await database.findOne(findTpye,email);
    console.log(row);
    if(row!=null){
        req.session.registerError="Email is already used!";
        return true;
    }
    return false;
}

module.exports={
    empty_input_validator,
    email_validator,
    empty_login_input_validator
}