const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const Authorization = require("../middlewares/authorization");
const blacklistModel = require("../models/blacklist");
const RoleChecker = require("../middlewares/roleChecker");

// register

route.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(401).json({
        message: "user already exist , please login",
      });
    }
    await userModel.create({ ...req.body });
    res.json({
      message: "user register successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// login

route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "invalid mail id user not found",
      });
    }
    if (!(await user.matchPassword(password))) {
      return res.status(401).json({
        message: "Incorrect credientials",
      });
    }
    var token = jwt.sign(
      { userID: user._id, role: user.role, username: user.name },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.json({
      message: "user login successfully",
      token: token,
      userid: user._id,
      role: user.role,
      username: user.name,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//logout

route.post("/logout", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const blacklisted = new blacklistModel({
      Blacklisted_Tokens: token,
    });
    await blacklisted.save();
    res.json({
      message: "logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

route.get("/get-users", RoleChecker(["admin"]), async (req, res) => {
  const { q, sort, filter, page = 1, limit = 10 } = req.query;

  const query = {};
  const options = { limit, skip: (page - 1) * limit };
  if (q) {
    query.name = new RegExp(q, "i");
  }
  if (sort) {
    options.sort = { age: sort == "asc" ? -1 : 1 };
  }
  if (filter) {
    query.role = new RegExp(filter, "i");
  }

  const Pages = await productModel.countDocuments();
  const currentPage = parseInt(page);
  const totalPages = Math.ceil(Pages / limit);

  try {
    const users = await userModel.find();
    res.json({
      message: "users fetched successfully",
      currentPage,
      totalPages,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

route.get("/get-users/:id", RoleChecker(["admin"]), async (req, res) => {
  const userid = req.params.id;
  try {
    const user = await userModel.findOne({ _id: userid });
    res.json({
      message: "user fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

route.patch("/update-user/:id", RoleChecker(["admin"]), async (req, res) => {
  const userid = req.params.id;
  try {
    const user = await userModel.findByIdAndUpdate({ _id: userid }, req.body);
    res.json({
      message: "user updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

route.delete("/delete-user/:id", RoleChecker(["admin"]), async (req, res) => {
  const userid = req.params.id;
  try {
    const user = await userModel.findByIdAndDelete({ _id: userid });
    res.json({
      message: "user deleted successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = route;
