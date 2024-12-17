const express = require("express");
const discountModel = require("../models/discountsell");
const RoleChecker = require("../middlewares/roleChecker");
const Authorization = require("../middlewares/authorization");
const route = express.Router();

route.post(
  "/add/discount-banner",
  Authorization,
  RoleChecker(["admin", "seller"]),
  async (req, res) => {
    try {
      const discountSell = await discountModel.create({ ...req.body });
      res.json({
        message: "new discount banner added successfully",
        discountSell,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

route.get("/discount-banners", async (req, res) => {
  try {
    const discountBanners = await discountModel.find();
    res.json({
      message: "new discount banner fetched successfully",
      discountBanners,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

route.patch(
  "/update/discount-banners/:id",
  Authorization,
  RoleChecker(["admin", "seller"]),
  async (req, res) => {
    const bannerid = req.params.id;
    try {
      const discountBanners = await discountModel.findByIdAndUpdate({
        _id: bannerid,
      });
      res.json({
        message: "new discount banner fetched successfully",
        discountBanners,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

route.delete(
  "/delete/discount-banners/:id",
  Authorization,
  RoleChecker(["admin", "seller"]),
  async (req, res) => {
    const bannerid = req.params.id;
    try {
      const discountBanners = await discountModel.findByIdAndDelete({
        _id: bannerid,
      });
      res.json({
        message: "discount banner deleted successfully",
        discountBanners,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = route;
