const jwt = require("jsonwebtoken");
const User = require("../models/users/users");
const catchAsyncErrors = require("./asyncErrors");
const ErrorHandler = require("../utils/errorHandler");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_KEY);
  req.user = await User.findById(decoded.id);

  return next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }

    return next();
  };
};
