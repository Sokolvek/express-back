const express = require("express")
const paths = require("path")
const bcrypt = require("bcrypt")
const collection = require("./config")
const bodyParser = require('body-parser');

global.loggedIn = false

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.set("view engine", "ejs")

// app.get("/", checkAuth, async(req,res) =>{
//     const users = await collection.find()
//     console.log(users)
//     console.log("next?")
//     res.redirect("home", {users:users})
// })

app.get("/home", checkAuth, async(req, res) =>{
    // const users = await collection.find()
    // console.log(users)
    res.render("home")
})

app.get("/user-page/:username", checkAuth, async(req,res) => {
    const username = req.params.username;

    const user = await collection.findOne({name:"1234"})
    console.log(user)
    if(!user){
        return res.json("user does not exists")
    }

    res.render("user-page", {user:user})

})

app.get("/login", async (req,res) =>{
    
    res.render("login")
    
})

app.post("/login", async (req,res) =>{
    const {username, password} = req.body
    const data ={
        name:username,
        password:password
    }
    console.log(data)
    const userExists = await collection.findOne({name:data.name, password:password})
    const users = await collection.find()
    if(!userExists){
        return res.json("invalid login or password")
    }
    res.setHeader('Set-Cookie', 'isLoggedin=true');
    loggedIn = true
    res.render("home", {users:users})
})

app.get("/signup", async (req, res) =>{
    res.render("signup")
})

app.post("/signup", async (req, res) =>{
    const data = {
        name:req.body.username,
        password:req.body.password
    }
    console.log(data)
    const existingUser = await collection.findOne({name:data.name})
    if(existingUser){
        return res.json("user already exists")
    }
    await collection.insertMany(data)
    res.render("home")
})



app.get("/logout", async(req, res) =>{
    loggedIn = false
    res.clearCookie("isLoggedin")
    res.redirect("/login")
})

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
    // if(cookies["isLoggedin"]){
    //     console.log(cookies)
    // }else{
    //     res.setHeader('Set-Cookie', 'isLoggedin=true');
    // }
}

const port = 5000
app.listen(port,()=>{
    console.log("server started")
})