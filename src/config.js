const mongoose = require("mongoose")
let dburl = "mongodb+srv://sokolvek20067:wD4WjXleiWez1nST@sseu-shop.qbfykic.mongodb.net/?retryWrites=true&w=majority"
const connect = mongoose.connect("mongodb+srv://sokolvek20067:wD4WjXleiWez1nST@sseu-shop.qbfykic.mongodb.net/?retryWrites=true&w=majority")
//sokolvek20067
//wD4WjXleiWez1nST
connect.then(() =>{
    console.log("connected db")
})
.catch(() => {
    console.log("error to connect db")
})

const LoginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        required:true
    }
})

const collection = new mongoose.model("users", LoginSchema)

module.exports = collection