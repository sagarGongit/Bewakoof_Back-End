const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    quantity: {
      type: Number,
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: "enter a valid integer number",
      },
    },
  },
  { versionKey: false, timestamps: true }
);

const WishlistModel = mongoose.model("Wishlist", WishlistSchema);

module.exports = WishlistModel;
