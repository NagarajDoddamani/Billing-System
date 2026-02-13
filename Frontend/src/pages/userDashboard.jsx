import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import CompanyCard from "../components/CompanyCard";
import CompanyModal from "../components/CompanyModal";
import DeleteModal from "../components/DeleteModal";

function UserDashboard() {
  const [companies, setCompanies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [deleteCompany, setDeleteCompany] = useState(null);
  const navigate = useNavigate();

  const fetchCompanies = async () => {
    const { data } = await API.get("/company");
    setCompanies(data);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSave = async (form) => {
    if (selectedCompany) {
      await API.put(`/company/${selectedCompany._id}`, form);
    } else {
      await API.post("/company", form);
    }
    setModalOpen(false);
    setSelectedCompany(null);
    fetchCompanies();
  };

  const handleDelete = async () => {
    await API.delete(`/company/${deleteCompany._id}`);
    setDeleteCompany(null);
    fetchCompanies();
  };

  const enterCompany = (id) => {
    localStorage.setItem("companyId", id);
    navigate("/companydashboard");
  };

  return (
    <div>

      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#2872A1]">
          Your Companies
        </h1>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#2872A1] text-white px-6 py-2 rounded-lg"
        >
          + Create Company
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {companies.map((company) => (
          <CompanyCard
            key={company._id}
            company={company}
            onEnter={enterCompany}
            onEdit={(c) => {
              setSelectedCompany(c);
              setModalOpen(true);
            }}
            onDelete={(c) => setDeleteCompany(c)}
          />
        ))}
      </div>

      <CompanyModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedCompany(null);
        }}
        onSave={handleSave}
        selectedCompany={selectedCompany}
      />

      <DeleteModal
        isOpen={!!deleteCompany}
        onClose={() => setDeleteCompany(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default UserDashboard;
