const mongoose = require("mongoose");

const Mongo_Connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/bewakoof");
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = Mongo_Connection;
