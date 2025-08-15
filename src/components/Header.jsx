import React, { useState, useEffect } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to validate token (simple check here; backend can be added for real validation)
  const checkToken = () => {
    const token = localStorage.getItem("token");
    // Example: token exists and has some length
    if (token && token.length > 10) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("token"); // remove invalid token
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login"; // redirect to login page
  };

  return (
    <header className="bg-[#0F172A] shadow-md border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo / App Name */}
        <h1 className="text-[#F8FAFC] text-2xl font-bold tracking-wide">
          Expense Tracker
        </h1>

        {/* Buttons */}
        <div className="flex gap-4">
          {!isLoggedIn ? (
            <a
              href="/login"
              className="px-5 py-2 rounded-full bg-[#3B82F6] text-[#F8FAFC] font-semibold shadow-md hover:bg-blue-500 transition transform hover:-translate-y-0.5 hover:scale-105"
            >
              Login
            </a>
          ) : (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full bg-[#EF4444] text-[#F8FAFC] font-semibold shadow-md hover:bg-red-500 transition transform hover:-translate-y-0.5 hover:scale-105"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
