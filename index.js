require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const MongoStore = require("connect-mongo");
const Mongo_Connection = require("./config/db");
const userRoute = require("./routes/user");
const cartRoute = require("./routes/cart");
const productRoute = require("./routes/product");
const wishlistRoute = require("./routes/wishlist");
const orderRoute = require("./routes/order");
const slideRoute = require("./routes/slider");
const discountbannerRoute = require("./routes/discountsell");
const Authorization = require("./middlewares/authorization");
const userModel = require("./models/user");

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
      userModel.findOrCreate(
        {
          googleId: profile.id,
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          email: "example@gmail.com",
          password: "$%$@@123",
          age: "26",
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id).exec();
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
  })
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
