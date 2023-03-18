const Job = require("../../../models/jobs/jobs");
const geoCoder = require("../../../utils/geocoder");

exports.getJobs = async (req, res, next) => {
  const jobs = await Job.find({});

  res.status(200).json({
    error: false,
    message: "Success",
    results: jobs.length,
    data: jobs,
  });
};

exports.newJob = async (req, res, next) => {
  const job = await Job.create(req.body);

  res.status(200).json({
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

  res.status(200).json({
    error: false,
    message: "Success",
    results: jobs.length,
    data: jobs,
  });
};
