// Get all Jobs method
exports.getJobs = (req, res, next) => {
  res.status(200).json({
    error: false,
    message: "Success",
  });
};

// Create Job method
exports.createJob = (req, res, next) => {
  res.status(200).json({
    error: false,
    message: "Success",
    data: req.body,
  });
};
