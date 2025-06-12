import React from 'react';
import MotionDiv from '@/components/atoms/MotionDiv';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Span from '@/components/atoms/Span';
import ActionButton from '@/components/molecules/ActionButton';
import StatusBadge from '@/components/molecules/StatusBadge';
import PillBadge from '@/components/molecules/PillBadge';

const DealItemCard = ({ deal, onEdit, onDelete, index, className = '' }) => {
  const savings = deal.regularPrice - deal.purchasePrice;
  const savingsPercentage = Math.round((savings / deal.regularPrice) * 100);

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`bg-surface rounded-2xl p-6 border border-gray-700 hover:border-primary/50 transition-all duration-200 relative overflow-hidden group ${className}`}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <ApperIcon name="Package" size={20} className="text-white" />
            </div>
            <div>
              <Heading level={3} className="font-semibold text-white text-lg">{deal.productName}</Heading>
              <Paragraph className="text-gray-400 text-sm">{deal.platform}</Paragraph>
            </div>
          </div>
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ActionButton
              onClick={() => onEdit(deal)}
              iconName="Edit2"
              iconClassName="text-gray-400 hover:text-white"
            />
            <ActionButton
              onClick={() => onDelete(deal.id)}
              iconName="Trash2"
              iconClassName="text-gray-400 hover:text-error"
            />
          </div>
        </div>

        {/* Description */}
        <Paragraph className="text-gray-300 text-sm mb-4 line-clamp-2">{deal.description}</Paragraph>

        {/* Price and Savings */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <Span className="text-gray-400">Purchase Price</Span>
            <Span className="font-semibold text-white">${deal.purchasePrice}</Span>
          </div>
          <div className="flex justify-between items-center">
            <Span className="text-gray-400">Regular Price</Span>
            <Span className="font-semibold text-gray-300 line-through">${deal.regularPrice}</Span>
          </div>
          <div className="flex justify-between items-center">
            <Span className="text-success">Savings</Span>
            <div className="flex items-center space-x-2">
              <Span className="font-bold text-success">${savings}</Span>
              <Span className="bg-success/20 text-success px-2 py-1 rounded-lg text-xs font-medium">
                {savingsPercentage}% OFF
              </Span>
            </div>
          </div>
        </div>

        {/* Category and Status */}
        <div className="flex items-center justify-between mb-4">
          <PillBadge className="bg-primary/20 text-primary">{deal.category}</PillBadge>
          <StatusBadge status={deal.status}>
            {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
          </StatusBadge>
        </div>

        {/* Purchase Date */}
        <Paragraph className="text-xs text-gray-400 mb-4">
          Purchased: {new Date(deal.purchaseDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </Paragraph>

        {/* Access URL */}
        {deal.accessUrl && (
          <div className="pt-4 border-t border-gray-700">
            <a
              href={deal.accessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-primary hover:text-secondary transition-colors"
            >
              <ApperIcon name="ExternalLink" size={14} />
              <Span className="text-sm font-medium">Access Product</Span>
            </a>
          </div>
        )}
      </div>
    </MotionDiv>
  );
};

export default DealItemCard;