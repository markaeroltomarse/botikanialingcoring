const router = require("express").Router();
const Models = require("../../../data/models");
const { Orders, Items, Admin } = Models;

const uuid = require("uuid");
const moment = require("moment");
const asyncHandler = require("express-async-handler");

const newItem = asyncHandler(async (req, res) => {
  let newitem = new Items(req.body.newitem);
  newitem.save();
  return { msg: "New item saved!", newitem, result: true };
});

const getItems = async (req, res) => {
  let items = await Items.find();
  items.forEach(item => {
    item.qty = item.qty.filter(qty => qty.date > moment().format("YYYY-MM-DD"));
  });

  items = items.reverse();
  return { items };
};

const updateQuantity = async (req, res) => {
  console.log(req.body);

  const { _id, items } = req.body;
  for (const item of items) {
    await Items.updateOne(
      { _id, "qty.date": item.date },
      { $set: { "qty.$.qty": item.qty } }
    );
  }

  return {
    result: true,
    msg: "Quantities successfully updated!"
  };
};

const deleteItem = async (req, res) => {
  console.log(req.body);

  await Items.remove({ _id: req.body.item._id });

  return {
    result: true,
    msg: "Item Deleted Successfully."
  };
};

const Sales = async (req, res) => {
  let days = getCurrentWeek();
  console.log(days);
  let orders = await Orders.find({ delivered: true });
  let items = await Items.find();

  let weekvalue = [];
  days.forEach(day => {
    let total = 0;
    let oneday = orders.filter(order => order.formattedDate.day == day);
    console.log("ONE DAY", oneday);
    oneday.forEach(order => {
      let mappedToTotal = order.items.map(
        item => item.selectedqty * item.price
      );
      console.log("MAPPED TOTAL", mappedToTotal);
      total += mappedToTotal.reduce((a, b) => a + b, 0);
    });

    weekvalue.push(total);
  });

  console.log(weekvalue);

  console.log("ITEMS", items);
  return {
    result: true,
    weekvalue,
    orders: orders,
    product: items.length,
    items
  };
};

const newQuantity = async (req, res) => {
  console.log(req.body);
  const { _id, newitem } = req.body;
  let newQTY = await Items.updateOne({ _id }, { $push: { qty: newitem } });
  return { result: true, newQTY };
};

const getOrders = async (req, res) => {
  let orders = await Orders.find();
  order = orders.reverse();
  return { orders };
};

const deliverNow = async (req, res) => {
  console.log(req.body);
  let delivered = await Orders.updateOne(
    { _id: req.body._id },
    { $set: { delivered: true } }
  );

  return { delivered };
};

function getCurrentWeek() {
  var currentDate = moment();

  var weekStart = currentDate.clone().startOf("isoWeek");
  var weekEnd = currentDate.clone().endOf("isoWeek");

  var days = [];

  for (var i = 0; i <= 6; i++) {
    days.push(
      moment(weekStart)
        .add(i, "days")
        .format("DD")
    );
  }

  return days;
}

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
