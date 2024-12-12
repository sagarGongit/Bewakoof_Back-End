const express = require("express");
const route = express.Router();
const WishlistModel = require("../models/wishlist");
const userModel = require("../models/user");

route.post("/add-wishlist/:id", async (req, res) => {
  const productid = req.params.id;
  try {
    let Item = await WishlistModel.findOne({
      userId: req.userID,
    });
    if (!Item) {
      Item = new WishlistModel({
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
      message: "product added to wishlist successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

route.get("/wishlistItems", async (req, res) => {
  try {
    const cartItems = await WishlistModel.find();
    res.json({
      message: "wishlist items fetched successfully",
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
    const item = await WishlistModel.findOne({
      userId: req.userID,
    });
    await WishlistModel.findByIdAndUpdate(
      { _id: item._id },
      { $pull: { products: productid } }
    );
    res.json({
      message: "Item removed from wishlist successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = route;
