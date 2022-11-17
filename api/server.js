const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");

const cors = require("cors");
//DOT ENV
require("dotenv/config");

// Database connection
mongoose.connect(
  "mongodb+srv://tagalog233:manualdragon3@node-express-lb96i.mongodb.net/botika?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  () => {
    console.log("Connected to MongoDB database.");
  }
);

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//LOGS
app.use((req, res, next) => {
  console.log("Request Happen! ");

  next();
});

app.use(
  cors({
    origin: [
      "https://traqrsystem.herokuapp.com/",
      `http://localhost:${process.env.APP_PORT}`
    ],
    methods: ["POST", "GET", "PUT", "PATCH", "CREATE", "DELETE"],
    credentials: true
  })
);

//authentications
app.use("/api/authen", require("./modules/authen"));

//admin
app.use("/api/admin", require("./modules/admin"));

//orders
app.use("/api/orders", require("./modules/orders"));

//products
app.use("/api/products", require("./modules/products"));

// Error handler
const { errorHandler } = require("./common/exceptions/async-handler.exception");

app.use(errorHandler);

console.log("EXPRESS API RUNNING");

module.exports = {
  path: "",
  handler: app
};
