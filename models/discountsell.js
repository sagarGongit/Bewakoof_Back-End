const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema(
  {
    discount_banner: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const discountModel = mongoose.model("DiscountSell", DiscountSchema);

module.exports = discountModel;
