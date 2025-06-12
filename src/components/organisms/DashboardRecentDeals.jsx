import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import dealService from '@/services/api/dealService';
import RecentDealDisplayCard from '@/components/molecules/RecentDealDisplayCard';
import Heading from '@/components/atoms/Heading';
import Button from '@/components/atoms/Button';
import MotionDiv from '@/components/atoms/MotionDiv';

const DashboardRecentDeals = ({ onViewAllDeals }) => {
  const [recentDeals, setRecentDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRecentDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const dealsData = await dealService.getAll();
      const sortedDeals = dealsData
        .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))
        .slice(0, 5);
      setRecentDeals(sortedDeals);
    } catch (err) {
      setError(err.message || 'Failed to load recent deals');
      toast.error('Failed to load recent deals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecentDeals();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 bg-gray-700 rounded w-32 animate-pulse"></div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-surface/50 rounded-xl p-4 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-700 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-24"></div>
                  <div className="h-3 bg-gray-700 rounded w-16"></div>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="h-4 bg-gray-700 rounded w-12"></div>
                <div className="h-3 bg-gray-700 rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-gray-400">
        Could not load recent deals: {error}
      </div>
    );
  }

  if (recentDeals.length === 0) {
    return null; // Don't show section if no recent deals
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <Heading level={2} className="text-xl font-display font-semibold text-white">Recent Deals</Heading>
        <Button
          onClick={onViewAllDeals}
          className="text-primary hover:text-secondary transition-colors text-sm font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {recentDeals.map((deal, index) => (
          <RecentDealDisplayCard key={deal.id} deal={deal} index={index} />
        ))}
      </div>
    </MotionDiv>
  );
};

export default DashboardRecentDeals;