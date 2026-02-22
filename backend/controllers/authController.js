const asyncHandler = require("../middleware/asyncHandler");
const Business = require("../models/Business");
const User = require("../models/Users");
const Subscription = require("../models/Subscription");
const { signToken } = require("../utils/token");

const normalizeSlug = (input) =>
  input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const buildUniqueSlug = async (businessName) => {
  const base = normalizeSlug(businessName);
  let candidate = base;
  let counter = 1;

  while (await Business.exists({ slug: candidate })) {
    counter += 1;
    candidate = `${base}-${counter}`;
  }

  return candidate;
};

const registerBusiness = asyncHandler(async (req, res) => {
  const {
    businessName,
    industry,
    timezone,
    currency,
    ownerName,
    ownerEmail,
    ownerPassword,
    ownerPhone,
  } = req.body;

  if (!businessName || !ownerName || !ownerEmail || !ownerPassword) {
    return res.status(400).json({
      success: false,
      message:
        "businessName, ownerName, ownerEmail and ownerPassword are required",
    });
  }

  const slug = await buildUniqueSlug(businessName);
  const business = await Business.create({
    name: businessName,
    slug,
    industry: industry || "other",
    timezone: timezone || "UTC",
    currency: currency || "USD",
  });

  const owner = await User.create({
    business: business._id,
    name: ownerName,
    email: ownerEmail,
    password: ownerPassword,
    phone: ownerPhone || "",
    role: "owner",
  });

  business.owner = owner._id;
  await business.save();

  await Subscription.create({
    business: business._id,
    plan: "starter",
    status: "trialing",
    trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    renewalDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  });

  const token = signToken(owner);

  return res.status(201).json({
    success: true,
    message: "Business registered successfully",
    data: {
      token,
      business,
      user: owner,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { businessSlug, email, password } = req.body;

  if (!businessSlug || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "businessSlug, email and password are required",
    });
  }

  const business = await Business.findOne({ slug: businessSlug, status: "active" });
  if (!business) {
    return res
      .status(404)
      .json({ success: false, message: "Business not found or inactive" });
  }

  const user = await User.findOne({
    business: business._id,
    email: email.toLowerCase(),
    isActive: true,
  });

  if (!user || !(await user.comparePassword(password))) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = signToken(user);

  return res.json({
    success: true,
    message: "Logged in successfully",
    data: {
      token,
      user,
      business,
    },
  });
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .select("-password")
    .populate("business", "name slug industry status timezone currency");

  return res.json({
    success: true,
    data: user,
  });
});

module.exports = {
  registerBusiness,
  login,
  getMe,
};
