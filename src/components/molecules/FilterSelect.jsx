import React from 'react';
import Select from '@/components/atoms/Select';

const FilterSelect = ({ children, ...props }) => {
  return (
    <Select className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:border-primary focus:outline-none transition-colors" {...props}>
      {children}
    </Select>
  );
};

export default FilterSelect;