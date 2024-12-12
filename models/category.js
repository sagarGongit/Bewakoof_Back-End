const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    categories: {
      type: String,
      enum: ["men", "woman"],
      required: true,
    },
    sub_categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sub-Category",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const categoryModel = mongoose.model("Category", CategorySchema);

module.exports = categoryModel;
