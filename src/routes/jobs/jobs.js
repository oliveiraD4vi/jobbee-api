const {
  getJobs,
  newJob,
  getJobsInRadius,
  updateJob,
  deleteJob,
  getJob,
} = require("../../controllers/jobs/jobs");

module.exports = (router) => {
  // GET
  router.route("/jobs").get(getJobs);
  router.route("/jobs/:id/:slug").get(getJob);
  router.route("/jobs/radius/:zipcode/:distance").get(getJobsInRadius);
  // POST
  router.route("/jobs").post(newJob);
  // PUT
  router.route("/jobs/:id").put(updateJob);
  // DELETE
  router.route("/jobs/:id").delete(deleteJob);
};
