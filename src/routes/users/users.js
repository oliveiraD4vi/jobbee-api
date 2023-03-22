const { getAllUsers } = require("../../controllers/users/users");

module.exports = (router) => {
  // GET
  router.route("/users").get(getAllUsers);
  // POST
  // PUT
  // DELETE
};
