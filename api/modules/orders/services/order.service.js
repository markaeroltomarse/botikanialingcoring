const Models = require("../../../data/models");
const { Admin, Orders, Items } = Models;

const uuid = require("uuid");
const moment = require("moment");

const purchaseItem = async (req, res) => {
  let neworder = new Orders(req.body.customer);
  neworder.save();

  for (const item of req.body.customer.items) {
    await Items.updateOne({ _id: item._id }, { $set: { qty: item.qty } });
  }

  return {
    msg: "Order done!",
    result: false
  };
};

module.exports = { purchaseItem };
