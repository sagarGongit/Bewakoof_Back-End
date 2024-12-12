const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    wallet_balance: { type: Number, required: true },
    transaction_history: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
  },
  { versionKey: false, timestamps: true }
);

const walletModel = mongoose.model("Wallet", WalletSchema);

module.exports = walletModel;
