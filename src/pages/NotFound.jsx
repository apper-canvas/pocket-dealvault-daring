import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md mx-auto"
      >
        {/* 404 Icon */}
        <motion.div
          initial={{ rotateX: 90 }}
          animate={{ rotateX: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="FileQuestion" size={40} className="text-white" />
          </div>
          <div className="text-6xl font-bold gradient-text mb-4">404</div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-display font-bold text-white mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto bg-gradient-primary text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200"
          >
            <div className="flex items-center justify-center space-x-2">
              <ApperIcon name="Home" size={20} />
              <span>Go to Dashboard</span>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto glass-morphism text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-all duration-200"
          >
            <div className="flex items-center justify-center space-x-2">
              <ApperIcon name="ArrowLeft" size={20} />
              <span>Go Back</span>
            </div>
          </motion.button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex justify-center space-x-4"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                delay: i * 0.2
              }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;