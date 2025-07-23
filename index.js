const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path"); 

const cors = require("cors");
const orderRouter = require("./App/routes/web/orderRoutes");
const productRouter = require("./App/routes/productRouter");

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(cors());
app.use(express.json());

//Order Routes
app.use("/web/api", orderRouter);

//Product Routes
app.use("/web/api", productRouter);

// Connection to DB
mongoose.connect(process.env.DBURL).then(() => {
  console.log("Connected to Database");
  app.listen(process.env.PORT, () => {
    console.log("Server is Running on Port " + process.env.PORT);
  });
});
