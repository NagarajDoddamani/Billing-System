const Bill = require("../models/Bill");
const BillItem = require("../models/BillItem");
const Company = require("../models/company");

// Create Bill
exports.createBill = async (req, res) => {
  try {
    const { companyId, customerName, applyTax, items } = req.body;

    let subtotal = 0;
    let taxTotal = 0;

    const billNumber = "INV-" + Date.now();

    const bill = await Bill.create({
      companyId,
      billNumber,
      customerName,
      applyTax
    });

    for (let item of items) {
      const itemSubtotal = item.quantity * item.price;
      const itemTax = applyTax ? (itemSubtotal * item.taxRate) / 100 : 0;

      subtotal += itemSubtotal;
      taxTotal += itemTax;

      await BillItem.create({
        billId: bill._id,
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        taxRate: item.taxRate,
        subtotal: itemSubtotal,
        taxAmount: itemTax,
        total: itemSubtotal + itemTax
      });
    }

    bill.subtotal = subtotal;
    bill.taxTotal = taxTotal;
    bill.grandTotal = subtotal + taxTotal;

    await bill.save();

    res.status(201).json(bill);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Bills
exports.getBills = async (req, res) => {
  try {
    const { companyId } = req.query;
    const bills = await Bill.find({ companyId }).sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    const items = await BillItem.find({ billId: bill._id });

    const company = await Company.findById(bill.companyId);

    res.json({
      ...bill._doc,
      items,
      company
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Daily Summary
exports.getDailyBills = async (req, res) => {
  try {
    const { companyId } = req.query;

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const bills = await Bill.find({
      companyId,
      createdAt: { $gte: start, $lte: end }
    });

    const totalSales = bills.reduce((sum, bill) => sum + bill.grandTotal, 0);

    res.json({
      count: bills.length,
      totalSales,
      bills
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Monthly Summary
exports.getMonthlyBills = async (req, res) => {
  try {
    const { companyId } = req.query;

    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const bills = await Bill.find({
      companyId,
      createdAt: { $gte: start, $lte: end }
    });

    const totalSales = bills.reduce((sum, bill) => sum + bill.grandTotal, 0);

    res.json({
      count: bills.length,
      totalSales,
      bills
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Bill
exports.deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    // Delete related bill items first
    await BillItem.deleteMany({ billId: bill._id });

    // Delete bill
    await Bill.findByIdAndDelete(req.params.id);

    res.json({ message: "Bill deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
