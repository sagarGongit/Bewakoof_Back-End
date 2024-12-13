require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Mongo_Connection = require("./config/db");
const userRoute = require("./routes/user");
const cartRoute = require("./routes/cart");
const productRoute = require("./routes/product");
const wishlistRoute = require("./routes/wishlist");
const orderRoute = require("./routes/order");
const slideRoute = require("./routes/slider");
const discountbannerRoute = require("./routes/discountsell");
const Authorization = require("./middlewares/authorization");

const app = express();

const PORT = process.env.PORT || 3002;

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use("/user", userRoute);
app.use("/cart", Authorization, cartRoute);
app.use("/product", Authorization, productRoute);
app.use("/wishlist", Authorization, wishlistRoute);
app.use("/order", Authorization, orderRoute);
app.use("/slide", Authorization, slideRoute);
app.use("/discountsell", Authorization, discountbannerRoute);

app.get("/", (req, res) => {
  res.json({
    message: "health route is tested successfully",
  });
});

app.listen(PORT, () => {
  Mongo_Connection();
  console.log(`your server is live on port ${PORT}`);
});
