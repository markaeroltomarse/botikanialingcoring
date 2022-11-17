const router = require("express").Router();
const productController = require("./controllers");
router.get("/best-products", productController.getBestProducts);

router.get("/search", productController.searchProduct);

module.exports = router;
