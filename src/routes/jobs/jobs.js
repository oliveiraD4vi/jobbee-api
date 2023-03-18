const {
  getJobs,
  newJob,
  getJobsInRadius,
  updateJob,
} = require("../controllers/jobs/controller");

module.exports = (router) => {
  router.route("/jobs").get(getJobs);
  router.route("/jobs").post(newJob);
  router.route("/jobs/:zipcode/:distance").get(getJobsInRadius);
  router.route("/jobs/:id").put(updateJob);
};
