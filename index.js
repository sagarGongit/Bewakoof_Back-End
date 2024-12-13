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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URI,
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
app.use(
  session({ secret: "secretKey", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

app.listen(PORT, () => {
  Mongo_Connection();
  console.log(`your server is live on port ${PORT}`);
});
