const User = require("../../models/users/users");
const Filters = require("../../utils/filters");
// const geoCoder = require("../../utils/geocoder");
// const ErrorHandler = require("../../utils/errorHandler");
const catchAsyncError = require("../../middlewares/asyncErrors");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, role, address } = req.body;

  await User.create({
    name,
    email,
    password,
    role,
    address,
  }).then((user) => {
    return res.status(200).json({
      error: false,
      message: "User successfully created",
      data: user,
    });
  });
});
