const asyncHandler = require("express-async-handler");
const adminService = require("../services/admin.service");

const newItem = asyncHandler(async (req, res) => {
  res.status(200).json(await adminService.newItem(req, res));
});

const getItems = asyncHandler(async (req, res) => {
  res.status(200).json(await adminService.getItems(req, res));
});

const updateQuantity = asyncHandler(async (req, res) => {
  res.status(200).json(await adminService.updateQuantity(req, res));
});

const deleteItem = asyncHandler(async (req, res) => {
  res.status(200).json(await adminService.deleteItem(req, res));
});

const Sales = asyncHandler(async (req, res) => {
  res.status(200).json(await adminService.Sales(req, res));
});

const newQuantity = asyncHandler(async (req, res) => {
  res.status(200).json(await adminService.newQuantity(req, res));
});

const getOrders = asyncHandler(async (req, res) => {
  res.status(200).json(await adminService.getOrders(req, res));
});

const deliverNow = asyncHandler(async (req, res) => {
  res.status(200).json(await adminService.deliverNow(req, res));
});

module.exports = {
  newItem,
  getItems,
  updateQuantity,
  deleteItem,
  Sales,
  newQuantity,
  getOrders,
  deliverNow
};
