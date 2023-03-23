const { register, login } = require("../../controllers/auth/auth");

module.exports = (router) => {
  // GET
  // POST
  router.route("/auth/login").post(login);
  router.route("/auth/register").post(register);
  // PUT
  // DELETE
};
