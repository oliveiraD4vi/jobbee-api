const crypto = require("crypto");

const User = require("../../models/users/users");
const ErrorHandler = require("../../utils/errorHandler");
const catchAsyncError = require("../../middlewares/asyncErrors");
const sendToken = require("../../utils/token");
const sendEmail = require("../../utils/sendEmail");

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

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("No user exist for this email", 404));
  }

  const resetToken = await user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/password/reset/${resetToken}`;

  const message = `Your password reset link: ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Jobbee API Password Recovery",
      message,
    });

    return res.status(200).json({
      error: false,
      message: `Email sent successfully to: ${user.email}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(err.message, 500));
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(new ErrorHandler("Password Reset token is invalid", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, "Password successfully changed", 200, res);
});
