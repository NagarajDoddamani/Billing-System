import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import CompanyDashboard from "./pages/companyDashboard";
import Products from "./pages/Products";
import Bills from "./pages/Bills";
import CreateBill from "./pages/CreateBill";
import Register from "./pages/Register";
import UserDashboard from "./pages/userDashboard";
import UserLayout from "./layout/MainLayout";
import BillPreview from "./components/BillPreview";

function PrivateRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route
          element={
            <PrivateRoute>
              <UserLayout />
            </PrivateRoute>
          }
        >
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/companydashboard" element={<CompanyDashboard />} />
          <Route path="/companydashboard/products" element={<Products />} />
          <Route path="/companydashboard/bills" element={<Bills />} />
          <Route path="/companydashboard/createbill" element={<CreateBill />} />
          <Route path="/companydashboard/billpreview/:billId" element={<BillPreview />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
