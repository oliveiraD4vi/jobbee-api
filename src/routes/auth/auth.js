const { isAuthenticatedUser } = require("../../middlewares/auth");
const {
  register,
  login,
  forgotPassword,
} = require("../../controllers/auth/auth");

module.exports = (router) => {
  // GET
  // POST
  router
    .route("/auth/password/reset")
    .post(isAuthenticatedUser, forgotPassword);
  router.route("/auth/login").post(login);
  router.route("/auth/register").post(register);
  // PUT
  // DELETE
};
