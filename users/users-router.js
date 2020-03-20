const bycrypt = require("bcryptjs")
const router = require("express").Router();

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



//Local Middleware function that authorises user based on user and password based on req.headers for our Login endpoint: api/auth/login 
//MOVE THIS INTO middelware folder and file and export to user route
//UPDATE SO IT CHECKS FOR SESSION INSTEAD OF USERNAME AND PASSWORD


function restricted() {
  const authError = {
    message: "Invalid credientials, you will not pass "
  };

  return async(req,res,next) => {
    try {
      //1. get values from headers

      const { username, password } = req.headers
      //2. validate these 2 to check they exist, whether the data is correct 
      if(!username || !password ) {
        return res.status(401).json(authError)
      } 
        //3. looking for user in database
        const user = await Userhelper.findBy({ username }).first();
        //another check to make sure user we found exists in our database
        if(!user) {
          return res.status(401).json(authError)
        }
        const passwordValid = await bycrypt.compare(password, user.password)
        if(!passwordValid) {
          return res.status(401).json(authError)
        }

        next()

    } catch(error) {
      next(error)
    }
  }
}

module.exports = router;