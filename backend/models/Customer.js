const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    totalVisits: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastVisitAt: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

customerSchema.index(
  { business: 1, email: 1 },
  { unique: true, partialFilterExpression: { email: { $type: "string", $ne: "" } } }
);

module.exports = mongoose.model("Customer", customerSchema);
