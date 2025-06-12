import React from 'react';
import Span from '@/components/atoms/Span';

const StatusBadge = ({ status, children, className = '' }) => {
  let badgeClass = '';
  switch (status) {
    case 'active':
      badgeClass = 'bg-success/20 text-success';
      break;
    case 'pending':
      badgeClass = 'bg-warning/20 text-warning';
      break;
    case 'expired':
      badgeClass = 'bg-error/20 text-error';
      break;
    default:
      badgeClass = 'bg-gray-500/20 text-gray-300';
  }

  return (
    <Span className={`px-3 py-1 rounded-lg text-xs font-medium ${badgeClass} ${className}`}>
      {children}
    </Span>
  );
};

export default StatusBadge;