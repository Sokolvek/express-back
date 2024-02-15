const collection = require("../config")

class Product{
    async createProduct(req,res){
        const data = {
            name: req.body.name,
            description: req.body.description,
            price:req.body.price
        }
        const product = await collection.productCollection.insertMany(data)
    
        res.json(product)


    }

    async selectProducts(req,res){
        console.log("select started")
        const products = await collection.productCollection.find()
        console.log(products)
        res.json(products)
    }

    async selectOneProduct(req,res){

    }

    async updateProduct(req,res){

    }

    async deleteProduct(req,res){

    }
}

module.exports = new Product()