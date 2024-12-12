const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    imageUrl: [{ type: String, required: true }],
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false, timestamps: true }
);

const sliderModel = mongoose.model("Slider", SliderSchema);

module.exports = sliderModel;
