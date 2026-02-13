const Product = require("../models/Product");

// Add Product
exports.createProduct = async (req, res) => {
  try {
    const { companyId, name, price, taxRate } = req.body;

    const product = await Product.create({
      companyId,
      name,
      price,
      taxRate
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Products (with search)
exports.getProducts = async (req, res) => {
  try {
    const { companyId, search } = req.query;

    let query = { companyId, isActive: true };

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product (Soft Delete)
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, {
      isActive: false
    });

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.name = req.body.name;
  product.price = req.body.price;

  const updated = await product.save();

  res.json(updated);
};
