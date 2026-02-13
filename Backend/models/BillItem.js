const mongoose = require("mongoose");

const billItemSchema = new mongoose.Schema(
  {
    billId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bill",
      required: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    name: String,
    quantity: Number,
    price: Number,
    taxRate: Number,
    subtotal: Number,
    taxAmount: Number,
    total: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("BillItem", billItemSchema);
