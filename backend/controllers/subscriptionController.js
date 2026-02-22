const asyncHandler = require("../middleware/asyncHandler");
const Subscription = require("../models/Subscription");

const getSubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findOne({ business: req.user.businessId });
  return res.json({ success: true, data: subscription });
});

const updateSubscription = asyncHandler(async (req, res) => {
  const { plan, status, seats, renewalDate, trialEndsAt, paymentProvider } = req.body;

  const subscription = await Subscription.findOneAndUpdate(
    { business: req.user.businessId },
    {
      ...(plan ? { plan } : {}),
      ...(status ? { status } : {}),
      ...(typeof seats === "number" ? { seats } : {}),
      ...(renewalDate ? { renewalDate: new Date(renewalDate) } : {}),
      ...(trialEndsAt ? { trialEndsAt: new Date(trialEndsAt) } : {}),
      ...(paymentProvider ? { paymentProvider } : {}),
    },
    { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: true }
  );

  return res.json({
    success: true,
    message: "Subscription updated",
    data: subscription,
  });
});

module.exports = {
  getSubscription,
  updateSubscription,
};
