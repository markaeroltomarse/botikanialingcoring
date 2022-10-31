const mongoose = require("mongoose");
const moment = require("moment");
const uuid = require("uuid").v4();
let today = moment().format("MMMM Do YYYY,dddd");

const {
  REFUNDED,
  CANCELLED,
  DELIVERED,
  PENDING,
} = require("../../enums/delivery-status.enum");

const Schema = mongoose.Schema;

let Orders = new Schema(
  {
    fname: {
      type: String,
      required: true,
      length: 25,
      lowercase: true,
    },
    lname: {
      type: String,
      required: true,
      length: 25,
      lowercase: true,
    },

    phonenumber: {
      type: Number,
      required: true,
    },

    city: {
      type: String,
      required: true,
      length: 25,
      lowercase: true,
    },

    address: {
      type: String,
      required: true,
      length: 25,
    },

    deliveryStatus: {
      type: String,
      enum: [REFUNDED, CANCELLED, DELIVERED, PENDING],
      default: PENDING,
    },

    items: {
      type: [Object],
      required: false,
    },

    formattedDate: {
      type: Object,
      default: {
        year: moment().format("YYYY"),
        month: moment().format("MM"),
        day: moment().format("DD"),
      },
    },
    created: {
      type: String,
      default: today,
    },

    delivered: {
      type: Boolean,
      default: false,
    },
  },
  { strict: true, timestamps: true }
);

module.exports = mongoose.models.orders || mongoose.model("orders", Orders);
