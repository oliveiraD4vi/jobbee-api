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
    res.status(err.statusCode).json({
      error: true,
      message: err.message || "Internal Server Error",
    });
  }
};
