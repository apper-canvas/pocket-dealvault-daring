import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import categoryService from '../services/api/categoryService';
import dealService from '../services/api/dealService';

const CategoryCard = ({ category, dealStats, onEdit, onDelete, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.02, y: -4 }}
    className="bg-surface rounded-2xl p-6 border border-gray-700 hover:border-primary/50 transition-all duration-200 relative overflow-hidden group"
  >
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
    
    <div className="relative z-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${category.color}20` }}
          >
            <ApperIcon name="FolderOpen" size={20} style={{ color: category.color }} />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">{category.name}</h3>
            <p className="text-gray-400 text-sm">{category.dealCount} deals</p>
          </div>
        </div>
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(category)}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ApperIcon name="Edit2" size={16} className="text-gray-400 hover:text-white" />
          </button>
          <button
            onClick={() => onDelete(category.id)}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ApperIcon name="Trash2" size={16} className="text-gray-400 hover:text-error" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Total Spent</span>
          <span className="font-semibold text-white">${dealStats?.totalSpent || 0}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Total Saved</span>
          <span className="font-semibold text-success">${dealStats?.totalSaved || 0}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Avg Deal Value</span>
          <span className="font-semibold text-white">${Math.round(dealStats?.avgDealValue || 0)}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-400">Active Deals</span>
          <span className="text-white">{dealStats?.activeDeals || 0}/{category.dealCount}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              backgroundColor: category.color,
              width: `${category.dealCount > 0 ? ((dealStats?.activeDeals || 0) / category.dealCount) * 100 : 0}%`
            }}
          ></div>
        </div>
      </div>
    </div>
  </motion.div>
);

const SkeletonCard = () => (
  <div className="bg-surface rounded-2xl p-6 border border-gray-700">
    <div className="animate-pulse">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-xl"></div>
        <div className="space-y-2">
          <div className="h-5 bg-gray-700 rounded w-24"></div>
          <div className="h-3 bg-gray-700 rounded w-16"></div>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-3 bg-gray-700 rounded w-20"></div>
            <div className="h-3 bg-gray-700 rounded w-16"></div>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-gray-700">
        <div className="flex justify-between mb-2">
          <div className="h-3 bg-gray-700 rounded w-20"></div>
          <div className="h-3 bg-gray-700 rounded w-12"></div>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full"></div>
      </div>
    </div>
  </div>
);

const EmptyState = () => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="text-center py-16"
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 3 }}
      className="mb-6"
    >
      <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
        <ApperIcon name="FolderOpen" className="w-10 h-10 text-white" />
      </div>
    </motion.div>
    <h3 className="text-2xl font-display font-bold text-white mb-2">No categories yet</h3>
    <p className="text-gray-400 mb-6 max-w-md mx-auto">
      Categories help you organize your deals by type. Create your first category to get started.
    </p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gradient-primary text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200"
    >
      <div className="flex items-center space-x-2">
        <ApperIcon name="Plus" size={20} />
        <span>Create Category</span>
      </div>
    </motion.button>
  </motion.div>
);

const Categories = () => {
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
      <div className="p-6 max-w-full overflow-hidden">
        {/* Header */}
        <div className="mb-8">
          <div className="h-8 bg-gray-700 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-64 animate-pulse"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-error/20 rounded-xl flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="AlertCircle" className="w-8 h-8 text-error" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
        <p className="text-gray-400 mb-6">{error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={loadData}
          className="bg-gradient-primary text-white px-6 py-3 rounded-xl font-medium"
        >
          Try Again
        </motion.button>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="p-6 max-w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-white mb-2">Categories</h1>
          <p className="text-gray-400">Organize your deals by category</p>
        </motion.div>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Categories</h1>
            <p className="text-gray-400">{categories.length} categories</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-primary text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200"
          >
            <div className="flex items-center space-x-2">
              <ApperIcon name="Plus" size={20} />
              <span>Add Category</span>
            </div>
          </motion.button>
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
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <ApperIcon name="FolderOpen" size={24} className="text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{categories.length}</div>
              <div className="text-gray-400">Total Categories</div>
            </div>
          </div>
        </div>

        <div className="glass-morphism rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center">
              <ApperIcon name="Package" size={24} className="text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {categories.reduce((sum, cat) => sum + cat.dealCount, 0)}
              </div>
              <div className="text-gray-400">Total Deals</div>
            </div>
          </div>
        </div>

        <div className="glass-morphism rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center">
              <ApperIcon name="TrendingUp" size={24} className="text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {Math.round(categories.reduce((sum, cat) => sum + cat.dealCount, 0) / categories.length || 0)}
              </div>
              <div className="text-gray-400">Avg per Category</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <CategoryCard
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

export default Categories;