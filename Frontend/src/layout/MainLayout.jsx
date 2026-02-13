import MainSidebar from "../components/MainSidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#CBDDE9]">
      <MainSidebar />
      <div className="flex-1 p-12">
        <div className="bg-white rounded-3xl shadow-xl p-10 min-h-[85vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
