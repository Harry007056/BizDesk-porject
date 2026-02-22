const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startAt: {
      type: Date,
      required: true,
      index: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "confirmed", "completed", "cancelled", "no_show"],
      default: "scheduled",
    },
    notes: {
      type: String,
      default: "",
    },
    cancelledReason: {
      type: String,
      default: "",
    },
    rescheduleCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    priceSnapshot: {
      type: Number,
      required: true,
      min: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

appointmentSchema.index({ business: 1, startAt: 1 });
appointmentSchema.index({ business: 1, staff: 1, startAt: 1 });

module.exports = mongoose.model("Appointment", appointmentSchema);
