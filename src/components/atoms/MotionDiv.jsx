import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = ({ children, className = '', ...props }) => {
  return (
    <motion.div className={className} {...props}>
      {children}
    </motion.div>
  );
};

export default MotionDiv;