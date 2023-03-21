const {
  getAllJobs,
  createNewJob,
  getJobsInRadius,
  updateJob,
  deleteJob,
  getJobStats,
  getJobByIdSlug,
} = require("../../controllers/jobs/jobs");

module.exports = (router) => {
  // GET
  router.route("/jobs").get(getAllJobs);
  router.route("/stats/:topic").get(getJobStats);
  router.route("/jobs/:id/:slug").get(getJobByIdSlug);
  router.route("/jobs/radius/:zipcode/:distance").get(getJobsInRadius);
  // POST
  router.route("/jobs").post(createNewJob);
  // PUT
  router.route("/jobs/:id").put(updateJob);
  // DELETE
  router.route("/jobs/:id").delete(deleteJob);
};
