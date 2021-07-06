const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  lastName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    require: true,
    max: 1024,
    min: 6,
  },
  password: {
    type: String,
    require: true,
    max: 1024,
    min: 6,
  },
  userName: {
    type: String,
    require: true,
    max: 1024,
    min: 6,
  },
  phoneNumber: {
    type: String,
    require: true,
    max: 1024,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userSchema);
