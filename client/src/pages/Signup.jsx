import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return toast.error("All fields are required", {
        style: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "#fff",
        },
      });
    }

    try {
      setLoading(true);
      await api.post("/auth/register", form);

      toast.success("Account created! Redirecting...", {
        duration: 3000,
        style: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "#fff",
        },
      });

      // Delay navigation slightly so user can see the toast
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed", {
        style: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#0f172a]">
      {/* This component renders the actual toasts */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Decorative Dark Mesh/Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]"></div>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-white tracking-tight">
          Create Account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Join the portal to manage your certificates
        </p>
      </div>

      <div className="relative z-10 mt-8 sm:mx-auto sm:w-full sm:max-w-[440px]">
        <div className="bg-slate-900/50 backdrop-blur-2xl py-10 px-8 shadow-2xl border border-slate-800 sm:rounded-3xl sm:px-12">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="block w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200 shadow-inner"
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">
                Password
              </label>
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

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f172a] focus:ring-blue-600 transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(37,99,235,0.2)] disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800/60 text-center">
            <p className="text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                to="/"
                className="font-bold text-white hover:text-blue-400 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
