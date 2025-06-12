import React from 'react';
import MotionDiv from '@/components/atoms/MotionDiv';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Span from '@/components/atoms/Span';
import GradientIconWrapper from '@/components/atoms/GradientIconWrapper';

const MetricDisplayCard = ({ icon, label, value, subValue, gradient, delay = 0 }) => (
<MotionDiv
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass-morphism rounded-2xl p-6 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200"
  >
    <div className="flex items-center justify-between mb-4">
      <GradientIconWrapper iconName={icon} gradientClass={gradient} iconSize={24} />
      <div className="text-right">
        <Heading level={2} className="text-2xl font-bold text-gray-900 dark:text-white">{value}</Heading>
        {subValue && <Paragraph className="text-sm text-gray-500 dark:text-gray-400">{subValue}</Paragraph>}
      </div>
    </div>
    <Paragraph className="text-gray-700 dark:text-gray-300 font-medium">{label}</Paragraph>
  </MotionDiv>
);

export default MetricDisplayCard;