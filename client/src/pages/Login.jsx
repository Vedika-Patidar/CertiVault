import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password)
      return alert("Email and password are required");

    try {
      setLoading(true);
      const res = await api.post("/auth/login", form);



      // login(res.data);
      login({
        token: res.data.token,
        role: res.data.role,
        name: res.data.name, // ✅ NOW COMES FROM BACKEND
      });
      res.data.role === "admin"
        ? navigate("/admin/dashboard")
        : navigate("/user/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* DARK PROFESSIONAL BACKGROUND */
    <div className="min-h-screen w-full flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#0f172a]">
      {/* Decorative Dark Mesh/Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://shared-assets.adobe.com/link/8f3b89e3-8f0a-4a1d-7f8e-8a1a2b3c4d5e')] opacity-[0.03]"></div>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-white tracking-tight">
          Welcome to CERTIVAULT
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Enter your credentials to access the secure portal
        </p>
      </div>

      <div className="relative z-10 mt-8 sm:mx-auto sm:w-full sm:max-w-[420px]">
        {/* Glassmorphism Card */}
        <div className="bg-slate-900/50 backdrop-blur-2xl py-10 px-8 shadow-2xl border border-slate-800 sm:rounded-3xl sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="block w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200 shadow-inner"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5 ml-1">
                <label className="block text-sm font-medium text-slate-300">
                  Password
                </label>
              </div>
              <input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="block w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200 shadow-inner"
              />
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f172a] focus:ring-blue-600 transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(37,99,235,0.2)] disabled:opacity-50"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Sign in to Account"
                )}
              </button>
            </div>
          </form>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-slate-800/60">
            <p className="text-center text-sm text-slate-400">
              New to the platform?{" "}
              <Link
                to="/signup"
                className="font-bold text-white hover:text-blue-400 transition-colors"
              >
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
