import React from 'react';
import Span from '@/components/atoms/Span';

const PillBadge = ({ children, className = '' }) => {
  return (
    <Span className={`px-3 py-1 rounded-lg text-xs font-medium ${className}`}>
      {children}
    </Span>
  );
};

export default PillBadge;