const jwt = require("jsonwebtoken");

const signToken = (user) => {
  const payload = {
    sub: user._id,
    businessId: user.business,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

module.exports = { signToken };
