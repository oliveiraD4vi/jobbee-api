const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../../middlewares/auth");
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
  router
    .route("/stats/:topic")
    .get(
      isAuthenticatedUser,
      authorizeRoles("employeer", "admin"),
      getJobStats
    );
  router.route("/jobs/:id/:slug").get(getJobByIdSlug);
  router.route("/jobs/radius/:zipcode/:distance").get(getJobsInRadius);
  // POST
  router
    .route("/jobs")
    .post(
      isAuthenticatedUser,
      authorizeRoles("employeer", "admin"),
      createNewJob
    );
  // PUT
  router
    .route("/jobs/:id")
    .put(isAuthenticatedUser, authorizeRoles("employeer", "admin"), updateJob);
  // DELETE
  router
    .route("/jobs/:id")
    .delete(
      isAuthenticatedUser,
      authorizeRoles("employeer", "admin"),
      deleteJob
    );
};
