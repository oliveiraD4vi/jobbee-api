const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");

const geoCoder = require("../../utils/geocoder");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the user's name"],
  },
  email: {
    type: String,
    unique: [true, "The email already exists"],
    required: [true, "Please enter a email address"],
    validate: [validator.isEmail, "Please add a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [8, "Your passord needs to be at least 8 characters long"],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  role: {
    type: String,
    enum: {
      values: ["user", "employeer"],
      message: "Please select a valida role",
    },
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formatedAddress: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.pre("save", async function (next) {
  const loc = await geoCoder.geocode(this.address);

  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formatedAddress: loc[0].formattedAddress,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  next();
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

module.exports = mongoose.model("User", userSchema);
