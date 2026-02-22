const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      unique: true,
      index: true,
    },
    plan: {
      type: String,
      enum: ["starter", "growth", "scale", "enterprise"],
      default: "starter",
    },
    status: {
      type: String,
      enum: ["trialing", "active", "past_due", "cancelled"],
      default: "trialing",
    },
    trialEndsAt: Date,
    renewalDate: Date,
    seats: {
      type: Number,
      default: 1,
      min: 1,
    },
    paymentProvider: {
      type: String,
      default: "manual",
    },
    providerCustomerId: {
      type: String,
      default: "",
    },
    features: {
      maxStaff: { type: Number, default: 3 },
      maxAppointmentsPerMonth: { type: Number, default: 500 },
      analyticsEnabled: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
