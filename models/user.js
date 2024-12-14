const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true },
    name: {
      type: String,
      required: true,
      minLenght: [3, "must be include atleast 3 charecters"],
    },
    email: {
      type: String,
      match: /[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+.){1,}([a-z]{2,16})/,
      required: true,
      unique: true,
    },
    gender: { type: String, enum: ["male", "female", "transgender"] },
    age: {
      type: Number,
      validate: {
        validator: Number.isInteger,
        message: "must be an integer",
      },
      required: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: {
        values: ["admin", "user", "seller"],
        message: "must be valid role",
      },
      default: "user",
    },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
    wishlist: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Wishlist", required: true },
    ],
    cart: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
    ],
  },
  { versionKey: false, timestamps: true }
);

UserSchema.plugin(findOrCreate);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.matchPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;
