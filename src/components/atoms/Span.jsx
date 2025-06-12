import React from 'react';

const Span = ({ children, className = '', ...props }) => {
  return (
    <span className={`${className}`} {...props}>
      {children}
    </span>
  );
};

export default Span;