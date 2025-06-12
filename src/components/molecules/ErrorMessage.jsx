import React from 'react';
import MotionDiv from '@/components/atoms/MotionDiv';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import AnimatedButton from '@/components/molecules/AnimatedButton';
import GradientIconWrapper from '@/components/atoms/GradientIconWrapper';

const ErrorMessage = ({ message, onRetry }) => (
  <MotionDiv
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-16"
  >
    <GradientIconWrapper 
      iconName="AlertCircle" 
      iconSize={32} 
      wrapperClassName="w-16 h-16 bg-error/20 rounded-xl mx-auto mb-4" 
      iconClassName="text-error" 
    />
    <Heading level={3} className="text-xl font-semibold text-white mb-2">Something went wrong</Heading>
    <Paragraph className="text-gray-400 mb-6">{message}</Paragraph>
    {onRetry && (
      <AnimatedButton
        className="bg-gradient-primary text-white"
        onClick={onRetry}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Try Again
      </AnimatedButton>
    )}
  </MotionDiv>
);

export default ErrorMessage;