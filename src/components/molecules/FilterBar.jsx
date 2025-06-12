import React from 'react';
import MotionDiv from '@/components/atoms/MotionDiv';
import SearchInput from '@/components/molecules/SearchInput';
import FilterSelect from '@/components/molecules/FilterSelect';

const FilterBar = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory,
  selectedPlatform,
  setSelectedPlatform,
  selectedStatus,
  setSelectedStatus,
  categories,
  platforms 
}) => (
  <MotionDiv
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-surface rounded-2xl p-6 mb-6 border border-gray-700"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <SearchInput
        placeholder="Search deals..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <FilterSelect
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect
        value={selectedPlatform}
        onChange={(e) => setSelectedPlatform(e.target.value)}
      >
        <option value="">All Platforms</option>
        {platforms.map(platform => (
          <option key={platform.id} value={platform.name}>
            {platform.name}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="expired">Expired</option>
      </FilterSelect>
    </div>
  </MotionDiv>
);

export default FilterBar;