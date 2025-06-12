import React from 'react';
import MotionDiv from '@/components/atoms/MotionDiv';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const HomeFeaturesSection = () => {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
    >
      <div className="glass-morphism rounded-2xl p-6">
        <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="DollarSign" size={24} className="text-white" />
        </div>
        <Heading level={3} className="text-lg font-semibold text-white mb-2">Track Savings</Heading>
        <Paragraph className="text-gray-400 text-sm">
          Monitor how much you've saved compared to regular subscription prices
        </Paragraph>
      </div>

      <div className="glass-morphism rounded-2xl p-6">
        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="Package" size={24} className="text-white" />
        </div>
        <Heading level={3} className="text-lg font-semibold text-white mb-2">Organize Deals</Heading>
        <Paragraph className="text-gray-400 text-sm">
          Categorize and manage all your lifetime deals in one central location
        </Paragraph>
      </div>

      <div className="glass-morphism rounded-2xl p-6">
        <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="BarChart3" size={24} className="text-white" />
        </div>
        <Heading level={3} className="text-lg font-semibold text-white mb-2">Analytics</Heading>
        <Paragraph className="text-gray-400 text-sm">
          Get insights into your spending patterns and deal performance
        </Paragraph>
      </div>
    </MotionDiv>
  );
};

export default HomeFeaturesSection;