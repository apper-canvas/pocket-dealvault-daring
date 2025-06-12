import React from 'react';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const AnimatedButton = ({ 
  children, 
  icon, 
  className = '', 
  shadowClass = 'shadow-lg shadow-primary/25 hover:shadow-primary/40',
  ...props 
}) => {
  return (
    <Button
      className={`flex items-center justify-center space-x-2 ${className} ${shadowClass}`}
      {...props}
    >
      {icon && <ApperIcon name={icon} size={20} />}
      <span>{children}</span>
    </Button>
  );
};

export default AnimatedButton;