const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  payment_method: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
  transaction_date: { type: Date, default: Date.now() },
});

const transactionModel = mongoose.model("Transaction", TransactionSchema);

module.exports = transactionModel;
