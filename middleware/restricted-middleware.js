//Checks if a user's session is valid

module.exports = () => {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res
        .status(401)
        .json({ message: "Invalid credientials, you will not pass " });
    }

    next();
  };
};
