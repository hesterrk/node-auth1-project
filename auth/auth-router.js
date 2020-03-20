const express = require("express");

const router = express.Router({
    mergeParams: true
  });
const Usershelper = require("../users/users-model.js");

const bcrypt = require("bcryptjs");
const restricted = require("../middleware/restricted-middleware")


// /api/auth/register   -->POST register
router.post("/register", async (req, res, next) => {
  try {
    let user = req.body;
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

    const passwordValid = await bcrypt.compare(password, user.password)

    if (user && passwordValid) {
      req.session.user = user;
      res.status(200).json({ message: `Welcome ${user.username}!` });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    next(error);
  }
});

//Our protected route:  

router.get("/protected", restricted(), async (req, res, next) => {
  try {
    res.json({
      message: "You are Authorised"
    });
  } catch (error) {
    next(error);
  }
});

//Log-Out 
router.get("/logout", restricted(), (req, res, next) => {
  req.session.destroy((err) => {
    if(err) {
      next(err)
    } else {
      res.json({
        message: "You are logged out successfully"
      })
    }
  })
})






module.exports = router;