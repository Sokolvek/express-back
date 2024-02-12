const Router = require("express")
const router = new Router()
const authController = require("../controllers/auth.controller")
// const checkAuth = require("../middleware/checkAuth")

function checkAuth(req,res, next){
    console.log("middleware started")
    let cookies = {}
    try{
        const cookiesArray = req.headers.cookie.split(";")
        cookiesArray.forEach((cookie) => {
            const [key, value] = cookie.trim().split('=');
            cookies[key] = value;
        });
        if(cookies["isLoggedin"]){
            next()
        }else{
            res.render("signup")
        }

    }catch(e){
        res.redirect("login")
        console.log("error caused")
        console.log(e)
    }

}

router.get("/signup",authController.getSignupPage)
router.post("/signup", authController.createUser)
router.get("/logout", authController.logoutUser)
router.get("/login", authController.renderLogin)
router.post("/login", authController.loginUser)
router.get("/home", checkAuth,authController.renderHome)
module.exports = router