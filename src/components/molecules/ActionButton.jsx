import React from 'react';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const ActionButton = ({ onClick, iconName, iconClassName, className = '' }) => {
  return (
    <Button 
      onClick={onClick}
      className={`p-2 rounded-lg hover:bg-gray-700 transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ApperIcon name={iconName} size={16} className={iconClassName} />
    </Button>
  );
};

export default ActionButton;