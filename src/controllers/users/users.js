const User = require("../../models/users/users");
const Filters = require("../../utils/filters");
// const geoCoder = require("../../utils/geocoder");
// const ErrorHandler = require("../../utils/errorHandler");
const catchAsyncError = require("../../middlewares/asyncErrors");

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const documentsCount = await User.countDocuments();
  const filters = new Filters(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .searchByQuery()
    .pagination();

  await filters.query.then((users) => {
    const message =
      users.length > 0
        ? "Users found successfully"
        : "Sorry, there is no users in the database";

    return res.status(200).json({
      error: false,
      message,
      count: users.length,
      total: documentsCount,
      data: users,
    });
  });
});
