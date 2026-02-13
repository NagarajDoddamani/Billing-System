# 🧾 Billing System (MERN Stack)

A full-featured web-based billing and company management system built using the MERN stack.  
This application allows users to create companies, manage products, generate invoices, track daily & monthly sales, and download or print professional invoices.

---

## 🚀 Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- Recharts (Sales Graph)
- html2canvas
- jsPDF

Backend:
- Node.js
- Express.js
- JWT Authentication

Database:
- MongoDB Atlas
- Mongoose ODM

---

## ✨ Features

### 🔐 Authentication
- User Registration
- User Login
- JWT-based Protected Routes
- Secure API Access

---

### 🏢 Company Management
- Create Company
- Edit Company
- Delete Company
- Store Company Information (Name, Address, GSTIN, Phone)

---

### 📦 Product Management
- Add Products
- Edit Products
- Delete Products (with confirmation modal)
- Product Search
- Product Pricing & Tax Configuration

---

### 🧾 Billing System
- Create Invoice using saved products
- Optional GST (SGST + CGST)
- Automatic Bill Number Generation
- Real-time Subtotal, Tax & Grand Total Calculation
- Save Bills in Database
- View Bill Preview
- Delete Bills (safe deletion with item cleanup)

---

### 📄 Invoice Features
- Professional GST Invoice Layout
- Download Invoice as PDF
- Print Invoice (clean print mode)
- Exact UI-to-PDF rendering

---

### 📊 Dashboard & Analytics
- Today's Sales
- Today's Bills Count
- Monthly Sales
- Monthly Bills Count
- Monthly Sales Graph (Daily Breakdown)
- Business Overview Insights

