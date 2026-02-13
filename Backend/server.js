const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const protect = require("./middleware/authMiddleware");
const companyRoutes = require("./routes/company.routes");
const productRoutes = require("./routes/product.routes");
const billRoutes = require("./routes/bill.routes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/products", productRoutes);
app.use("/api/bills", billRoutes);

console.log("Auth routes loaded");

app.get("/", (req, res) => {
  res.send("Billing API Running");
});

app.get("/api/protected", protect, (req, res) => {
  res.json({ message: "You are authorized", user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
