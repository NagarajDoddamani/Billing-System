const Company = require("../models/company");

// Create Company
exports.createCompany = async (req, res) => {
  try {
    const { companyName, address, phone, logo, footerNote } = req.body;

    const company = await Company.create({
      userId: req.user._id,
      companyName,
      address,
      phone,
      logo,
      footerNote
    });

    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompanyById = async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }

  res.json(company);
};

// Get User Companies
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ userId: req.user._id });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCompany = async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }

  company.companyName = req.body.companyName;
  company.address = req.body.address;
  company.phone = req.body.phone;

  const updated = await company.save();
  res.json(updated);
};

exports.deleteCompany = async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }

  await company.deleteOne();
  res.json({ message: "Company deleted" });
};
