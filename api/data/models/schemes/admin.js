const mongoose = require("mongoose");
const moment = require("moment");

const uuid = require("uuid").v4();

const Schema = mongoose.Schema;

let Admin = new Schema(
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

    mname: {
      type: String,
      required: true,
      length: 25,
      lowercase: true,
    },

    username: {
      type: String,
      required: true,
      length: 25,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      length: 25,
    },

    address: {
      type: String,
      required: true,
      length: 25,
    },

    gender: {
      type: String,
      required: true,
      length: 10,
    },

    images: {
      photos: {
        type: [String],
        required: false,
      },
      profile: {
        type: String,
        required: false,
        default: "",
      },
    },

    approved: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  { strict: true, timestamps: true }
);

module.exports = mongoose.models.admin || mongoose.model("admin", Admin);
