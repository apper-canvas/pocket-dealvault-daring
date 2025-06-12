import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, className = '', ...props }) => {
  return (
    <motion.button 
      className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${className}`} 
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;