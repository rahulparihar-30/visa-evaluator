import React from 'react';

const Input = ({ label, error, className = '', ...props }) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-sm font-medium text-gray-700 ml-1">
                    {label}
                </label>
            )}
            <input
                className={`px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''} ${className}`}
                {...props}
            />
            {error && (
                <span className="text-xs text-red-500 ml-1 mt-0.5">{error}</span>
            )}
        </div>
    );
};

export default Input;
