
//express import
const express= require("express");
const app=express();

//router import
const mainRouter=require("./src/routers/mainRouter");

const errorMiddleware=require("./src/middlewares/error_middleware");


//env config
const dotenv=require("dotenv").config();

//ejs import
const ejs=require("ejs");
const expressLayout=require("express-ejs-layouts");
const path=require("path");


//ejs config
app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,"./src/views"));


//public directory
app.use(express.static("public"));

// session config
const session=require("express-session");
app.use(session({
    secret:process.env.SESSION_SECRET_KEY,
    saveUninitialized:true,
    resave:false,
    cookie:{}
}));

//post config
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use(expressLayout);
app.use("/",mainRouter);
app.use(errorMiddleware);




app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT+" portta server aktif");
});