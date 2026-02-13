import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#CBDDE9] px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-10">

        {/* Title */}
        <h2 className="text-3xl font-bold text-[#2872A1] text-center mb-2">
          Create Account
        </h2>

        <p className="text-gray-600 text-center mb-8">
          Start managing your billing system
        </p>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border rounded-lg 
                         focus:outline-none focus:ring-2 
                         focus:ring-[#2872A1] transition"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg 
                         focus:outline-none focus:ring-2 
                         focus:ring-[#2872A1] transition"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 border rounded-lg 
                         focus:outline-none focus:ring-2 
                         focus:ring-[#2872A1] transition"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2872A1] text-white py-3 
                       rounded-lg font-semibold 
                       hover:opacity-90 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Bottom Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#2872A1] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
