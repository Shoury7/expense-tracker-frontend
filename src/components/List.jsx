import React, { useEffect, useState, useCallback } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import ExpenseCard from "./ExpenseCard";

const List = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // ✅ Reusable fetch function
  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      let url = `https://expense-tracker-backend-jot4.onrender.com/api/expense/query?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`;

      if (category) url += `&category=${category}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setExpenses(data.data);
        setTotalPages(data.totalPages || 0);
      } else {
        console.error("Error fetching expenses:", data.message);
      }
    } catch (err) {
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, category, sortBy, order, search]);

  // Fetch on dependency change
  useEffect(() => {
    if (isLoggedIn) {
      fetchExpenses();
    }
  }, [isLoggedIn, fetchExpenses]);

  // ✅ Handle delete and re-fetch
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://expense-tracker-backend-jot4.onrender.com/api/expense/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok && data.success) {
        fetchExpenses(); // ✅ Now works because it's defined outside
      } else {
        alert(data.message || "Failed to delete expense");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (!isLoggedIn) {
    return (
      <div>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              You’re not logged in
            </h2>
            <p className="text-gray-300 mb-6">
              Please log in to continue and see your expenses.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition transform hover:-translate-y-0.5 hover:scale-105"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="p-6 text-white bg-slate-800 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={() => navigate("/newExpense")}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-green-400 to-green-500 text-gray-900 font-semibold shadow-lg hover:from-green-300 hover:to-green-400 transition transform hover:-translate-y-0.5 hover:scale-105"
          >
            <FiPlus className="text-lg" /> Add Expense
          </button>
        </div>

        {/* Filter Controls */}
        <div className="bg-slate-700 p-4 rounded-lg shadow-lg flex flex-wrap gap-4 items-center mb-6">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="p-2 rounded bg-slate-900 text-white placeholder-gray-400 border border-gray-600 flex-1 min-w-[180px] focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="p-2 rounded bg-slate-900 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 rounded bg-slate-900 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="createdAt">Sort by Created Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="totalWithTax">Sort by Total with Tax</option>
          </select>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="p-2 rounded bg-slate-900 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="p-2 rounded bg-slate-900 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </div>

        {/* Expense Cards */}
        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : expenses.length === 0 ? (
          <p className="text-gray-300">No expenses found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expenses.map((exp) => (
              <ExpenseCard
                key={exp._id}
                expense={exp}
                onDelete={handleDelete}
                onUpdate={(expense) =>
                  navigate("/updateExpense", { state: { expense } })
                }
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="flex justify-center items-center mt-6 gap-4">
            <button
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 bg-slate-700 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-slate-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
