import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateBill() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [applyTax, setApplyTax] = useState(false);

  const companyId = localStorage.getItem("companyId");

  // Fetch products of company
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get(
          `/products?companyId=${companyId}`
        );
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [companyId]);

  // Add product to bill
  const addProduct = (product) => {
    const exists = selectedItems.find(
      (item) => item.productId === product._id
    );

    if (exists) return;

    setSelectedItems([
      ...selectedItems,
      {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        taxRate: 18, // default GST 18%
      },
    ]);
  };

  // Update quantity
  const updateQuantity = (productId, qty) => {
    setSelectedItems(
      selectedItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Number(qty) }
          : item
      )
    );
  };

  // Remove item
  const removeItem = (productId) => {
    setSelectedItems(
      selectedItems.filter(
        (item) => item.productId !== productId
      )
    );
  };

  // Calculate totals
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const taxTotal = applyTax
    ? selectedItems.reduce(
        (sum, item) =>
          sum +
          ((item.price * item.quantity * item.taxRate) / 100),
        0
      )
    : 0;

  const grandTotal = subtotal + taxTotal;

  // Generate Bill
  const generateBill = async () => {
    if (!customerName || selectedItems.length === 0) {
      alert("Please enter customer name and add products.");
      return;
    }

    try {
      const { data } = await API.post("/bills", {
        companyId,
        customerName,
        applyTax,
        items: selectedItems,
      });

      // Redirect to preview page
      navigate(`/companydashboard/billpreview/${data._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      <h1 className="text-4xl font-bold text-[#2872A1] mb-10">
        Create Bill
      </h1>

      {/* Customer Name */}
      <input
        type="text"
        placeholder="Customer Name"
        className="w-full mb-6 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2872A1] outline-none"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />

      {/* Apply Tax */}
      <div className="mb-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={applyTax}
            onChange={() => setApplyTax(!applyTax)}
          />
          Apply GST (SGST + CGST)
        </label>
      </div>

      {/* Product Selection */}
      <h2 className="text-xl font-semibold mb-4">
        Select Products
      </h2>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {products.map((product) => (
          <button
            key={product._id}
            onClick={() => addProduct(product)}
            className="border p-4 rounded-xl hover:bg-[#2872A1] hover:text-white transition"
          >
            {product.name} — ₹{product.price}
          </button>
        ))}
      </div>

      {/* Selected Items */}
      <h2 className="text-xl font-semibold mb-4">
        Bill Items
      </h2>

      <div className="space-y-4">
        {selectedItems.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between items-center bg-[#F4F8FB] p-4 rounded-xl"
          >
            <span>{item.name}</span>

            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.productId, e.target.value)
              }
              className="w-20 px-2 py-1 border rounded"
            />

            <span>
              ₹ {item.price * item.quantity}
            </span>

            <button
              onClick={() => removeItem(item.productId)}
              className="text-red-500"
            >
              clear
            </button>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="mt-8 text-right space-y-2">
        <p>Subtotal: ₹ {subtotal}</p>
        {applyTax && <p>Tax: ₹ {taxTotal}</p>}
        <p className="text-2xl font-bold text-[#2872A1]">
          Total: ₹ {grandTotal}
        </p>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateBill}
        className="bg-[#2872A1] text-white px-8 py-3 rounded-xl mt-8"
      >
        Generate Bill
      </button>

    </div>
  );
}

export default CreateBill;
