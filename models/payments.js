const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  transaction_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    required: true,
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    match:
      /^([¥€£₹$])?\d{1,3}(,\d{3})*(\.\d{1,2})?$|^([¥€£₹$])?\d+(\.\d{1,3})?$/,
    required: true,
  },
  payment_method: { type: String, required: true },
  payment_status: {
    type: String,
    enum: {
      values: ["Pending", "Success", "Failed", "Refunded"],
      message: "status must be includes given values only",
    },
  },
  payment_date: { type: Date, default: Date.now },
});

const paymentModel = mongoose.model("Payment", PaymentSchema);

module.exports = paymentModel;
