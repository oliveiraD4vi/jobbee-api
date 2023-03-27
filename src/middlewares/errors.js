const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      error: true,
      err: err,
      errMessage: err.message,
      errStack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "production") {
    let error = { message: err.message, statusCode: err.statusCode };

    // Handling Mongoose Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errros).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    // Handling Mongoose Duplicate Key Error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    // Handling wrong JWT Token Error
    if (err.name === "JsonWebTokenError") {
      const message = "JSON Web Token is invalid. Try Again";
      error = new ErrorHandler(message, 500);
    }

    // Handling TokenExpired Error
    if (err.name === "TokenExpiredError") {
      const message = "JSON Web Token is expired: Try Again";
      error = new ErrorHandler(message, 500);
    }

    res.status(err.statusCode).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};
