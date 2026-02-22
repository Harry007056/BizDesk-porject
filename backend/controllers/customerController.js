const asyncHandler = require("../middleware/asyncHandler");
const Customer = require("../models/Customer");

const listCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({
    business: req.user.businessId,
    isActive: true,
  }).sort({ createdAt: -1 });

  return res.json({ success: true, data: customers });
});

const createCustomer = asyncHandler(async (req, res) => {
  const { name, email, phone, notes, tags } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "name is required" });
  }

  const customer = await Customer.create({
    business: req.user.businessId,
    name,
    email: email || "",
    phone: phone || "",
    notes: notes || "",
    tags: Array.isArray(tags) ? tags : [],
  });

  return res.status(201).json({ success: true, data: customer });
});

const updateCustomer = asyncHandler(async (req, res) => {
  const { customerId } = req.params;
  const updates = req.body;

  const customer = await Customer.findOneAndUpdate(
    { _id: customerId, business: req.user.businessId },
    updates,
    { new: true, runValidators: true }
  );

  if (!customer) {
    return res
      .status(404)
      .json({ success: false, message: "Customer not found" });
  }

  return res.json({ success: true, data: customer });
});

const removeCustomer = asyncHandler(async (req, res) => {
  const { customerId } = req.params;

  const customer = await Customer.findOneAndUpdate(
    { _id: customerId, business: req.user.businessId },
    { isActive: false },
    { new: true }
  );

  if (!customer) {
    return res
      .status(404)
      .json({ success: false, message: "Customer not found" });
  }

  return res.json({ success: true, message: "Customer archived", data: customer });
});

module.exports = {
  listCustomers,
  createCustomer,
  updateCustomer,
  removeCustomer,
};
