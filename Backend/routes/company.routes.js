const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
  getCompanyById
} = require("../controllers/company.controller");

router.post("/", protect, createCompany);
router.get("/", protect, getCompanies);
router.put("/:id", protect, updateCompany);
router.delete("/:id", protect, deleteCompany);
router.get("/:id", protect, getCompanyById);


module.exports = router;
