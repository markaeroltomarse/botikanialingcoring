const asyncHandler = require("express-async-handler");
const orderService = require("../services/order.service");
const purchaseItem = asyncHandler(async (req, res) => {
  res.status(200).json(await orderService.purchaseItem(req, res));
});

module.exports = { purchaseItem };
