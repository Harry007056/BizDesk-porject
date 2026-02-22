const express = require("express");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const {
  listStaff,
  createStaff,
  updateStaff,
  removeStaff,
} = require("../controllers/staffController");

const router = express.Router();

router.use(auth);
router.get("/", listStaff);
router.post("/", authorize("owner", "admin"), createStaff);
router.patch("/:staffId", authorize("owner", "admin"), updateStaff);
router.delete("/:staffId", authorize("owner", "admin"), removeStaff);

module.exports = router;
