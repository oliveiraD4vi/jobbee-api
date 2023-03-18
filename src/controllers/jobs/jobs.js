const Job = require("../../models/jobs/jobs");
const geoCoder = require("../../utils/geocoder");

exports.getJobs = async (req, res, next) => {
  const jobs = await Job.find({});

  return res.status(200).json({
    error: false,
    message: "Success",
    results: jobs.length,
    data: jobs,
  });
};

exports.newJob = async (req, res, next) => {
  const job = await Job.create(req.body);

  return res.status(200).json({
    error: false,
    message: "Job created",
    data: job,
  });
};

exports.getJobsInRadius = async (req, res, next) => {
  const { zipcode, distance } = req.params;

  const loc = await geoCoder.geocode(zipcode);
  const latitude = loc[0].latitude;
  const longitude = loc[0].longitude;

  const radius = distance / 3963;

  const jobs = await Job.find({
    location: {
      $geoWithin: {
        $centerSphere: [[longitude, latitude], radius],
      },
    },
  });

  return res.status(200).json({
    error: false,
    message: "Success",
    results: jobs.length,
    data: jobs,
  });
};

exports.updateJob = async (req, res, next) => {
  let job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({
      error: true,
      message: "Not found",
    });
  }

  job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    error: false,
    message: "Job is updated",
    data: job,
  });
};

exports.deleteJob = async (req, res, next) => {
  let job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(400).json({
      error: true,
      message: "Not found",
    });
  }

  job = await Job.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    error: false,
    message: "Job is deleted",
  });
};

exports.getJob = async (req, res, next) => {
  const job = await Job.find({
    $and: [{ _id: req.params.id }, { slug: req.params.slug }],
  });

  if (!job || job.length === 0) {
    return res.status(400).json({
      error: true,
      message: "Not found",
    });
  }

  return res.status(200).json({
    error: false,
    message: "Job found",
    data: job,
  });
};

exports.getJobStats = async (req, res, next) => {
  const stats = await Job.aggregate([
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
  ]);

  if (stats.length === 0) {
    return res.status(400).json({
      error: true,
      message: "Not found",
    });
  }

  return res.status(200).json({
    error: false,
    message: "Success",
    data: stats,
  });
};
