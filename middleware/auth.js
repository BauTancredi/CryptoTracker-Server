const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Read headers token
  const token = req.header("x-auth-token");

  if (!token)
    return res
      .status(401)
      .json({ msg: "Permission not valid. Generate a token." });

  // Validate token
  try {
    const cifrate = jwt.verify(token, process.env.SECRET);
    req.user = cifrate.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token not valid" });
  }
};
