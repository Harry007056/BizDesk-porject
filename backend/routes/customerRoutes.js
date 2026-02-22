const express = require("express");
const auth = require("../middleware/auth");
const {
  listCustomers,
  createCustomer,
  updateCustomer,
  removeCustomer,
} = require("../controllers/customerController");

const router = express.Router();

router.use(auth);
router.get("/", listCustomers);
router.post("/", createCustomer);
router.patch("/:customerId", updateCustomer);
router.delete("/:customerId", removeCustomer);

module.exports = router;
