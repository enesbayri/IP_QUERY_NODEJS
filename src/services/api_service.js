const dotenv=require("dotenv").config();
const axios=require("axios");

const base_url="http://api.ipstack.com/";
const api_key=process.env.API_KEY;

const ApiRequest=async(ip_adress) =>{
    let api_link=base_url+ip_adress+"?access_key="+api_key;
    const result=await axios.get(api_link);
    return result.data;
}


module.exports=ApiRequest;