const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct
} = require("../controllers/product.controller");

router.post("/", protect, createProduct);
router.get("/", protect, getProducts);
router.delete("/:id", protect, deleteProduct);
router.put("/:id", protect, updateProduct);

module.exports = router;
