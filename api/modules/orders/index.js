const router = require("express").Router();
const orderController = require("./controllers");

router.post("/purchaseItem", orderController.purchaseItem);

module.exports = router;
