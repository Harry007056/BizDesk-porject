const asyncHandler = require("../middleware/asyncHandler");
const Appointment = require("../models/Appointment");
const Customer = require("../models/Customer");
const Service = require("../models/Service");
const User = require("../models/Users");

const getOverview = asyncHandler(async (req, res) => {
  const businessId = req.user.businessId;
  const now = new Date();
  const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const [
    totalCustomers,
    totalStaff,
    totalServices,
    totalAppointments,
    todayAppointments,
    upcomingAppointments,
    monthlyRevenueAgg,
  ] = await Promise.all([
    Customer.countDocuments({ business: businessId, isActive: true }),
    User.countDocuments({
      business: businessId,
      role: { $in: ["admin", "staff"] },
      isActive: true,
    }),
    Service.countDocuments({ business: businessId, isActive: true }),
    Appointment.countDocuments({ business: businessId }),
    Appointment.countDocuments({
      business: businessId,
      startAt: { $gte: dayStart, $lt: dayEnd },
    }),
    Appointment.countDocuments({
      business: businessId,
      startAt: { $gte: now },
      status: { $in: ["scheduled", "confirmed"] },
    }),
    Appointment.aggregate([
      {
        $match: {
          business: businessId,
          status: "completed",
          startAt: { $gte: monthStart, $lt: nextMonthStart },
        },
      },
      { $group: { _id: null, revenue: { $sum: "$priceSnapshot" } } },
    ]),
  ]);

  const monthlyRevenue = monthlyRevenueAgg[0]?.revenue || 0;

  return res.json({
    success: true,
    data: {
      totals: {
        customers: totalCustomers,
        staff: totalStaff,
        services: totalServices,
        appointments: totalAppointments,
      },
      todayAppointments,
      upcomingAppointments,
      monthlyRevenue,
      generatedAt: now.toISOString(),
    },
  });
});

module.exports = {
  getOverview,
};
