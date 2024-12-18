const express = require("express");
const sliderModel = require("../models/sliders");
const RoleChecker = require("../middlewares/roleChecker");
const Authorization = require("../middlewares/authorization");
const route = express.Router();

route.post(
  "/add-slider",
  Authorization,
  RoleChecker(["admin", "seller"]),
  async (req, res) => {
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
  }
);

route.post(
  "/add-slide/:id",
  Authorization,
  RoleChecker(["admin", "seller"]),
  async (req, res) => {
    const sliderid = req.params.id;
    const { imgUrl } = req.body;
    try {
      const addSlide = await sliderModel.findOne({ _id: sliderid });
      addSlide.imageUrl.push(imgUrl);
      res.json({
        message: "slide added successfully",
        SlideAdded: addSlide,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

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

route.patch(
  "/update-slide/:id",
  Authorization,
  RoleChecker(["admin", "seller"]),
  async (req, res) => {
    const slideid = req.params.id;
    try {
      await sliderModel.findByIdAndUpdate({ _id: slideid }, req.body);
      res.json({
        message: "slide updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

route.delete(
  "/delete-slide/:id",
  Authorization,
  RoleChecker(["admin", "seller"]),
  async (req, res) => {
    const slideid = req.params.id;
    try {
      await sliderModel.findByIdAndDelete({ _id: slideid });
      res.json({
        message: "slide deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = route;
