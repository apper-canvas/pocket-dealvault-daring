import React from 'react';

const Select = ({ className = '', children, ...props }) => {
  return (
    <select
      className={`w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:border-primary focus:outline-none transition-colors ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;