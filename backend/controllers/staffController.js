const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/Users");

const listStaff = asyncHandler(async (req, res) => {
  const staff = await User.find({
    business: req.user.businessId,
    role: { $in: ["admin", "staff"] },
    isActive: true,
  }).select("-password");

  return res.json({ success: true, data: staff });
});

const createStaff = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "name, email and password are required",
    });
  }

  const normalizedRole = role === "admin" ? "admin" : "staff";
  const user = await User.create({
    business: req.user.businessId,
    name,
    email,
    password,
    phone: phone || "",
    role: normalizedRole,
  });

  return res.status(201).json({ success: true, data: user });
});

const updateStaff = asyncHandler(async (req, res) => {
  const { staffId } = req.params;
  const { name, phone, role, isActive } = req.body;

  const staff = await User.findOne({
    _id: staffId,
    business: req.user.businessId,
    role: { $in: ["admin", "staff"] },
  });

  if (!staff) {
    return res.status(404).json({ success: false, message: "Staff not found" });
  }

  if (typeof name === "string") staff.name = name;
  if (typeof phone === "string") staff.phone = phone;
  if (role === "admin" || role === "staff") staff.role = role;
  if (typeof isActive === "boolean") staff.isActive = isActive;

  await staff.save();

  return res.json({ success: true, data: staff });
});

const removeStaff = asyncHandler(async (req, res) => {
  const { staffId } = req.params;

  const staff = await User.findOneAndUpdate(
    {
      _id: staffId,
      business: req.user.businessId,
      role: { $in: ["admin", "staff"] },
    },
    { isActive: false },
    { new: true }
  ).select("-password");

  if (!staff) {
    return res.status(404).json({ success: false, message: "Staff not found" });
  }

  return res.json({ success: true, message: "Staff deactivated", data: staff });
});

module.exports = {
  listStaff,
  createStaff,
  updateStaff,
  removeStaff,
};
