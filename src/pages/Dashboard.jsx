import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import MainFeature from '../components/MainFeature';
import dealService from '../services/api/dealService';

const MetricCard = ({ icon, label, value, subValue, gradient, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass-morphism rounded-2xl p-6 hover:bg-white/10 transition-all duration-200"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 ${gradient} rounded-xl flex items-center justify-center`}>
        <ApperIcon name={icon} size={24} className="text-white" />
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-white">{value}</div>
        {subValue && <div className="text-sm text-gray-400">{subValue}</div>}
      </div>
    </div>
    <p className="text-gray-300 font-medium">{label}</p>
  </motion.div>
);

const RecentDealCard = ({ deal, index }) => {
  const savings = deal.regularPrice - deal.purchasePrice;
  const savingsPercentage = Math.round((savings / deal.regularPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center justify-between p-4 bg-surface/50 rounded-xl border border-gray-700/50 hover:border-primary/30 transition-all duration-200"
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
          <ApperIcon name="Package" size={16} className="text-white" />
        </div>
        <div>
          <h4 className="font-medium text-white">{deal.productName}</h4>
          <p className="text-sm text-gray-400">{deal.platform}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="font-semibold text-success">${savings}</div>
        <div className="text-xs text-gray-400">{savingsPercentage}% saved</div>
      </div>
    </motion.div>
  );
};

const SkeletonMetric = () => (
  <div className="glass-morphism rounded-2xl p-6">
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-xl"></div>
        <div className="text-right space-y-2">
          <div className="h-6 bg-gray-700 rounded w-16"></div>
          <div className="h-3 bg-gray-700 rounded w-12"></div>
        </div>
      </div>
      <div className="h-4 bg-gray-700 rounded w-24"></div>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentDeals, setRecentDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, dealsData] = await Promise.all([
        dealService.getStats(),
        dealService.getAll()
      ]);
      
      setStats(statsData);
      // Get the 5 most recent deals
      const sortedDeals = dealsData
        .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))
        .slice(0, 5);
      setRecentDeals(sortedDeals);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleAddDeal = () => {
    navigate('/add-deal');
  };

  if (loading) {
    return (
      <div className="p-6 max-w-full overflow-hidden">
        {/* Header */}
        <div className="mb-8">
          <div className="h-8 bg-gray-700 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-64 animate-pulse"></div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <SkeletonMetric key={i} />
          ))}
        </div>

        {/* Recent Deals */}
        <div className="space-y-4">
          <div className="h-6 bg-gray-700 rounded w-32 animate-pulse"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-surface/50 rounded-xl p-4 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-24"></div>
                    <div className="h-3 bg-gray-700 rounded w-16"></div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-12"></div>
                  <div className="h-3 bg-gray-700 rounded w-16"></div>
                </div>
              </div>
            </div>
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
          onClick={loadDashboardData}
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
        <h1 className="text-3xl font-display font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Track your SaaS lifetime deal investments and savings</p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon="DollarSign"
          label="Total Invested"
          value={`$${stats?.totalSpent?.toLocaleString() || '0'}`}
          gradient="bg-gradient-primary"
          delay={0.1}
        />
        <MetricCard
          icon="PiggyBank"
          label="Total Saved"
          value={`$${stats?.totalSaved?.toLocaleString() || '0'}`}
          subValue={`${stats?.savingsPercentage || 0}% saved`}
          gradient="bg-gradient-success"
          delay={0.2}
        />
        <MetricCard
          icon="Package"
          label="Active Deals"
          value={stats?.activeDeals?.toString() || '0'}
          subValue={`of ${stats?.totalDeals || 0} total`}
          gradient="bg-gradient-secondary"
          delay={0.3}
        />
        <MetricCard
          icon="TrendingUp"
          label="Avg Deal Value"
          value={`$${Math.round(stats?.averageDealValue || 0)}`}
          gradient="bg-gradient-card"
          delay={0.4}
        />
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap gap-4 mb-8"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddDeal}
          className="bg-gradient-primary text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200"
        >
          <div className="flex items-center space-x-2">
            <ApperIcon name="Plus" size={20} />
            <span>Add New Deal</span>
          </div>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/deals')}
          className="glass-morphism text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-all duration-200"
        >
          <div className="flex items-center space-x-2">
            <ApperIcon name="Package" size={20} />
            <span>View All Deals</span>
          </div>
        </motion.button>
      </motion.div>

      {/* Recent Deals */}
      {recentDeals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-semibold text-white">Recent Deals</h2>
            <button
              onClick={() => navigate('/deals')}
              className="text-primary hover:text-secondary transition-colors text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentDeals.map((deal, index) => (
              <RecentDealCard key={deal.id} deal={deal} index={index} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Main Feature - All Deals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-semibold text-white">All Deals</h2>
        </div>
        <MainFeature onAddDeal={handleAddDeal} />
      </motion.div>
    </div>
  );
};

export default Dashboard;