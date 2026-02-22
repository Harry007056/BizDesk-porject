const express = require("express");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const {
  getSubscription,
  updateSubscription,
} = require("../controllers/subscriptionController");

const router = express.Router();

router.use(auth);
router.get("/", authorize("owner", "admin"), getSubscription);
router.put("/", authorize("owner"), updateSubscription);

module.exports = router;
