const router = require("express").Router();
const restricted = require("../middleware/restricted-middleware")
const Userhelper = require("./users-model.js");

//Getting list of users: /api/users
router.get("/", restricted(), async (req, res, next) => {
  try {
    const users = await Userhelper.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});



module.exports = router;