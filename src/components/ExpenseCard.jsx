import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // icons

const ExpenseCard = ({ expense, onUpdate, onDelete }) => {
  return (
    <div className="bg-slate-700 rounded-lg shadow-lg p-6 border border-gray-600 hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-105 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-blue-300 mb-2">
          {expense.title}
        </h2>
        <p className="text-sm text-gray-300 mb-1">
          Category: <span className="text-white">{expense.category}</span>
        </p>
        <p className="text-sm text-gray-300 mb-1">
          Amount:{" "}
          <span className="text-green-300">₹{expense.amount.toFixed(2)}</span>
        </p>
        <p className="text-sm text-gray-300 mb-1">Tax: {expense.taxPercent}%</p>
        <p className="text-sm text-gray-300 mb-1">
          Total:{" "}
          <span className="text-yellow-300">
            ₹{expense.totalWithTax.toFixed(2)}
          </span>
        </p>
        <p className="text-xs text-gray-400 mt-2">
          {new Date(expense.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onUpdate(expense)}
          className="flex-1 px-3 py-1.5 bg-blue-300 text-blue-900 text-xs font-semibold rounded-lg shadow-md hover:bg-blue-200 transition flex items-center justify-center gap-2"
        >
          <FaEdit className="text-sm" /> Update
        </button>
        <button
          onClick={() => onDelete(expense._id)}
          className="flex-1 px-3 py-1.5 bg-red-300 text-red-900 text-xs font-semibold rounded-lg shadow-md hover:bg-red-200 transition flex items-center justify-center gap-2"
        >
          <FaTrash className="text-sm" /> Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;
