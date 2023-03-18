const { getJobs, newJob } = require("../controllers/jobs/controller");

module.exports = (router) => {
  router.route("/jobs").get(getJobs);
  router.route("/jobs").post(newJob);
};
