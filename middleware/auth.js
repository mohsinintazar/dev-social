const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if token doesn't exist
  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token found, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ errors: [{ msg: "Token is not valid." }] });
  }
};
