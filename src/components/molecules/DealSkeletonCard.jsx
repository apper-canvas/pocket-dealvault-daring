import React from 'react';
import BaseCard from '@/components/atoms/BaseCard';

const DealSkeletonCard = () => (
  <BaseCard>
    <div className="animate-pulse">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-xl"></div>
        <div className="space-y-2">
          <div className="h-5 bg-gray-700 rounded w-32"></div>
          <div className="h-3 bg-gray-700 rounded w-20"></div>
        </div>
      </div>
      <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="space-y-3 mb-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-3 bg-gray-700 rounded w-20"></div>
            <div className="h-3 bg-gray-700 rounded w-16"></div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mb-4">
        <div className="h-6 bg-gray-700 rounded w-20"></div>
        <div className="h-6 bg-gray-700 rounded w-16"></div>
      </div>
    </div>
  </BaseCard>
);

export default DealSkeletonCard;