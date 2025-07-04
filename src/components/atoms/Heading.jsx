import React from 'react';

const Heading = ({ level, children, className = '', ...props }) => {
  const Tag = `h${level}`;
  return (
    <Tag className={`${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default Heading;