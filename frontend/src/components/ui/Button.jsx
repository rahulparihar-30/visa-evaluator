import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-500/30 focus:ring-blue-500",
    secondary: "bg-white text-blue-600 border-2 border-blue-100 hover:border-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
    outline: "bg-transparent border-2 border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 focus:ring-gray-500"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
