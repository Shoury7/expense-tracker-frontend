import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const NewExpense = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    taxPercent: "",
    isRecurring: false,
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const categories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please log in to add an expense.");
        return;
      }

      const res = await fetch(
        "https://expense-tracker-backend-jot4.onrender.com/api/expense",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            amount: parseFloat(formData.amount),
            taxPercent: parseFloat(formData.taxPercent) || 0,
          }),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("✅ Expense created successfully!");
        setTimeout(() => {
          navigate("/"); // Go back to list page
        }, 1000);
      } else {
        setMessage(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error!");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-slate-800 text-white flex flex-col items-center pt-10 p-4">
        <div className="bg-slate-700 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Add New Expense</h2>
          {message && <p className="mb-4 text-center">{message}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="p-2 rounded bg-slate-900 text-white border border-gray-600"
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="p-2 rounded bg-slate-900 text-white border border-gray-600"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="p-2 rounded bg-slate-900 text-white border border-gray-600"
              required
            />

            <input
              type="number"
              name="taxPercent"
              placeholder="Tax %"
              value={formData.taxPercent}
              onChange={handleChange}
              className="p-2 rounded bg-slate-900 text-white border border-gray-600"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isRecurring"
                checked={formData.isRecurring}
                onChange={handleChange}
              />
              Recurring Expense
            </label>

            <button
              type="submit"
              className="mt-4 px-5 py-2 rounded-lg bg-gradient-to-r from-green-400 to-green-500 text-gray-900 font-semibold shadow-lg hover:from-green-300 hover:to-green-400 transition"
            >
              Add Expense
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewExpense;
