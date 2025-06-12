import React from 'react';
import MotionDiv from '@/components/atoms/MotionDiv';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Span from '@/components/atoms/Span';

const RecentDealDisplayCard = ({ deal, index }) => {
  const savings = deal.regularPrice - deal.purchasePrice;
  const savingsPercentage = Math.round((savings / deal.regularPrice) * 100);

  return (
    <MotionDiv
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center justify-between p-4 bg-surface/50 rounded-xl border border-gray-700/50 hover:border-primary/30 transition-all duration-200"
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
          <ApperIcon name="Package" size={16} className="text-white" />
        </div>
        <div>
          <Heading level={4} className="font-medium text-white">{deal.productName}</Heading>
          <Paragraph className="text-sm text-gray-400">{deal.platform}</Paragraph>
        </div>
      </div>
      <div className="text-right">
        <Span className="font-semibold text-success">${savings}</Span>
        <Paragraph className="text-xs text-gray-400">{savingsPercentage}% saved</Paragraph>
      </div>
    </MotionDiv>
  );
};

export default RecentDealDisplayCard;