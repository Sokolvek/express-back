const Router = require("express")
const router = new Router()
const productController = require("../controllers/product.controller")


router.post("/product", productController.createProduct)
router.get("/product", productController.selectProducts)

module.exports = router