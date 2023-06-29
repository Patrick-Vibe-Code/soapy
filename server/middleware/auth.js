const validTokens = require("../tokenStore");

const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth && auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token || !validTokens.has(token)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

module.exports = authMiddleware;
