import React from 'react';

const Card = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-white/50 backdrop-blur-sm p-6 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
