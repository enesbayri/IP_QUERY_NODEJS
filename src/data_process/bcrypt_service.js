const bcrypt=require("bcrypt");
const dotenv=require("dotenv").config();

const salt_round=parseInt(process.env.BCRYPT_SALT_ROUNDS);


const hash_password=async(password)=>{
    const hash=await bcrypt.hashSync(password,salt_round);
    return hash;
}

const compare_password=async(password,hash)=>{
    const compare=await bcrypt.compareSync(password,hash);
    return compare;
}


module.exports={
    hash_password,
    compare_password,
}