import React from 'react';

const TextArea = ({ className = '', ...props }) => {
  return (
    <textarea
      className={`w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-colors resize-none ${className}`}
      {...props}
    />
  );
};

export default TextArea;