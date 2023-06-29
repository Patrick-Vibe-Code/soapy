const crypto = require("crypto");
const validTokens = require("../tokenStore");

const checkPassword = (req, res) => {
  const userPassword = req.body.password;
  if (userPassword && userPassword === process.env.PASSWORD) {
    const token = crypto.randomBytes(32).toString("hex");
    validTokens.add(token);
    res.json({ status: "Correct", token });
  } else {
    res.status(401).json({ status: "Incorrect" });
  }
};

module.exports = checkPassword;
