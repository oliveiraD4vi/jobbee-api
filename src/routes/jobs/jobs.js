const {
  getJobs,
  newJob,
  getJobsInRadius,
} = require("../controllers/jobs/controller");

module.exports = (router) => {
  router.route("/jobs").get(getJobs);
  router.route("/jobs").post(newJob);
  router.route("/jobs/:zipcode/:distance").get(getJobsInRadius);
};
