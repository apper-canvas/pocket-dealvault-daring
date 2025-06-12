import React from 'react';

const BaseCard = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-surface rounded-2xl p-6 border border-gray-700 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default BaseCard;