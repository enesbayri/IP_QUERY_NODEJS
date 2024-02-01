const router=require("express").Router();
const mainController=require("../controllers/mainController");
const authentication=require("../middlewares/auth_middleware");


router.get("/login",mainController.login_page);
router.get("/register",mainController.register_page);
router.get("/",authentication,mainController.home_page);
router.get("/logout",mainController.logout);



router.post("/register",mainController.register)
router.post("/ip-query",authentication,mainController.query_page);
router.post("/login",mainController.login);


module.exports=router;