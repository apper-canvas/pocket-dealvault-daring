import React from 'react';
import MotionDiv from '@/components/atoms/MotionDiv';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const HomeStatsPreview = () => {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
    >
      <div className="text-center">
        <Heading level={2} className="text-2xl font-bold gradient-text">$2,450</Heading>
        <Paragraph className="text-gray-400 text-sm">Total Saved</Paragraph>
      </div>
      <div className="text-center">
        <Heading level={2} className="text-2xl font-bold text-white">27</Heading>
        <Paragraph className="text-gray-400 text-sm">Active Deals</Paragraph>
      </div>
      <div className="text-center">
        <Heading level={2} className="text-2xl font-bold text-success">73%</Heading>
        <Paragraph className="text-gray-400 text-sm">Avg Savings</Paragraph>
      </div>
      <div className="text-center">
        <Heading level={2} className="text-2xl font-bold text-white">$890</Heading>
        <Paragraph className="text-gray-400 text-sm">Invested</Paragraph>
      </div>
    </MotionDiv>
  );
};

export default HomeStatsPreview;