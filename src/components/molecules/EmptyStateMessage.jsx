import React from 'react';
import MotionDiv from '@/components/atoms/MotionDiv';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import AnimatedButton from '@/components/molecules/AnimatedButton';
import GradientIconWrapper from '@/components/atoms/GradientIconWrapper';

const EmptyStateMessage = ({ iconName, title, message, buttonText, onButtonClick, showButton = true }) => (
  <MotionDiv
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="text-center py-16"
  >
    <MotionDiv
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 3 }}
      className="mb-6"
    >
      <GradientIconWrapper 
        iconName={iconName} 
        iconSize={40} 
        wrapperClassName="w-20 h-20 rounded-2xl mx-auto" 
        gradientClass="bg-gradient-primary" 
      />
    </MotionDiv>
    <Heading level={3} className="text-2xl font-display font-bold text-white mb-2">{title}</Heading>
    <Paragraph className="text-gray-400 mb-6 max-w-md mx-auto">{message}</Paragraph>
    {showButton && onButtonClick && buttonText && (
      <AnimatedButton
        className="bg-gradient-primary text-white"
        icon="Plus"
        onClick={onButtonClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {buttonText}
      </AnimatedButton>
    )}
  </MotionDiv>
);

export default EmptyStateMessage;