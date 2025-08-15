import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";

import Header from "./Header";

const UpdateExpense = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const expense = state?.expense;

  if (!expense) {
    navigate("/list");
    return null;
  }

  const [title, setTitle] = useState(expense.title);
  const [category, setCategory] = useState(expense.category);
  const [amount, setAmount] = useState(expense.amount);
  const [taxPercent, setTaxPercent] = useState(expense.taxPercent);
  const [isRecurring, setIsRecurring] = useState(expense.isRecurring);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://expense-tracker-backend-jot4.onrender.com/api/expense/${expense._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            category,
            amount,
            taxPercent,
            isRecurring,
          }),
        }
      );

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Expense updated successfully!");
        navigate("/");
      } else {
        toast.error(data.message || "Failed to update expense");
      }
    } catch (err) {
      toast.error("Update error:" + err);
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-slate-800 min-h-screen p-6">
        <div className="max-w-md mx-auto bg-slate-700 p-6 rounded-lg shadow-lg mt-6 relative">
          {/* Back Button at Top Left */}
          <button
            onClick={() => navigate("/")}
            className="mb-4 flex items-center gap-1 px-4 py-2 bg-gray-400 text-gray-900 font-medium rounded-lg hover:bg-gray-300 transition"
          >
            <FiArrowLeft /> Back
          </button>

          <h2 className="text-xl font-bold text-white mb-4 text-center">
            Update Expense
          </h2>

          <form onSubmit={handleUpdate} className="space-y-3">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded bg-slate-900 text-white border border-gray-600"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded bg-slate-900 text-white border border-gray-600"
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 rounded bg-slate-900 text-white border border-gray-600"
            />

            <input
              type="number"
              placeholder="Tax Percent"
              value={taxPercent}
              onChange={(e) => setTaxPercent(e.target.value)}
              className="w-full p-2 rounded bg-slate-900 text-white border border-gray-600"
            />

            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
              />
              Is Recurring?
            </label>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-400 text-green-900 font-semibold rounded-lg hover:bg-green-300 transition"
            >
              Update Expense
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateExpense;
