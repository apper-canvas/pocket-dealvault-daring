import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddDealForm from '@/components/organisms/AddDealForm';
import MotionDiv from '@/components/atoms/MotionDiv';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';

const AddDealPage = () => {
  const navigate = useNavigate();

  const handleDealAdded = () => {
    navigate('/deals');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Button
            onClick={handleCancel}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ApperIcon name="ArrowLeft" size={20} className="text-gray-400 hover:text-white" />
          </Button>
          <div>
            <Heading level={1} className="text-3xl font-display font-bold text-white">Add New Deal</Heading>
            <Paragraph className="text-gray-400">Track your latest SaaS lifetime deal purchase</Paragraph>
          </div>
        </div>
      </MotionDiv>

      <AddDealForm onDealAdded={handleDealAdded} onCancel={handleCancel} />
    </div>
  );
};

export default AddDealPage;