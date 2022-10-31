let admin = null;
let orders = null;
let items = null;
let cart = null;
try {
  admin = require("./schemes/admin");
  orders = require("./schemes/orders");
  items = require("./schemes/items");
  cart = require("./schemes/cart");
} catch (err) {
  admin = require("./schemes/admin");
  orders = require("./schemes/orders");
  items = require("./schemes/items");
  cart = require("./schemes/cart");
}

module.exports = {
  Admin: admin,
  Orders: orders,
  Items: items,
  Cart: cart,
};
