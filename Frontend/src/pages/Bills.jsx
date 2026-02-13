import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import DeleteModal from "../components/DeleteModal";

function Bills() {
  const navigate = useNavigate();
  const companyId = localStorage.getItem("companyId");

  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");
  const [dailySummary, setDailySummary] = useState(null);
  const [monthlySummary, setMonthlySummary] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Fetch All Bills
  const fetchBills = async () => {
    try {
      const { data } = await API.get(
        `/bills?companyId=${companyId}`
      );
      setBills(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch Daily Summary
  const fetchDaily = async () => {
    try {
      const { data } = await API.get(
        `/bills/daily/summary?companyId=${companyId}`
      );
      setDailySummary(data);
      setBills(data.bills);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch Monthly Summary
  const fetchMonthly = async () => {
    try {
      const { data } = await API.get(
        `/bills/monthly/summary?companyId=${companyId}`
      );
      setMonthlySummary(data);
      setBills(data.bills);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBills();
    fetchDaily();
    fetchMonthly();
  }, []);

  // Delete Bill
  const confirmDelete = async () => {
    try {
      await API.delete(`/bills/${deleteTarget._id}`);
      setDeleteTarget(null);
      fetchBills();
    } catch (error) {
      console.error(error);
    }
  };

  // Search Filter
  const filteredBills = bills.filter(
    (bill) =>
      bill.billNumber.toLowerCase().includes(search.toLowerCase()) ||
      (bill.customerName &&
        bill.customerName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ padding: "30px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
          Bills Management
        </h1>

        <button
          onClick={() => navigate("/companydashboard/createbill")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2563EB",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          + Create Bill
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

        <div style={cardStyle}>
          <p>Today Sales</p>
          <h3>₹ {dailySummary?.totalSales || 0}</h3>
        </div>

        <div style={cardStyle}>
          <p>Monthly Sales</p>
          <h3>₹ {monthlySummary?.totalSales || 0}</h3>
        </div>

        <div style={cardStyle}>
          <p>Today Bills</p>
          <h3>{dailySummary?.count || 0}</h3>
        </div>

        <div style={cardStyle}>
          <p>Monthly Bills</p>
          <h3>{monthlySummary?.count || 0}</h3>
        </div>

      </div>

      {/* Filters */}
      <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
        <input
          type="text"
          placeholder="Search by Bill No or Customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />

        <button onClick={fetchBills} style={filterButton}>
          All
        </button>

        <button onClick={fetchDaily} style={filterButton}>
          Today
        </button>

        <button onClick={fetchMonthly} style={filterButton}>
          Month
        </button>
      </div>

      {/* Bills Table */}
      <table
        style={{
          width: "100%",
          marginTop: "30px",
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#E5E7EB" }}>
            <th style={th}>Bill No</th>
            <th style={th}>Date</th>
            <th style={th}>Customer</th>
            <th style={th}>Subtotal</th>
            <th style={th}>Tax</th>
            <th style={th}>Total</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredBills.map((bill) => (
            <tr key={bill._id}>
              <td style={td}>{bill.billNumber}</td>
              <td style={td}>
                {new Date(bill.createdAt).toLocaleDateString()}
              </td>
              <td style={td}>{bill.customerName}</td>
              <td style={td}>₹ {bill.subtotal}</td>
              <td style={td}>₹ {bill.taxTotal}</td>
              <td style={td}>
                <strong>₹ {bill.grandTotal}</strong>
              </td>
              <td style={td}>
                <button
                  onClick={() =>
                    navigate(`/companydashboard/billpreview/${bill._id}`)
                  }
                  style={actionButton}
                >
                  View
                </button>

                <button
                  onClick={() => setDeleteTarget(bill)}
                  style={{
                    ...actionButton,
                    backgroundColor: "#DC2626",
                    marginLeft: "8px"
                  }}
                >
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

        <DeleteModal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
          title="Delete Bill"
          message={`Are you sure you want to delete ${deleteTarget?.billNumber}?`}
        />
    </div>
  );

}


// Styles
const cardStyle = {
  flex: 1,
  padding: "20px",
  backgroundColor: "#ffffff",
  border: "1px solid #ddd",
  borderRadius: "6px",
  textAlign: "center"
};

const th = {
  border: "1px solid #ccc",
  padding: "10px",
  fontWeight: "bold"
};

const td = {
  border: "1px solid #ccc",
  padding: "10px",
  textAlign: "center"
};

const filterButton = {
  padding: "8px 15px",
  backgroundColor: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

const actionButton = {
  padding: "6px 10px",
  backgroundColor: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

export default Bills;
