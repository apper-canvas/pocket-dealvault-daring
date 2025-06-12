import React from 'react';
import MotionDiv from '@/components/atoms/MotionDiv';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const HomeHeroSection = () => {
  return (
    <MotionDiv
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-8"
    >
      <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
        <ApperIcon name="Vault" size={40} className="text-white" />
      </div>
      <Heading level={1} className="text-5xl lg:text-6xl font-display font-bold mb-4">
        <Span className="gradient-text">DealVault</Span>
      </Heading>
      <Paragraph className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Track, organize, and maximize your SaaS lifetime deal investments. 
        Never lose access to your tools or forget what you've purchased.
      </Paragraph>
    </MotionDiv>
  );
};

export default HomeHeroSection;