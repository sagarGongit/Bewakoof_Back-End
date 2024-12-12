const express = require("express");
const productModel = require("../models/product");
const RoleChecker = require("../middlewares/roleChecker");
const route = express();

route.post(
  "/add-product",
  RoleChecker(["seller", "admin"]),
  async (req, res) => {
    try {
      const newProduct = new productModel({
        ...req.body,
        sellerid: req.userID,
      });
      await newProduct.save();
      res.json({
        message: "product added successfully",
        product: newProduct,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

route.get("/get-products", async (req, res) => {
  const { q, sort, limit = 10, page = 1, filter } = req.query;
  const query = {};
  const options = { limit, skip: (page - 1) * limit };
  if (q) {
    query.title = new RegExp(q, "i");
  }
  if (sort) {
    options.sort = { price: sort == "asc" ? -1 : 1 };
  }
  if (filter) {
    query.category = new RegExp(filter, "i");
  }

  const Pages = await productModel.countDocuments();
  const currentPage = parseInt(page);
  const totalPages = Math.ceil(Pages / limit);

  try {
    const products = await productModel.find(query, null, options);
    res.json({
      message: "product fetched successfully",
      currentPage,
      totalPages,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

route.get("/get-products/:id", async (req, res) => {
  const productid = req.params.id;
  try {
    const product = await productModel.findOne({ _id: productid });
    res.json({
      message: "product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

route.patch(
  "/update-product/:id",
  RoleChecker(["seller", "admin"]),
  async (req, res) => {
    const productid = req.params.id;
    try {
      const products = await productModel.findByIdAndUpdate(
        { _id: productid },
        req.body
      );
      res.json({
        message: "product updated successfully",
        products,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

route.delete(
  "/delete-product/:id",
  RoleChecker(["seller", "admin"]),
  async (req, res) => {
    const productid = req.params.id;
    try {
      const products = await productModel.findByIdAndDelete({ _id: productid });
      res.json({
        message: "product deleted successfully",
        products,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = route;
