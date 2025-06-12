import React from 'react';
import MotionDiv from '@/components/atoms/MotionDiv';
import Paragraph from '@/components/atoms/Paragraph';
import ApperIcon from '@/components/ApperIcon';

const FormField = ({ label, children, error }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-300">{label}</label>
    {children}
    {error && (
      <MotionDiv
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-error text-sm flex items-center space-x-1"
      >
        <ApperIcon name="AlertCircle" size={14} />
        <Paragraph>{error}</Paragraph>
      </MotionDiv>
    )}
  </div>
);

export default FormField;