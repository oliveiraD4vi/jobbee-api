const ErrorHandler = require("./errorHandler");

module.exports = (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} Route Not Found`, 404));
};
