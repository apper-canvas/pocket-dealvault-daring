import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import MotionDiv from '@/components/atoms/MotionDiv';
import GradientIconWrapper from '@/components/atoms/GradientIconWrapper';

const NotFoundSection = ({ onGoToDashboard, onGoBack }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center max-w-md mx-auto"
    >
      {/* 404 Icon */}
      <MotionDiv
        initial={{ rotateX: 90 }}
        animate={{ rotateX: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-8"
      >
        <GradientIconWrapper 
          iconName="FileQuestion" 
          iconSize={40} 
          wrapperClassName="w-24 h-24 rounded-3xl mx-auto mb-6" 
          gradientClass="bg-gradient-primary" 
        />
        <Heading level={2} className="text-6xl font-bold gradient-text mb-4">404</Heading>
      </MotionDiv>

      {/* Error Message */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <Heading level={1} className="text-2xl font-display font-bold text-white mb-2">
          Page Not Found
        </Heading>
        <Paragraph className="text-gray-400 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </Paragraph>
      </MotionDiv>

      {/* Action Buttons */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
      >
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onGoToDashboard}
          className="w-full sm:w-auto bg-gradient-primary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40"
        >
          <div className="flex items-center justify-center space-x-2">
            <ApperIcon name="Home" size={20} />
            <span>Go to Dashboard</span>
          </div>
        </Button>
        
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onGoBack}
          className="w-full sm:w-auto glass-morphism text-white hover:bg-white/20"
        >
          <div className="flex items-center justify-center space-x-2">
            <ApperIcon name="ArrowLeft" size={20} />
            <span>Go Back</span>
          </div>
        </Button>
      </MotionDiv>

      {/* Decorative Elements */}
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 flex justify-center space-x-4"
      >
        {[...Array(3)].map((_, i) => (
          <MotionDiv
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
      </MotionDiv>
    </MotionDiv>
  );
};

export default NotFoundSection;