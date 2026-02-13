import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function BillPreview() {
  const { billId } = useParams();
  const [bill, setBill] = useState(null);
  const invoiceRef = useRef();

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const { data } = await API.get(`/bills/${billId}`);
        setBill(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBill();
  }, [billId]);

  if (!bill) {
    return <div style={{ padding: "40px" }}>Loading...</div>;
  }

  //DOWNLOAD PDF (Exact UI)
  const downloadPDF = async () => {
    const element = invoiceRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`Invoice-${bill.billNumber}.pdf`);
  };

  //PRINT SAME UI
  const printInvoice = () => {
    window.print();
  };

  return (
    <div style={{ backgroundColor: "#ffffff", padding: "40px" }}>

      {/* INVOICE */}
      <div
        ref={invoiceRef}
        className="invoice-container"
        style={{
          maxWidth: "900px",
          margin: "auto",
          backgroundColor: "#ffffff",
          padding: "30px",
          border: "1px solid #000",
          fontFamily: "Arial, sans-serif",
          color: "#000"
        }}
      >

        {/* TITLE */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#2563EB"
          }}
        >
          INVOICE
        </h1>

        {/* COMPANY + BILL INFO */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid #000",
            fontSize: "14px"
          }}
        >
          <div style={{ padding: "15px", width: "50%", borderRight: "1px solid #000" }}>
            <p style={{ fontWeight: "bold", fontSize: "16px" }}>
              {bill.company.companyName}
            </p>
            <p>{bill.company.address}</p>
            <p>Phone: {bill.company.phone}</p>
            <p>GSTIN: {bill.company.gstin || "-"}</p>
          </div>

          <div style={{ padding: "15px", width: "50%" }}>
            <p><strong>Invoice No:</strong> {bill.billNumber}</p>
            <p><strong>Date:</strong> {new Date(bill.createdAt).toLocaleDateString()}</p>
            <p><strong>Customer:</strong> {bill.customerName}</p>
          </div>
        </div>

        {/* TABLE */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            fontSize: "14px"
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#DBEAFE" }}>
              <th style={cellHeader}>SL</th>
              <th style={cellHeader}>Item</th>
              <th style={cellHeader}>Qty</th>
              <th style={cellHeader}>Price</th>
              <th style={cellHeader}>Amount</th>
            </tr>
          </thead>

          <tbody>
            {bill.items.map((item, index) => (
              <tr key={item._id}>
                <td style={cell}>{index + 1}</td>
                <td style={cell}>{item.name}</td>
                <td style={cell}>{item.quantity}</td>
                <td style={cell}>₹ {item.price}</td>
                <td style={cell}>₹ {item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTALS */}
        <div style={{ marginTop: "20px", textAlign: "right", fontSize: "14px" }}>
          <p><strong>Subtotal:</strong> ₹ {bill.subtotal}</p>

          {bill.taxTotal > 0 && (
            <>
              <p>SGST: ₹ {(bill.taxTotal / 2).toFixed(2)}</p>
              <p>CGST: ₹ {(bill.taxTotal / 2).toFixed(2)}</p>
            </>
          )}

          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              borderTop: "1px solid #000",
              paddingTop: "10px",
              marginTop: "10px"
            }}
          >
            TOTAL: ₹ {bill.grandTotal}
          </p>
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: "30px", fontSize: "13px" }}>
          <p style={{ borderTop: "1px solid #000", paddingTop: "10px" }}>
            Declaration: We declare that this invoice shows the actual
            price of the goods described and that all particulars are true and correct.
          </p>

          <p style={{ textAlign: "center", marginTop: "20px", fontWeight: "bold" }}>
            Thank you! Visit Again.
          </p>
        </div>

      </div>

      {/* BUTTONS */}
      <div
        style={{
          textAlign: "center",
          marginTop: "30px"
        }}
        className="print-hide"
      >
        <button
          onClick={downloadPDF}
          style={buttonStyle}
        >
          Download PDF
        </button>

        <button
          onClick={printInvoice}
          style={{
            ...buttonStyle,
            backgroundColor: "#ffffff",
            color: "#2563EB",
            border: "1px solid #2563EB",
            marginLeft: "15px"
          }}
        >
          Print
        </button>
      </div>

    </div>
  );
}

// 🔹 Reusable Styles
const cellHeader = {
  border: "1px solid #000",
  padding: "8px",
  textAlign: "center",
  fontWeight: "bold"
};

const cell = {
  border: "1px solid #000",
  padding: "8px",
  textAlign: "center"
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#2563EB",
  color: "#ffffff",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px"
};

export default BillPreview;
