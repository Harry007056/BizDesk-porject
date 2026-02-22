const express = require("express");
const authRoutes = require("./authRoutes");
const staffRoutes = require("./staffRoutes");
const customerRoutes = require("./customerRoutes");
const serviceRoutes = require("./serviceRoutes");
const appointmentRoutes = require("./appointmentRoutes");
const subscriptionRoutes = require("./subscriptionRoutes");
const dashboardRoutes = require("./dashboardRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/staff", staffRoutes);
router.use("/customers", customerRoutes);
router.use("/services", serviceRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/subscription", subscriptionRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
