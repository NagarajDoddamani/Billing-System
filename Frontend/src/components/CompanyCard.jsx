function CompanyCard({ company, onEnter, onEdit, onDelete }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
      <h3 className="text-xl font-bold text-[#2872A1] mb-2">
        {company.companyName}
      </h3>

      <p className="text-gray-600">{company.address}</p>
      <p className="text-gray-500 text-sm mb-6">{company.phone}</p>

      <div className="flex gap-3">
        <button
          onClick={() => onEnter(company._id)}
          className="bg-[#2872A1] text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          Enter
        </button>

        <button
          onClick={() => onEdit(company)}
          className="border border-[#2872A1] text-[#2872A1] px-4 py-2 rounded-lg hover:bg-[#2872A1] hover:text-white transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(company)}
          className="border border-red-400 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CompanyCard;
