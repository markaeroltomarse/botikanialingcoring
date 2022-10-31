const mongoose = require("mongoose");
const moment = require("moment");

const uuid = require("uuid").v4();

const Schema = mongoose.Schema;

let Cart = new Schema(
  {
    userId: {
      type: String,
      require: true,
    },

    productId: {
      type: String,
      require: true,
    },

    qty: {
      type: Number,
      require: false,
      default: 0,
    },
  },
  { strict: true, timestamps: true }
);

module.exports = mongoose.models.cart || mongoose.model("cart", Cart);
