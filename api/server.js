const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");
const path = require("path");
const cors = require("cors");
//DOT ENV
require("dotenv/config");

// Database connection
mongoose.connect(
  "mongodb+srv://tagalog233:manualdragon3@node-express-lb96i.mongodb.net/botika",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
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
      `http://localhost:${process.env.APP_PORT}`,
      "https://botikanialingcoring.vercel.app/"
    ],
    methods: ["POST", "GET", "PUT", "PATCH", "CREATE", "DELETE"],
    credentials: true
  })
);

const auth = require(path.join(__dirname, "./modules/authen"));
app.use("/api/authen", auth);
app.use("/api/admin", require(path.join(__dirname, "./modules/admin")));
app.use("/api/orders", require(path.join(__dirname, "./modules/orders")));
app.use("/api/products", require(path.join(__dirname, "./modules/products")));

// Error handler
const { errorHandler } = require("./common/exceptions/async-handler.exception");

app.use(errorHandler);

console.log("EXPRESS API RUNNING");

module.exports = app;
