const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products_details: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
    total_amount: { type: Number, required: true },
    order_status: {
      type: String,
      enum: ["shipped", "delivered", "pending"],
      default: "pending",
    },
    payment_details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    shipping_address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    order_date: {
      type: Date,
      required: true,
    },
    delivery_date: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false }
);

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
