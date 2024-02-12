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

// app.get("/home", checkAuth, async(req, res) =>{
//     // const users = await collection.find()
//     // console.log(users)
//     res.render("home")
// })

// app.get("/user-page/:username", checkAuth, async(req,res) => {
//     const username = req.params.username;

//     const user = await collection.findOne({name:"1234"})
//     console.log(user)
//     if(!user){
//         return res.json("user does not exists")
//     }

//     res.render("user-page", {user:user})

// })


const routes = require("./routes/auth")

app.use(routes)



const port = 5000
app.listen(port,()=>{
    console.log("server started")
})