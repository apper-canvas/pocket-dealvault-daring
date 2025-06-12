import React from 'react';
import MotionDiv from '@/components/atoms/MotionDiv';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Span from '@/components/atoms/Span';
import ActionButton from '@/components/molecules/ActionButton';

const CategoryItemCard = ({ category, dealStats, onEdit, onDelete, index }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-surface rounded-2xl p-6 border border-gray-700 hover:border-primary/50 transition-all duration-200 relative overflow-hidden group"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${category.color}20` }}
            >
              <ApperIcon name="FolderOpen" size={20} style={{ color: category.color }} />
            </div>
            <div>
              <Heading level={3} className="font-semibold text-white text-lg">{category.name}</Heading>
              <Paragraph className="text-gray-400 text-sm">{category.dealCount} deals</Paragraph>
            </div>
          </div>
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ActionButton
              onClick={() => onEdit(category)}
              iconName="Edit2"
              iconClassName="text-gray-400 hover:text-white"
            />
            <ActionButton
              onClick={() => onDelete(category.id)}
              iconName="Trash2"
              iconClassName="text-gray-400 hover:text-error"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Span className="text-gray-400">Total Spent</Span>
            <Span className="font-semibold text-white">${dealStats?.totalSpent || 0}</Span>
          </div>
          <div className="flex justify-between items-center">
            <Span className="text-gray-400">Total Saved</Span>
            <Span className="font-semibold text-success">${dealStats?.totalSaved || 0}</Span>
          </div>
          <div className="flex justify-between items-center">
            <Span className="text-gray-400">Avg Deal Value</Span>
            <Span className="font-semibold text-white">${Math.round(dealStats?.avgDealValue || 0)}</Span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between text-sm mb-2">
            <Span className="text-gray-400">Active Deals</Span>
            <Span className="text-white">{dealStats?.activeDeals || 0}/{category.dealCount}</Span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                backgroundColor: category.color,
                width: `${category.dealCount > 0 ? ((dealStats?.activeDeals || 0) / category.dealCount) * 100 : 0}%`
              }}
            ></div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default CategoryItemCard;