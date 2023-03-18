const { getJobs, createJob } = require("../controllers/jobs/controller");

module.exports = (router) => {
  router.route("/jobs").get(getJobs);
  router.route("/jobs").post(createJob);
};
