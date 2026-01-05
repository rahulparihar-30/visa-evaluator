import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./ui/Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Visa Evaluator
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
