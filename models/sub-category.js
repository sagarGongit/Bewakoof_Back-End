const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  {
    categories: {
      type: String,
      enum: [
        "OverSized T-Shirts",
        "Hoodies",
        "Joggers",
        "Jeans",
        "Classic Fit T-Shirts",
        "Full Sleeve T-Shirts",
        "Sweatshirts",
        "Cargos",
        "Sweaters",
        "Pants",
        "Pyjamas",
        "Jackets",
        "Shirts",
        "Sliders",
        "BoyFriend T-Shirts",
        "Parachute Pants",
        "Tops",
        "Co-ords",
        "Dresses",
      ],
      required: true,
    },
    image_url: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const subcategoryModel = mongoose.model("Sub-Category", SubCategorySchema);

module.exports = subcategoryModel;
