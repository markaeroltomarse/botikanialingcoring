const router = require("express").Router();
const Models = require("../../../data/models");
const { Items, Orders } = Models;

const uuid = require("uuid");
const moment = require("moment");

const getBestProducts = async (req, res) => {
  const orders = await Orders.find();
  const orderItems = orders.map(order => order.items);
  let items = [];
  orderItems.forEach(item => {
    items = [...items, ...item];
  });

  let unique = [...new Set(items.map(item => item._id))];

  unique = unique.map(item => ({
    _id: item,
    count: 0
  }));

  unique.forEach(item => {
    item.count += items.filter(i => i._id === item._id).length;
  });

  unique = unique.sort(function(a, b) {
    return a.count - b.count;
  });
  unique = unique.slice(0, 8);
  let bestItems = [];
  if (unique.length >= 6) {
    bestItems = await Items.find({ _id: unique });
  } else {
    const best = await Items.find({ _id: unique });
    const dummyItems = (
      await Items.find({
        _id: { $nin: unique.map(item => item._id) }
      })
    ).slice(0, 6);

    bestItems = [...best, ...dummyItems];
    bestItem = bestItems.slice(0, 8);
  }

  return { msg: "Best products", items: bestItems, result: true };
};

const searchProduct = async (req, res) => {
  const { take, page, keyword } = req.query;
  const nameRegex = new RegExp(keyword, "i");
  const items = await Items.find({ name: nameRegex })
    .limit(+take)
    .skip(+take * +page)
    .sort({
      name: "asc"
    });

  return {
    msg: "",
    items
  };
};

module.exports = {
  getBestProducts,
  searchProduct
};
