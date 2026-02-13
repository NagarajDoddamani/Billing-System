import { useState, useEffect } from "react";

function CompanyModal({ isOpen, onClose, onSave, selectedCompany }) {
  const [form, setForm] = useState({
    companyName: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (selectedCompany) {
      setForm({
        companyName: selectedCompany.companyName || "",
        address: selectedCompany.address || "",
        phone: selectedCompany.phone || "",
      });
    } else {
      setForm({
        companyName: "",
        address: "",
        phone: "",
      });
    }
  }, [selectedCompany]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#2872A1] flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl w-96 shadow-2xl">

        <h2 className="text-xl font-bold text-[#2872A1] mb-6">
          {selectedCompany ? "Edit Company" : "Create Company"}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Company Name"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2872A1] outline-none"
            value={form.companyName}
            onChange={(e) =>
              setForm({ ...form, companyName: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Address"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2872A1] outline-none"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2872A1] outline-none"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 bg-[#2872A1] text-white rounded-lg hover:opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyModal;
