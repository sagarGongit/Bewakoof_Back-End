const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  size: {
    type: String,
    enum: {
      values: ["sm", "md", "lg", "xl", "2xl"],
      message: "value should be includes with given valid sizes",
    },
    required: true,
  },
  stock: {
    type: Number,
    min: [0, "value must be +ve"],
    validator: {
      validate: Number.isInteger,
    },
  },
});

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    discount: {
      type: Number,
      validate: {
        validator: Number.isInteger,
        message: "value must be an integer",
      },
      required: true,
    },
    category: {
      type: String,
      default: null,
    },
    sizes: [sizeSchema],
    sellerid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

const productModel = mongoose.model("Product", ProductSchema);

module.exports = productModel;
