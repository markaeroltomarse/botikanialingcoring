const asyncHandler = require("express-async-handler");
const productService = require("../services/index");

const getBestProducts = asyncHandler(async (req, res) => {
  res.status(200).json(await productService.getBestProducts(req, res));
});

const searchProduct = asyncHandler(async (req, res) => {
  res.status(200).json(await productService.searchProduct(req, res));
});

module.exports = {
  getBestProducts,
  searchProduct
};
