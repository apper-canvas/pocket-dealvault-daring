import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryOverviewGrid from '@/components/organisms/CategoryOverviewGrid';

const CategoriesPage = () => {
  const navigate = useNavigate();

  const handleAddCategory = () => {
    // Implement add category modal/page navigation
    alert('Add Category functionality needs to be implemented!');
  };

  return (
    <div className="p-6">
      <CategoryOverviewGrid onAddCategory={handleAddCategory} />
    </div>
  );
};

export default CategoriesPage;