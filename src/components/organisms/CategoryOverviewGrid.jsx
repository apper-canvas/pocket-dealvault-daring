import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import categoryService from '@/services/api/categoryService';
import dealService from '@/services/api/dealService';
import CategoryItemCard from '@/components/molecules/CategoryItemCard';
import CategorySkeletonCard from '@/components/molecules/CategorySkeletonCard';
import EmptyStateMessage from '@/components/molecules/EmptyStateMessage';
import ErrorMessage from '@/components/molecules/ErrorMessage';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import AnimatedButton from '@/components/molecules/AnimatedButton';
import GradientIconWrapper from '@/components/atoms/GradientIconWrapper';

const CategoryOverviewGrid = ({ onAddCategory }) => {
  const [categories, setCategories] = useState([]);
  const [dealStats, setDealStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [categoriesData, dealsData] = await Promise.all([
        categoryService.getAll(),
        dealService.getAll()
      ]);
      
      setCategories(categoriesData);
      
      // Calculate stats for each category
      const stats = {};
      categoriesData.forEach(category => {
        const categoryDeals = dealsData.filter(deal => deal.category === category.name);
        const totalSpent = categoryDeals.reduce((sum, deal) => sum + deal.purchasePrice, 0);
        const totalRegularPrice = categoryDeals.reduce((sum, deal) => sum + deal.regularPrice, 0);
        const totalSaved = totalRegularPrice - totalSpent;
        const activeDeals = categoryDeals.filter(deal => deal.status === 'active').length;
        const avgDealValue = categoryDeals.length > 0 ? totalSpent / categoryDeals.length : 0;

        stats[category.id] = {
          totalSpent,
          totalSaved,
          avgDealValue,
          activeDeals
        };
      });
      
      setDealStats(stats);
    } catch (err) {
      setError(err.message || 'Failed to load categories');
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = (category) => {
    toast.info(`Editing ${category.name} category`);
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryService.delete(categoryId);
        setCategories(categories.filter(cat => cat.id !== categoryId));
        toast.success('Category deleted successfully');
      } catch (err) {
        toast.error('Failed to delete category');
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-full overflow-hidden">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-gray-700 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-64 animate-pulse"></div>
        </div>

        {/* Categories Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <CategorySkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadData} />;
  }

  if (categories.length === 0) {
    return (
      <div className="max-w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Heading level={1} className="text-3xl font-display font-bold text-white mb-2">Categories</Heading>
          <Paragraph className="text-gray-400">Organize your deals by category</Paragraph>
        </motion.div>
        <EmptyStateMessage 
          iconName="FolderOpen"
          title="No categories yet"
          message="Categories help you organize your deals by type. Create your first category to get started."
          buttonText="Create Category"
          onButtonClick={onAddCategory}
        />
      </div>
    );
  }

  return (
    <div className="max-w-full overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <Heading level={1} className="text-3xl font-display font-bold text-white mb-2">Categories</Heading>
            <Paragraph className="text-gray-400">{categories.length} categories</Paragraph>
          </div>
          <AnimatedButton
            className="bg-gradient-primary text-white"
            icon="Plus"
            onClick={onAddCategory}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Category
          </AnimatedButton>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div className="glass-morphism rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <GradientIconWrapper iconName="FolderOpen" iconSize={24} gradientClass="bg-gradient-primary" />
            <div>
              <Heading level={2} className="text-2xl font-bold text-white">{categories.length}</Heading>
              <Paragraph className="text-gray-400">Total Categories</Paragraph>
            </div>
          </div>
        </div>

        <div className="glass-morphism rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <GradientIconWrapper iconName="Package" iconSize={24} gradientClass="bg-gradient-success" />
            <div>
              <Heading level={2} className="text-2xl font-bold text-white">
                {categories.reduce((sum, cat) => sum + cat.dealCount, 0)}
              </Heading>
              <Paragraph className="text-gray-400">Total Deals</Paragraph>
            </div>
          </div>
        </div>

        <div className="glass-morphism rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <GradientIconWrapper iconName="TrendingUp" iconSize={24} gradientClass="bg-gradient-secondary" />
            <div>
              <Heading level={2} className="text-2xl font-bold text-white">
                {Math.round(categories.reduce((sum, cat) => sum + cat.dealCount, 0) / categories.length || 0)}
              </Heading>
              <Paragraph className="text-gray-400">Avg per Category</Paragraph>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <CategoryItemCard
            key={category.id}
            category={category}
            dealStats={dealStats[category.id]}
            onEdit={handleEdit}
            onDelete={handleDelete}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryOverviewGrid;