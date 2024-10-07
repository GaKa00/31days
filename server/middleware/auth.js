const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ error: "Ingen token, tillträde nekas" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Ogiltig token" });
  }
};

module.exports = verifyToken;
