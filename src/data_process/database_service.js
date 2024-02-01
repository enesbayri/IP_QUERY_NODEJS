const model= require("../models");
const bcrypt=require("./bcrypt_service");

const add_user=async(name,surname,email,password)=>{
    password=await bcrypt.hash_password(password);
    const user=model.user.build({name:name,surname:surname,email:email,password:password});
    user.save().then((rows)=>{console.log("User added!")}).catch(()=>{console.log("Failed to add user!")});
}

const findOne=async(findType,find)=>{
    let user=null;
    if(findType=="id"){
        user=await model.user.findOne({where:{id:find}});
    }else if(findType=="name"){
        user=await model.user.findOne({where:{name:find}});
    }else if(findType=="surname"){
        user=await model.user.findOne({where:{surname:find}});
    }else if(findType=="email"){
        user=await model.user.findOne({where:{email:find}});
    }else{
        user=await model.user.findOne({where:{password:find}});
    }
    return user;
}

const login_user=async(email,password)=>{
    let row=await findOne("email",email);
    if(row==null){
        return null;
    }else{
        let compare=await bcrypt.compare_password(password,row.dataValues.password);
        if(compare){
            return row.dataValues;
        }else{
            return null;
        }
    }
}

module.exports={
    findOne,
    add_user,
    login_user
}