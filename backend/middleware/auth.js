const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : null;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.sub).select("-password");

    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.user = {
      id: user._id,
      businessId: user.business,
      role: user.role,
      email: user.email,
      name: user.name,
    };

    return next();
  } catch (_error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = auth;
