import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';
import dealService from '../services/api/dealService';

const DealCard = ({ deal, onEdit, onDelete }) => {
  const savings = deal.regularPrice - deal.purchasePrice;
  const savingsPercentage = Math.round((savings / deal.regularPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-surface rounded-xl p-6 border border-gray-700 hover:border-primary/50 transition-all duration-200 relative overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-card opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ApperIcon name="Package" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">{deal.productName}</h3>
              <p className="text-gray-400 text-sm">{deal.platform}</p>
            </div>
          </div>
          <div className="flex space-x-2">
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
        <div className="flex items-center justify-between">
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

        {/* Access URL */}
        {deal.accessUrl && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <a
              href={deal.accessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-primary hover:text-secondary transition-colors"
            >
              <ApperIcon name="ExternalLink" size={14} />
              <span className="text-sm">Access Product</span>
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const EmptyState = ({ onAddDeal }) => (
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
        <ApperIcon name="Package" className="w-10 h-10 text-white" />
      </div>
    </motion.div>
    <h3 className="text-2xl font-display font-bold text-white mb-2">No deals yet</h3>
    <p className="text-gray-400 mb-6 max-w-md mx-auto">
      Start building your SaaS deal collection. Track purchases, monitor savings, and never lose access to your lifetime deals.
    </p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onAddDeal}
      className="bg-gradient-primary text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200"
    >
      <div className="flex items-center space-x-2">
        <ApperIcon name="Plus" size={20} />
        <span>Add Your First Deal</span>
      </div>
    </motion.button>
  </motion.div>
);

const SkeletonCard = () => (
  <div className="bg-surface rounded-xl p-6 border border-gray-700">
    <div className="animate-pulse">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-32"></div>
          <div className="h-3 bg-gray-700 rounded w-20"></div>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <div className="h-3 bg-gray-700 rounded w-20"></div>
          <div className="h-3 bg-gray-700 rounded w-16"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-3 bg-gray-700 rounded w-20"></div>
          <div className="h-3 bg-gray-700 rounded w-16"></div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="h-6 bg-gray-700 rounded w-20"></div>
        <div className="h-6 bg-gray-700 rounded w-16"></div>
      </div>
    </div>
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-16"
  >
    <div className="w-16 h-16 bg-error/20 rounded-xl flex items-center justify-center mx-auto mb-4">
      <ApperIcon name="AlertCircle" className="w-8 h-8 text-error" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
    <p className="text-gray-400 mb-6">{message}</p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onRetry}
      className="bg-gradient-primary text-white px-6 py-3 rounded-xl font-medium"
    >
      Try Again
    </motion.button>
  </motion.div>
);

const MainFeature = ({ onAddDeal }) => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await dealService.getAll();
      setDeals(result);
    } catch (err) {
      setError(err.message || 'Failed to load deals');
      toast.error('Failed to load deals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeals();
  }, []);

  const handleEdit = (deal) => {
    // This would typically open an edit modal
    toast.info(`Editing ${deal.productName}`);
  };

  const handleDelete = async (dealId) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await dealService.delete(dealId);
        setDeals(deals.filter(deal => deal.id !== dealId));
        toast.success('Deal deleted successfully');
      } catch (err) {
        toast.error('Failed to delete deal');
      }
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <SkeletonCard />
          </motion.div>
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadDeals} />;
  }

  if (deals.length === 0) {
    return <EmptyState onAddDeal={onAddDeal} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {deals.map((deal, index) => (
        <motion.div
          key={deal.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <DealCard
            deal={deal}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default MainFeature;