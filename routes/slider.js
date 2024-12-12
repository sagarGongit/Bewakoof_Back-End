const express = require("express");
const sliderModel = require("../models/sliders");
const RoleChecker = require("../middlewares/roleChecker");
const route = express.Router();

route.post("/add-slide", RoleChecker(["admin", "seller"]), async (req, res) => {
  try {
    const newSlide = await sliderModel.create({ ...req.body });
    res.json({
      message: "slide added successfully",
      newSlide,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

route.get("/get-sliders", async (req, res) => {
  try {
    const sliders = await sliderModel.find();
    if (!sliders) {
      return res.status(404).json({
        message: "sliders not found please add some !",
      });
    }
    res.json({
      message: "sliders fetched successfully",
      sliders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = route;
