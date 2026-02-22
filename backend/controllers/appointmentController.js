const asyncHandler = require("../middleware/asyncHandler");
const Appointment = require("../models/Appointment");
const Customer = require("../models/Customer");
const Service = require("../models/Service");
const User = require("../models/Users");

const listAppointments = asyncHandler(async (req, res) => {
  const { from, to, status } = req.query;
  const filter = { business: req.user.businessId };

  if (status) filter.status = status;
  if (from || to) {
    filter.startAt = {};
    if (from) filter.startAt.$gte = new Date(from);
    if (to) filter.startAt.$lte = new Date(to);
  }

  const appointments = await Appointment.find(filter)
    .populate("service", "name durationMin price")
    .populate("customer", "name email phone")
    .populate("staff", "name email role")
    .sort({ startAt: 1 });

  return res.json({ success: true, data: appointments });
});

const hasConflict = async ({ businessId, staffId, startAt, endAt, excludeId }) => {
  const query = {
    business: businessId,
    staff: staffId,
    status: { $in: ["scheduled", "confirmed"] },
    startAt: { $lt: endAt },
    endAt: { $gt: startAt },
  };

  if (excludeId) query._id = { $ne: excludeId };
  return Appointment.exists(query);
};

const createAppointment = asyncHandler(async (req, res) => {
  const { serviceId, customerId, staffId, startAt, notes } = req.body;

  if (!serviceId || !customerId || !staffId || !startAt) {
    return res.status(400).json({
      success: false,
      message: "serviceId, customerId, staffId and startAt are required",
    });
  }

  const [service, customer, staff] = await Promise.all([
    Service.findOne({ _id: serviceId, business: req.user.businessId, isActive: true }),
    Customer.findOne({
      _id: customerId,
      business: req.user.businessId,
      isActive: true,
    }),
    User.findOne({ _id: staffId, business: req.user.businessId, isActive: true }),
  ]);

  if (!service || !customer || !staff) {
    return res.status(404).json({
      success: false,
      message: "Service, customer, or staff not found in this business",
    });
  }

  const start = new Date(startAt);
  const end = new Date(start.getTime() + service.durationMin * 60000);

  const conflict = await hasConflict({
    businessId: req.user.businessId,
    staffId,
    startAt: start,
    endAt: end,
  });

  if (conflict) {
    return res.status(409).json({
      success: false,
      message: "Staff already has an appointment in this time slot",
    });
  }

  const appointment = await Appointment.create({
    business: req.user.businessId,
    service: service._id,
    customer: customer._id,
    staff: staff._id,
    startAt: start,
    endAt: end,
    notes: notes || "",
    priceSnapshot: service.price,
    createdBy: req.user.id,
  });

  return res.status(201).json({ success: true, data: appointment });
});

const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;
  const { status, cancelledReason } = req.body;

  const allowedStatuses = [
    "scheduled",
    "confirmed",
    "completed",
    "cancelled",
    "no_show",
  ];
  if (!allowedStatuses.includes(status)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid appointment status" });
  }

  const appointment = await Appointment.findOne({
    _id: appointmentId,
    business: req.user.businessId,
  });

  if (!appointment) {
    return res
      .status(404)
      .json({ success: false, message: "Appointment not found" });
  }

  appointment.status = status;
  if (status === "cancelled") {
    appointment.cancelledReason = cancelledReason || "Cancelled";
  }
  await appointment.save();

  if (status === "completed") {
    await Customer.findOneAndUpdate(
      { _id: appointment.customer, business: req.user.businessId },
      { $inc: { totalVisits: 1 }, $set: { lastVisitAt: new Date() } }
    );
  }

  return res.json({ success: true, data: appointment });
});

const rescheduleAppointment = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;
  const { startAt } = req.body;

  if (!startAt) {
    return res.status(400).json({ success: false, message: "startAt is required" });
  }

  const appointment = await Appointment.findOne({
    _id: appointmentId,
    business: req.user.businessId,
  }).populate("service", "durationMin");

  if (!appointment) {
    return res
      .status(404)
      .json({ success: false, message: "Appointment not found" });
  }

  const newStart = new Date(startAt);
  const newEnd = new Date(newStart.getTime() + appointment.service.durationMin * 60000);

  const conflict = await hasConflict({
    businessId: req.user.businessId,
    staffId: appointment.staff,
    startAt: newStart,
    endAt: newEnd,
    excludeId: appointment._id,
  });

  if (conflict) {
    return res.status(409).json({
      success: false,
      message: "Staff already has an appointment in this time slot",
    });
  }

  appointment.startAt = newStart;
  appointment.endAt = newEnd;
  appointment.rescheduleCount += 1;
  appointment.status = "scheduled";
  await appointment.save();

  return res.json({ success: true, data: appointment });
});

module.exports = {
  listAppointments,
  createAppointment,
  updateAppointmentStatus,
  rescheduleAppointment,
};
