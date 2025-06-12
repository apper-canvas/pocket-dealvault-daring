import React from 'react';
import BaseCard from '@/components/atoms/BaseCard';

const MetricSkeletonCard = () => (
  <div className="glass-morphism rounded-2xl p-6">
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-xl"></div>
        <div className="text-right space-y-2">
          <div className="h-6 bg-gray-700 rounded w-16"></div>
          <div className="h-3 bg-gray-700 rounded w-12"></div>
        </div>
      </div>
      <div className="h-4 bg-gray-700 rounded w-24"></div>
    </div>
  </div>
);

export default MetricSkeletonCard;