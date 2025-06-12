import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const GradientIconWrapper = ({ iconName, iconSize = 20, iconClassName = 'text-white', wrapperClassName = '', gradientClass, ...props }) => {
  return (
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${gradientClass} ${wrapperClassName}`} {...props}>
      <ApperIcon name={iconName} size={iconSize} className={iconClassName} />
    </div>
  );
};

export default GradientIconWrapper;