const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../../controllers/auth/auth");

module.exports = (router) => {
  // GET
  // POST
  router.route("/auth/password/forgot").post(forgotPassword);
  router.route("/auth/login").post(login);
  router.route("/auth/register").post(register);
  // PUT
  router.route("/auth/password/reset/:token").put(resetPassword);
  // DELETE
};
