const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createBill,
  getBills,
  getBillById,
  getDailyBills,
  getMonthlyBills,
  deleteBill
} = require("../controllers/bill.controller");


router.post("/", protect, createBill);
router.get("/", protect, getBills);
router.get("/daily/summary", protect, getDailyBills);
router.get("/monthly/summary", protect, getMonthlyBills);
router.get("/:id", protect, getBillById);
router.delete("/:id", protect, deleteBill);


module.exports = router;
