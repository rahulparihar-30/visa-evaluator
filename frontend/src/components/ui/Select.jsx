import React from 'react';

const Select = ({ label, error, children, className = '', ...props }) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-sm font-medium text-gray-700 ml-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    className={`appearance-none w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''} ${className}`}
                    {...props}
                >
                    {children}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            {error && (
                <span className="text-xs text-red-500 ml-1 mt-0.5">{error}</span>
            )}
        </div>
    );
};

export default Select;
