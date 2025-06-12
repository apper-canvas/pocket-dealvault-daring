import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import dealService from '../services/api/dealService';
import categoryService from '../services/api/categoryService';
import platformService from '../services/api/platformService';

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
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-surface rounded-2xl p-6 mb-6 border border-gray-700"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Search */}
      <div className="relative">
        <ApperIcon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search deals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-colors"
        />
      </div>

      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:border-primary focus:outline-none transition-colors"
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Platform Filter */}
      <select
        value={selectedPlatform}
        onChange={(e) => setSelectedPlatform(e.target.value)}
        className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:border-primary focus:outline-none transition-colors"
      >
        <option value="">All Platforms</option>
        {platforms.map(platform => (
          <option key={platform.id} value={platform.name}>
            {platform.name}
          </option>
        ))}
      </select>

      {/* Status Filter */}
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:border-primary focus:outline-none transition-colors"
      >
        <option value="">All Statuses</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="expired">Expired</option>
      </select>
    </div>
  </motion.div>
);

const DealCard = ({ deal, onEdit, onDelete, index }) => {
  const savings = deal.regularPrice - deal.purchasePrice;
  const savingsPercentage = Math.round((savings / deal.regularPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-surface rounded-2xl p-6 border border-gray-700 hover:border-primary/50 transition-all duration-200 relative overflow-hidden group"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <ApperIcon name="Package" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">{deal.productName}</h3>
              <p className="text-gray-400 text-sm">{deal.platform}</p>
            </div>
          </div>
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(deal)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ApperIcon name="Edit2" size={16} className="text-gray-400 hover:text-white" />
            </button>
            <button
              onClick={() => onDelete(deal.id)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ApperIcon name="Trash2" size={16} className="text-gray-400 hover:text-error" />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{deal.description}</p>

        {/* Price and Savings */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Purchase Price</span>
            <span className="font-semibold text-white">${deal.purchasePrice}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Regular Price</span>
            <span className="font-semibold text-gray-300 line-through">${deal.regularPrice}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-success">Savings</span>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-success">${savings}</span>
              <span className="bg-success/20 text-success px-2 py-1 rounded-lg text-xs font-medium">
                {savingsPercentage}% OFF
              </span>
            </div>
          </div>
        </div>

        {/* Category and Status */}
        <div className="flex items-center justify-between mb-4">
          <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg text-xs font-medium">
            {deal.category}
          </span>
          <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
            deal.status === 'active' 
              ? 'bg-success/20 text-success' 
              : deal.status === 'pending'
              ? 'bg-warning/20 text-warning'
              : 'bg-error/20 text-error'
          }`}>
            {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
          </span>
        </div>

        {/* Purchase Date */}
        <div className="text-xs text-gray-400 mb-4">
          Purchased: {new Date(deal.purchaseDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </div>

        {/* Access URL */}
        {deal.accessUrl && (
          <div className="pt-4 border-t border-gray-700">
            <a
              href={deal.accessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-primary hover:text-secondary transition-colors"
            >
              <ApperIcon name="ExternalLink" size={14} />
              <span className="text-sm font-medium">Access Product</span>
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const SkeletonCard = () => (
  <div className="bg-surface rounded-2xl p-6 border border-gray-700">
    <div className="animate-pulse">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-xl"></div>
        <div className="space-y-2">
          <div className="h-5 bg-gray-700 rounded w-32"></div>
          <div className="h-3 bg-gray-700 rounded w-20"></div>
        </div>
      </div>
      <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="space-y-3 mb-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-3 bg-gray-700 rounded w-20"></div>
            <div className="h-3 bg-gray-700 rounded w-16"></div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mb-4">
        <div className="h-6 bg-gray-700 rounded w-20"></div>
        <div className="h-6 bg-gray-700 rounded w-16"></div>
      </div>
    </div>
  </div>
);

const AllDeals = () => {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dealsData, categoriesData, platformsData] = await Promise.all([
        dealService.getAll(),
        categoryService.getAll(),
        platformService.getAll()
      ]);
      
      setDeals(dealsData);
      setFilteredDeals(dealsData);
      setCategories(categoriesData);
      setPlatforms(platformsData);
    } catch (err) {
      setError(err.message || 'Failed to load deals');
      toast.error('Failed to load deals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter deals based on search and filters
  useEffect(() => {
    let filtered = [...deals];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(deal =>
        deal.productName.toLowerCase().includes(query) ||
        deal.description.toLowerCase().includes(query) ||
        deal.platform.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(deal => deal.category === selectedCategory);
    }

    // Platform filter
    if (selectedPlatform) {
      filtered = filtered.filter(deal => deal.platform === selectedPlatform);
    }

    // Status filter
    if (selectedStatus) {
      filtered = filtered.filter(deal => deal.status === selectedStatus);
    }

    setFilteredDeals(filtered);
  }, [deals, searchQuery, selectedCategory, selectedPlatform, selectedStatus]);

  const handleEdit = (deal) => {
    toast.info(`Editing ${deal.productName}`);
  };

  const handleDelete = async (dealId) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await dealService.delete(dealId);
        const updatedDeals = deals.filter(deal => deal.id !== dealId);
        setDeals(updatedDeals);
        toast.success('Deal deleted successfully');
      } catch (err) {
        toast.error('Failed to delete deal');
      }
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedPlatform('');
    setSelectedStatus('');
  };

  if (loading) {
    return (
      <div className="p-6 max-w-full overflow-hidden">
        {/* Header */}
        <div className="mb-8">
          <div className="h-8 bg-gray-700 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-64 animate-pulse"></div>
        </div>

        {/* Filter Bar */}
        <div className="bg-surface rounded-2xl p-6 mb-6 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-700 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Deals Grid */}
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
            <h1 className="text-3xl font-display font-bold text-white mb-2">All Deals</h1>
            <p className="text-gray-400">
              {filteredDeals.length} of {deals.length} deals
            </p>
          </div>
          {(searchQuery || selectedCategory || selectedPlatform || selectedStatus) && (
            <button
              onClick={clearFilters}
              className="text-primary hover:text-secondary transition-colors text-sm font-medium flex items-center space-x-2"
            >
              <ApperIcon name="X" size={16} />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        categories={categories}
        platforms={platforms}
      />

      {/* Deals Grid */}
      <AnimatePresence>
        {filteredDeals.length === 0 ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Search" className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">No deals found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery || selectedCategory || selectedPlatform || selectedStatus
                ? "Try adjusting your filters to find more deals"
                : "Start building your collection by adding your first deal"
              }
            </p>
            {!(searchQuery || selectedCategory || selectedPlatform || selectedStatus) && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-primary text-white px-6 py-3 rounded-xl font-medium"
              >
                Add Your First Deal
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredDeals.map((deal, index) => (
              <DealCard
                key={deal.id}
                deal={deal}
                onEdit={handleEdit}
                onDelete={handleDelete}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllDeals;