import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 🔹 Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isRegister
        ? "https://expense-tracker-backend-jot4.onrender.com/api/auth/signup"
        : "https://expense-tracker-backend-jot4.onrender.com/api/auth/login";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        if (!isRegister) {
          localStorage.setItem("token", data.token);
          setMessage(data.message);
          navigate("/");
        } else {
          setMessage("Registration successful! Please login.");
          setIsRegister(false);
          setFormData({ name: "", email: "", password: "" });
        }
      } else {
        setMessage(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error!");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] flex flex-col items-center pt-10 p-4">
        <div className="bg-[#1E293B] p-8 rounded-lg shadow-lg w-full max-w-md mt-8">
          <h2 className="text-2xl font-bold mb-6">
            {isRegister ? "Register" : "Login"}
          </h2>

          {/* 🔹 Predefined credentials note */}
          {!isRegister && (
            <div className="bg-[#334155] p-4 rounded mb-4 text-[#F8FAFC] border-l-4 border-[#3B82F6]">
              <p className="font-semibold mb-1">Test Credentials:</p>
              <p>
                Email: <span className="font-mono">user@gmail.com</span>
              </p>
              <p>
                Password: <span className="font-mono">user@123</span>
              </p>
            </div>
          )}

          {message && <p className="mb-4 text-[#F8FAFC]">{message}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isRegister && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 rounded bg-[#0F172A] text-[#F8FAFC] placeholder-[#94A3B8] border border-gray-700"
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 rounded bg-[#0F172A] text-[#F8FAFC] placeholder-[#94A3B8] border border-gray-700"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 rounded bg-[#0F172A] text-[#F8FAFC] placeholder-[#94A3B8] border border-gray-700"
              required
            />
            <button
              type="submit"
              className="mt-4 px-5 py-2 rounded-full bg-[#3B82F6] text-[#F8FAFC] font-semibold shadow-md hover:bg-blue-500 transition transform hover:-translate-y-0.5 hover:scale-105"
            >
              {isRegister ? "Register" : "Login"}
            </button>
          </form>

          <p className="mt-4 text-[#94A3B8] text-center">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={() => setIsRegister(!isRegister)}
              className="text-[#3B82F6] cursor-pointer hover:underline"
            >
              {isRegister ? "Login" : "Register"}
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
