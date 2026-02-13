import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";

function MainSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);

  const isCompanyRoute = location.pathname.startsWith("/companydashboard");
  const companyId = isCompanyRoute
    ? localStorage.getItem("companyId")
    : null;

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await API.get("/auth/me");
      setUser(data);
    };

    fetchUser();

    if (companyId) {
      const fetchCompany = async () => {
        const { data } = await API.get(`/company/${companyId}`);
        setCompany(data);
      };
      fetchCompany();
    }
  }, [companyId]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const backToUser = () => {
    localStorage.removeItem("companyId");
    navigate("/userdashboard");
  };

  const navItem = (path, label) => (
    <button
      onClick={() => navigate(path)}
      className={`w-full text-left px-4 py-2 rounded-xl transition ${
        location.pathname === path
          ? "bg-white text-[#2872A1] font-semibold"
          : "hover:bg-white hover:text-[#2872A1]"
      }`}
    >
      {label}
    </button>
  );

  if (!user) return null;

  return (
    <div className="w-72 min-h-screen bg-[#2872A1] text-white flex flex-col p-8">

      {/* Avatar */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-white text-[#2872A1]
                        flex items-center justify-center text-2xl font-bold shadow-md">
          {user.name.charAt(0)}
        </div>

        <h2 className="mt-4 font-semibold">{user.name}</h2>
        <p className="text-sm opacity-80">{user.email}</p>
        <p className="text-sm opacity-80">{user.phone}</p>
      </div>

      <div className="border-t border-white opacity-30 mb-6"></div>


      {/* COMPANY MODE */}
      {isCompanyRoute && companyId && company && (
        <>
          <div className="mb-6">
            <p className="text-sm opacity-80 text-center">
              Company Management Panel
            </p>
            <h3 className="text-lg font-semibold">
              {company.companyName}
            </h3>
            <p className="text-xs opacity-80">{company.address}</p>
            <p className="text-xs opacity-80">{company.phone}</p>
          </div>

          <div className="flex flex-col gap-2 mb-6">
            {navItem("/companydashboard", "Dashboard")}
            {navItem("/companydashboard/products", "Products")}
            {navItem("/companydashboard/bills", "Bills")}
            {navItem("/companydashboard/createbill", "Create Bill")}
          </div>

          <button
            onClick={backToUser}
            className="bg-white text-[#2872A1] py-2 rounded-xl font-semibold mb-4"
          >
            ← Back to User
          </button>
        </>
      )}

      {/* Logout */}
      <button
        onClick={logout}
        className="mt-auto bg-white text-[#2872A1] py-2 rounded-xl font-semibold"
      >
        Logout
      </button>

    </div>
  );
}

export default MainSidebar;
