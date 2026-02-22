const express = require("express");
const auth = require("../middleware/auth");
const {
  listAppointments,
  createAppointment,
  updateAppointmentStatus,
  rescheduleAppointment,
} = require("../controllers/appointmentController");

const router = express.Router();

router.use(auth);
router.get("/", listAppointments);
router.post("/", createAppointment);
router.patch("/:appointmentId/status", updateAppointmentStatus);
router.patch("/:appointmentId/reschedule", rescheduleAppointment);

module.exports = router;
