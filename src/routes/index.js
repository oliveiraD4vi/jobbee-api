const JobsRoutes = require("./jobs/jobs");
const UsersRoutes = require("./users/users");

module.exports = (router) => {
  JobsRoutes(router);
  UsersRoutes(router);
};
