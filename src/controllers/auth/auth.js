const User = require("../../models/users/users");
const ErrorHandler = require("../../utils/errorHandler");
const catchAsyncError = require("../../middlewares/asyncErrors");
const sendToken = require("../../utils/token");

exports.register = catchAsyncError(async (req, res, next) => {
  const { name, email, password, role, address } = req.body;

  await User.create({
    name,
    email,
    password,
    role,
    address,
  }).then((user) => {
    sendToken(user, "User successfully registered", 200, res);
  });
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  await User.findOne({ email })
    .select("+password")
    .then(async (user) => {
      const isMatched = await user.comparePassword(password);

      if (!isMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
      }

      sendToken(user, "User successfully registered", 200, res);
    })
    .catch(() => {
      return next(new ErrorHandler("Invalid Email or Password", 401));
    });
});
