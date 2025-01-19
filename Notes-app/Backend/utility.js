const jwt = require("jsonwebtoken");

function authenticatetoken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: "Invalid token." });
    if (!user._id)
      return res.status(401).json({ message: "Invalid token payload." });

    req.user = user; // Set the user object to req
    // console.log("Token is valid:", req.user); // Log to confirm
    next();
  });
}

module.exports = authenticatetoken;
