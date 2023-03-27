const { isAuthenticatedUser } = require("../../middlewares/auth");

const {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
} = require("../../controllers/auth/auth");

module.exports = (router) => {
  // GET
  router.route("/auth/logout").get(isAuthenticatedUser, logout);
  // POST
  router.route("/auth/password/forgot").post(forgotPassword);
  router.route("/auth/login").post(login);
  router.route("/auth/register").post(register);
  // PUT
  router.route("/auth/password/reset/:token").put(resetPassword);
  // DELETE
};
