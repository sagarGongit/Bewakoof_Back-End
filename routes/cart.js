const express = require("express");
const route = express.Router();
const cartModel = require("../models/cart");
const userModel = require("../models/user");

route.post("/add-cart/:id", async (req, res) => {
  const productid = req.params.id;
  try {
    let Item = await cartModel.findOne({
      userId: req.userID,
    });
    if (!Item) {
      Item = new cartModel({
        userId: req.userID,
        products: [],
        quantity: 0,
      });
    }
    await userModel.findByIdAndUpdate(
      { _id: req.userID },
      { $push: { cart: Item._id } }
    );
    Item.products.push(productid);
    Item.quantity = Item.products.length;
    await Item.save();
    res.json({
      message: "product added to cart successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

route.get("/cartItems", async (req, res) => {
  try {
    const cartItems = await cartModel.find();
    res.json({
      message: "cart items fetched successfully",
      cartItems,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

route.delete("/removeItem/:productid", async (req, res) => {
  const productid = req.params.productid;
  try {
    const item = await cartModel.findOne({
      userId: req.userID,
    });
    await cartModel.findByIdAndUpdate(
      { _id: item._id },
      { $pull: { products: productid } }
    );
    res.json({
      message: "product removed from cart successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = route;
