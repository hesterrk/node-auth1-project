const express = require("express");

const router = express.Router({
    mergeParams: true
  });
const Usershelper = require("../users/users-model.js");

const bycrypt = require("bcryptjs")


// /api/auth/register   -->POST register
router.post("/register", async (req, res, next) => {
  try {
    let user = req.body;
    console.log(user)
    const saved = await Usershelper.add(user);
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
});


// api/auth/login --> POST login

router.post("/login", async (req, res, next) => {
  try {
    let { username, password } = req.body;
    const user = await Usershelper.findBy({ username }).first();

    const passwordValid = await bycrypt.compare(password, user.password)

    if (user && passwordValid) {
      res.status(200).json({ message: `Welcome ${user.username}!` });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;