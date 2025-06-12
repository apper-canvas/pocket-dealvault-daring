import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import dealService from '@/services/api/dealService';
import MetricDisplayCard from '@/components/molecules/MetricDisplayCard';
import MetricSkeletonCard from '@/components/molecules/MetricSkeletonCard';
import MotionDiv from '@/components/atoms/MotionDiv';

const DashboardSummaryMetrics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const statsData = await dealService.getStats();
      setStats(statsData);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard stats');
      toast.error('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <MetricSkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-gray-400">
        Could not load metrics: {error}
      </div>
    );
  }

return (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-6 mb-8">
      <MetricDisplayCard
        icon="DollarSign"
        label="Lifetime Spends"
        value={`$${stats?.totalSpent?.toLocaleString() || '0'}`}
        gradient="bg-gradient-primary"
        delay={0.1}
      />
      <MetricDisplayCard
        icon="PiggyBank"
        label="Total Saved"
        value={`$${stats?.totalSaved?.toLocaleString() || '0'}`}
        subValue={`${stats?.savingsPercentage || 0}% saved`}
        gradient="bg-gradient-success"
        delay={0.2}
      />
      <MetricDisplayCard
        icon="Package"
        label="Active Deals"
        value={stats?.activeDeals?.toString() || '0'}
        subValue={`of ${stats?.totalDeals || 0} total`}
        gradient="bg-gradient-secondary"
        delay={0.3}
      />
      <MetricDisplayCard
        icon="TrendingUp"
        label="Avg Deal Value"
        value={`$${Math.round(stats?.averageDealValue || 0)}`}
        gradient="bg-gradient-card"
        delay={0.4}
      />
      <MetricDisplayCard
        icon="RefreshCw"
        label="Refund Rate"
        value={`${stats?.refundRate?.toFixed(1) || '0.0'}%`}
        subValue="Average refund rate"
        gradient="bg-gradient-warning"
        delay={0.5}
      />
      <MetricDisplayCard
        icon="PackageX"
        label="Unused LTDs"
        value={stats?.unusedLTDs?.toString() || '0'}
        subValue="Expired deals"
        gradient="bg-gradient-info"
        delay={0.6}
      />
      <MetricDisplayCard
        icon="XCircle"
        label="Failed LTDs"
        value={stats?.failedLTDs?.toString() || '0'}
        subValue="Cancelled deals"
        gradient="bg-gradient-accent"
        delay={0.7}
      />
    </div>
  );
};

export default DashboardSummaryMetrics;