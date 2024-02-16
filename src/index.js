const express = require("express")
const paths = require("path")
const bcrypt = require("bcrypt")
const collection = require("./config")
const bodyParser = require('body-parser');
const cors = require('cors');
global.loggedIn = false

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({
    exposedHeaders:"*"
}))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })
app.set("view engine", "ejs")


const authRoutes = require("./routes/auth")
const productRoutes = require("./routes/product.routes")

app.use(authRoutes)
app.use(productRoutes)



const port = 5000
app.listen(port,()=>{
    console.log("server started")
})