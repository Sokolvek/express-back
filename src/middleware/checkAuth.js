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
            console.log("Dwa")
            // res.json("logged")
            next()
        }else{
            res.render("signup")
        }

    }catch(e){
        console.log("error caused")
        // console.log(e)
    }

}

module.exports = checkAuth()