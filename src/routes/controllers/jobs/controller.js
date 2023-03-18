const Job = require("../../../models/jobs/jobs");

exports.getJobs = async (req, res, next) => {
  const jobs = await Job.find({});

  res.status(200).json({
    error: false,
    message: "Success",
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
