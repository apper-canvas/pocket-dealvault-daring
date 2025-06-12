import React from 'react';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';

const SearchInput = ({ className = '', ...props }) => {
  return (
    <div className="relative">
      <ApperIcon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        className={`pl-10 pr-4 ${className}`}
        {...props}
      />
    </div>
  );
};

export default SearchInput;