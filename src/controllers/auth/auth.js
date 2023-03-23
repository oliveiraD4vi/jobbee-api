const User = require("../../models/users/users");
const ErrorHandler = require("../../utils/errorHandler");
const catchAsyncError = require("../../middlewares/asyncErrors");

exports.register = catchAsyncError(async (req, res, next) => {
  const { name, email, password, role, address } = req.body;

  await User.create({
    name,
    email,
    password,
    role,
    address,
  }).then(async (user) => {
    const token = await user.getJwtToken();

    return res.status(200).json({
      error: false,
      message: "User successfully created",
      data: user,
      token,
    });
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

      const token = await user.getJwtToken();

      return res.status(200).json({
        error: false,
        message: "User successfully logged",
        data: user,
        token,
      });
    })
    .catch(() => {
      return next(new ErrorHandler("Invalid Email or Password", 401));
    });
});
