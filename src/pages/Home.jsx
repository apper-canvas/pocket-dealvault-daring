import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-4xl mx-auto"
      >
        {/* Hero Section */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="Vault" size={40} className="text-white" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-display font-bold mb-4">
            <span className="gradient-text">DealVault</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Track, organize, and maximize your SaaS lifetime deal investments. 
            Never lose access to your tools or forget what you've purchased.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="glass-morphism rounded-2xl p-6">
            <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="DollarSign" size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Track Savings</h3>
            <p className="text-gray-400 text-sm">
              Monitor how much you've saved compared to regular subscription prices
            </p>
          </div>

          <div className="glass-morphism rounded-2xl p-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Package" size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Organize Deals</h3>
            <p className="text-gray-400 text-sm">
              Categorize and manage all your lifetime deals in one central location
            </p>
          </div>

          <div className="glass-morphism rounded-2xl p-6">
            <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="BarChart3" size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
            <p className="text-gray-400 text-sm">
              Get insights into your spending patterns and deal performance
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-x-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200"
          >
            <div className="flex items-center space-x-2">
              <ApperIcon name="LayoutDashboard" size={20} />
              <span>View Dashboard</span>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/add-deal')}
            className="glass-morphism text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-200"
          >
            <div className="flex items-center space-x-2">
              <ApperIcon name="Plus" size={20} />
              <span>Add First Deal</span>
            </div>
          </motion.button>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text">$2,450</div>
            <div className="text-gray-400 text-sm">Total Saved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">27</div>
            <div className="text-gray-400 text-sm">Active Deals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">73%</div>
            <div className="text-gray-400 text-sm">Avg Savings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">$890</div>
            <div className="text-gray-400 text-sm">Invested</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;