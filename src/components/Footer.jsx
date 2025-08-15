import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-400 text-center py-4 border-t border-slate-700">
      <p className="flex flex-col sm:flex-row justify-center items-center gap-2">
        <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 font-semibold">
          Made by Shoury
        </span>
        <span>|</span>
        <a
          href="mailto:shourykandagatla9@gmail.com"
          className="underline hover:text-white transition-colors"
        >
          shourykandagatla9@gmail.com
        </a>
      </p>
    </footer>
  );
};

export default Footer;
