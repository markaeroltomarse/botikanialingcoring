const asyncHandler = require("express-async-handler");
const authService = require("../services/auth.service");
const insertAdmin = asyncHandler(async (req, res) => {
  res.status(200).json(await authService.insertAdmin(req, res));
});

const login = asyncHandler(async (req, res) => {
  res.status(200).json(await authService.login(req, res));
});

module.exports = {
  insertAdmin,
  login
};
