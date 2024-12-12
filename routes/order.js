const express = require("express");
const orderModel = require("../models/orders");
const route = express();

route.post("/place-order", async (req, res) => {
  try {
    const order = await orderModel.find();
    res.json({
      message: "",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = route;
