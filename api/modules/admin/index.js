const router = require("express").Router();
const adminController = require("./controllers");
router.post("/newitem", adminController.newItem);

router.get("/getitems", adminController.getItems);

router.post("/updateqty", adminController.updateQuantity);

router.post("/deleteitem", adminController.deleteItem);

router.get("/sales", adminController.Sales);

router.post("/inventory/newqty", adminController.newQuantity);

router.get("/orders", adminController.getOrders);

router.post("/orders/delivernow", adminController.deliverNow);

module.exports = router;
