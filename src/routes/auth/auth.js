const { registerUser } = require("../../controllers/auth/auth");

module.exports = (router) => {
  // GET
  // POST
  router.route("/auth/register").post(registerUser);
  // PUT
  // DELETE
};
