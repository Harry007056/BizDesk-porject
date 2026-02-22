const express = require("express");
const auth = require("../middleware/auth");
const { getOverview } = require("../controllers/dashboardController");

const router = express.Router();

router.use(auth);
router.get("/overview", getOverview);

module.exports = router;
