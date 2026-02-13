import { useState, useEffect } from "react";

function ProductModal({ isOpen, onClose, onSave, selectedProduct }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
  });

  useEffect(() => {
    if (selectedProduct) {
        setForm({
        name: selectedProduct.name || "",
        price: selectedProduct.price || "",
        });
    } else {
        setForm({
        name: "",
        price: "",
        });
    }
    }, [selectedProduct]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl w-96 shadow-2xl">

        <h2 className="text-2xl font-bold text-[#2872A1] mb-6">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2872A1] outline-none"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2872A1] outline-none"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(form)}
            className="bg-[#2872A1] text-white px-6 py-2 rounded-xl"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
