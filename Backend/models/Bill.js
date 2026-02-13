const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },
    billNumber: {
      type: String,
      required: true
    },
    customerName: String,
    applyTax: {
      type: Boolean,
      default: false
    },
    subtotal: Number,
    taxTotal: Number,
    grandTotal: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", billSchema);
