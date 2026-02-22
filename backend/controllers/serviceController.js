const asyncHandler = require("../middleware/asyncHandler");
const Service = require("../models/Service");

const listServices = asyncHandler(async (req, res) => {
  const services = await Service.find({
    business: req.user.businessId,
    isActive: true,
  }).sort({ createdAt: -1 });

  return res.json({ success: true, data: services });
});

const createService = asyncHandler(async (req, res) => {
  const { name, description, category, durationMin, price, currency, isActive } =
    req.body;

  if (!name || !durationMin || price === undefined) {
    return res.status(400).json({
      success: false,
      message: "name, durationMin and price are required",
    });
  }

  const service = await Service.create({
    business: req.user.businessId,
    name,
    description: description || "",
    category: category || "general",
    durationMin,
    price,
    currency: currency || "USD",
    isActive: typeof isActive === "boolean" ? isActive : true,
    createdBy: req.user.id,
  });

  return res.status(201).json({ success: true, data: service });
});

const updateService = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;
  const service = await Service.findOneAndUpdate(
    { _id: serviceId, business: req.user.businessId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!service) {
    return res.status(404).json({ success: false, message: "Service not found" });
  }

  return res.json({ success: true, data: service });
});

const removeService = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;
  const service = await Service.findOneAndUpdate(
    { _id: serviceId, business: req.user.businessId },
    { isActive: false },
    { new: true }
  );

  if (!service) {
    return res.status(404).json({ success: false, message: "Service not found" });
  }

  return res.json({ success: true, message: "Service archived", data: service });
});

module.exports = {
  listServices,
  createService,
  updateService,
  removeService,
};
