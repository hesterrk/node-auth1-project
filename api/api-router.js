const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');


//Contains my sub-routes of the /api prefix 
//1. users router
//2. authentication router

// api/auth
router.use('/auth', authRouter);
// api/users
router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.json({ api: "It's alive" });
});

router.get('/auth', (req, res) => {
  res.json({ auth: "It's alive" });
});


module.exports = router;