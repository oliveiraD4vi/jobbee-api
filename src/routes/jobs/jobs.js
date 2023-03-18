const {
  getJobs,
  newJob,
  getJobsInRadius,
  updateJob,
  deleteJob,
} = require("../controllers/jobs/controller");

module.exports = (router) => {
  // GET
  router.route("/jobs").get(getJobs);
  router.route("/jobs/:zipcode/:distance").get(getJobsInRadius);
  // POST
  router.route("/jobs").post(newJob);
  // PUT
  router.route("/jobs/:id").put(updateJob);
  // DELETE
  router.route("/jobs/:id").delete(deleteJob);
};
