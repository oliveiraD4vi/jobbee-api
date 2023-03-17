const { getJobs } = require("../controllers/jobs/controller");

module.exports = (router) => {
  router.route("/jobs").get(getJobs);
};
