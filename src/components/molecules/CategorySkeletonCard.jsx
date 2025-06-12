import React from 'react';
import BaseCard from '@/components/atoms/BaseCard';

const CategorySkeletonCard = () => (
  <BaseCard>
    <div className="animate-pulse">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-xl"></div>
        <div className="space-y-2">
          <div className="h-5 bg-gray-700 rounded w-24"></div>
          <div className="h-3 bg-gray-700 rounded w-16"></div>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-3 bg-gray-700 rounded w-20"></div>
            <div className="h-3 bg-gray-700 rounded w-16"></div>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-gray-700">
        <div className="flex justify-between mb-2">
          <div className="h-3 bg-gray-700 rounded w-20"></div>
          <div className="h-3 bg-gray-700 rounded w-12"></div>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full"></div>
      </div>
    </div>
  </BaseCard>
);

export default CategorySkeletonCard;