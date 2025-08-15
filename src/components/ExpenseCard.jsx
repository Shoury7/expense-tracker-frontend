import React from "react";

const ExpenseCard = ({ expense }) => {
  return (
    <div className="bg-slate-700 rounded-lg shadow-lg p-6 border border-gray-600 hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-105">
      <h2 className="text-xl font-semibold text-blue-400 mb-2">
        {expense.title}
      </h2>
      <p className="text-sm text-gray-400 mb-1">
        Category: <span className="text-white">{expense.category}</span>
      </p>
      <p className="text-sm text-gray-400 mb-1">
        Amount:{" "}
        <span className="text-green-400">₹{expense.amount.toFixed(2)}</span>
      </p>
      <p className="text-sm text-gray-400 mb-1">Tax: {expense.taxPercent}%</p>
      <p className="text-sm text-gray-400 mb-1">
        Total:{" "}
        <span className="text-yellow-400">
          ₹{expense.totalWithTax.toFixed(2)}
        </span>
      </p>
      <p className="text-xs text-gray-500 mt-2">
        {new Date(expense.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ExpenseCard;
