const express = require("express");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const {
  listServices,
  createService,
  updateService,
  removeService,
} = require("../controllers/serviceController");

const router = express.Router();

router.use(auth);
router.get("/", listServices);
router.post("/", authorize("owner", "admin"), createService);
router.patch("/:serviceId", authorize("owner", "admin"), updateService);
router.delete("/:serviceId", authorize("owner", "admin"), removeService);

module.exports = router;
