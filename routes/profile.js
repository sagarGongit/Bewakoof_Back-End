const express = require("express");
const profileModel = require("../models/profile");
const userModel = require("../models/user");
const route = express.Router();

route.post("/add-profile", async (req, res) => {
  try {
    const profile = await profileModel.findOne({ userId: req.userID });
    if (!profile) {
      profile = new profileModel({
        userId: req.userID,
        name: "",
        mobile_number: 0,
        address: {},
      });
    }
    await userModel.findByIdAndUpdate(
      {
        _id: req.userID,
      },
      { $push: { profile: req.body } }
    );
    await profile.save();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

route.get("/user-profile", async (req, res) => {
  try {
    const users = await profileModel.find();
    res.json({
      message: "user fetched successful",
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

route.patch("/update-profile", async (req, res) => {
  const userid = req.userID;
  try {
    const user = await profileModel.findOneAndUpdate(
      { userId: userid },
      req.body
    );
    res.json({
      message: "user profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

route.delete("/delete-profile", async (req, res) => {
  const userid = req.userID;
  try {
    await profileModel.findOneAndDelete({ userId: userid });
    res.json({
      message: "user profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = route;
