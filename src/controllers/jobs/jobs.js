const Job = require("../../models/jobs/jobs");
const Filters = require("../../utils/filters");
const geoCoder = require("../../utils/geocoder");
const ErrorHandler = require("../../utils/errorHandler");
const catchAsyncError = require("../../middlewares/asyncErrors");

exports.getAllJobs = catchAsyncError(async (req, res, next) => {
  const documentsCount = await Job.countDocuments();
  const filters = new Filters(Job.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .searchByQuery()
    .pagination();

  await filters.query.then((jobs) => {
    const message =
      jobs.length > 0
        ? "Jobs found successfully"
        : "Sorry, there is no jobs in the database";

    return res.status(200).json({
      error: false,
      message,
      count: jobs.length,
      total: documentsCount,
      data: jobs,
    });
  });
});

exports.createNewJob = catchAsyncError(async (req, res, next) => {
  await Job.create(req.body).then((job) => {
    return res.status(200).json({
      error: false,
      message: "Job created successfully",
      data: job,
    });
  });
});

exports.getJobsInRadius = catchAsyncError(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  const loc = await geoCoder.geocode(zipcode);
  const latitude = loc[0].latitude;
  const longitude = loc[0].longitude;

  const radius = distance / 3963;

  await Job.find({
    location: {
      $geoWithin: {
        $centerSphere: [[longitude, latitude], radius],
      },
    },
  }).then((jobs) => {
    const message =
      jobs.length > 0
        ? "Jobs found successfully"
        : "Sorry, there is no jobs in the specified range";

    return res.status(200).json({
      error: false,
      message,
      results: jobs.length,
      data: jobs,
    });
  });
});

exports.updateJob = catchAsyncError(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new ErrorHandler("Job Not Found", 404));
  }

  await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).then((job) => {
    return res.status(200).json({
      error: false,
      message: "Job was successfully updated",
      data: job,
    });
  });
});

exports.deleteJob = catchAsyncError(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new ErrorHandler("Job Not Found", 404));
  }

  await Job.findByIdAndDelete(req.params.id).then(() => {
    return res.status(200).json({
      error: false,
      message: "Job is deleted",
    });
  });
});

exports.getJobByIdSlug = catchAsyncError(async (req, res, next) => {
  const job = await Job.find({
    $and: [{ _id: req.params.id }, { slug: req.params.slug }],
  });

  if (!job || job.length === 0) {
    return next(new ErrorHandler("Job Not Found", 404));
  }

  return res.status(200).json({
    error: false,
    message: "Job found",
    data: job,
  });
});

exports.getJobStats = catchAsyncError(async (req, res, next) => {
  await Job.aggregate([
    {
      $match: {
        $text: {
          $search: `\"${req.params.topic}\"`,
        },
      },
    },
    {
      $group: {
        _id: {
          $toUpper: "$experience",
        },
        totalJobs: {
          $sum: 1,
        },
        avgPosition: {
          $avg: "$positions",
        },
        avgSalary: {
          $avg: "$salary",
        },
        minSalary: {
          $min: "$salary",
        },
        maxSalary: {
          $max: "$salary",
        },
      },
    },
  ]).then((stats) => {
    const message =
      stats.length > 0
        ? "Stats found successfully"
        : "Sorry, there is no stats with the parameter";

    return res.status(200).json({
      error: false,
      message,
      data: stats,
    });
  });
});
