import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, isLight } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`p-2 rounded-lg hover:bg-gray-200/20 dark:hover:bg-gray-700 transition-all duration-200 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <ApperIcon 
          name={isLight ? "Moon" : "Sun"} 
          size={20} 
          className="text-gray-600 dark:text-gray-300" 
        />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;