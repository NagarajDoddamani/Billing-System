import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#CBDDE9] flex flex-col">

      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-6">
        <h1 className="text-2xl font-bold text-[#2872A1]">
          Smart Billing
        </h1>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 border border-[#2872A1] text-[#2872A1] rounded-lg hover:bg-[#2872A1] hover:text-white transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 bg-[#2872A1] text-white rounded-lg hover:opacity-90 transition"
          >
            Register
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="max-w-3xl text-center">

          <h2 className="text-5xl font-bold text-[#2872A1] mb-6 leading-tight">
            Modern Billing & Invoice Management
          </h2>

          <p className="text-gray-700 text-lg mb-10">
            Manage your shops, products, and daily sales with real-time
            dashboards, automated billing, and downloadable invoices —
            all in one powerful system.
          </p>

          <div className="flex justify-center gap-6">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 bg-[#2872A1] text-white text-lg rounded-xl shadow-lg hover:opacity-90 transition"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 border-2 border-[#2872A1] text-[#2872A1] text-lg rounded-xl hover:bg-[#2872A1] hover:text-white transition"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-white py-16 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">

          <div className="p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-[#2872A1] mb-3">
              Easy Billing
            </h3>
            <p className="text-gray-600">
              Generate professional invoices instantly with automatic tax
              calculation and clean formatting.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-[#2872A1] mb-3">
              Real-Time Dashboard
            </h3>
            <p className="text-gray-600">
              Track daily and monthly sales with clear analytics and reports.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-[#2872A1] mb-3">
              Product Management
            </h3>
            <p className="text-gray-600">
              Add, update, and manage your products with flexible pricing.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-600">
        © 2026 Smart Billing System. All rights reserved.
      </footer>

    </div>
  );
}

export default Landing;
