const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    companyName: {
      type: String,
      required: true
    },
    address: String,
    phone: String,
    logo: String,
    footerNote: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
