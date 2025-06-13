import React from 'react';
import Select from 'react-select';

const SearchableSelect = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = "Search and select...",
  name,
  isDisabled = false,
  className = '',
  ...props 
}) => {
  // Transform options to react-select format if needed
  const selectOptions = options.map(option => {
    if (typeof option === 'string') {
      return { value: option, label: option };
    }
    if (option.name) {
      return { value: option.name, label: option.name };
    }
    return option;
  });

  // Find current selected option
  const selectedOption = selectOptions.find(option => option.value === value) || null;

  const handleChange = (selectedOption) => {
    const event = {
      target: {
        name,
        value: selectedOption ? selectedOption.value : ''
      }
    };
    onChange(event);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'rgb(31 41 55)', // dark:bg-gray-800
      borderColor: state.isFocused ? 'rgb(99 102 241)' : 'rgb(75 85 99)', // focus:border-primary : border-gray-600
      borderRadius: '0.75rem', // rounded-xl
      padding: '0.5rem 1rem', // px-4 py-3 equivalent
      minHeight: '3rem',
      boxShadow: 'none',
      borderWidth: '1px',
      '&:hover': {
        borderColor: state.isFocused ? 'rgb(99 102 241)' : 'rgb(75 85 99)'
      }
    }),
    input: (provided) => ({
      ...provided,
      color: 'rgb(255 255 255)', // text-white
      fontSize: '1rem'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'rgb(156 163 175)' // text-gray-400
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'rgb(255 255 255)' // text-white
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgb(31 41 55)', // dark:bg-gray-800
      borderRadius: '0.75rem',
      border: '1px solid rgb(75 85 99)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      zIndex: 9999
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused 
        ? 'rgb(55 65 81)' // hover:bg-gray-700
        : state.isSelected 
        ? 'rgb(99 102 241)' // bg-primary
        : 'transparent',
      color: 'rgb(255 255 255)', // text-white
      padding: '0.75rem 1rem',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: 'rgb(99 102 241)'
      }
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: 'rgb(156 163 175)', // text-gray-400
      '&:hover': {
        color: 'rgb(255 255 255)'
      },
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s'
    })
  };

  return (
    <Select
      options={selectOptions}
      value={selectedOption}
      onChange={handleChange}
      placeholder={placeholder}
      isDisabled={isDisabled}
      isSearchable={true}
      isClearable={false}
      styles={customStyles}
      className={className}
      {...props}
    />
  );
};

export default SearchableSelect;