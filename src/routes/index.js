const JobsRoutes = require("./jobs/jobs");
const AuthRoutes = require("./auth/auth");
const UsersRoutes = require("./users/users");

module.exports = (router) => {
  JobsRoutes(router);
  AuthRoutes(router);
  UsersRoutes(router);
};
