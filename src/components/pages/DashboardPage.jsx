import React from 'react'
import { useNavigate } from 'react-router-dom'
import MotionDiv from '@/components/atoms/MotionDiv'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import Button from '@/components/atoms/Button'
import AnimatedButton from '@/components/molecules/AnimatedButton'
import DashboardSummaryMetrics from '@/components/organisms/DashboardSummaryMetrics'
import DashboardRecentDeals from '@/components/organisms/DashboardRecentDeals'
import AllDealsGrid from '@/components/organisms/AllDealsGrid'

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleAddDeal = () => {
    navigate('/add-deal');
  };

  const handleViewAllDeals = () => {
    navigate('/deals');
  };

  return (
    <div className="p-6 max-w-full overflow-hidden">
      {/* Header */}
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Heading level={1} className="text-3xl font-display font-bold text-white mb-2">Dashboard</Heading>
        <Paragraph className="text-gray-400">Track your SaaS lifetime deal investments and savings</Paragraph>
      </MotionDiv>

      {/* Metrics Grid */}
      <DashboardSummaryMetrics />

      {/* Quick Actions */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap gap-4 mb-8"
      >
        <AnimatedButton
          className="bg-gradient-primary text-white"
          icon="Plus"
          onClick={handleAddDeal}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Add New Deal
        </AnimatedButton>
        
        <AnimatedButton
          className="glass-morphism text-white hover:bg-white/20"
          shadowClass=""
          icon="Package"
          onClick={handleViewAllDeals}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View All Deals
        </AnimatedButton>
      </MotionDiv>

      {/* Recent Deals */}
      <DashboardRecentDeals onViewAllDeals={handleViewAllDeals} />

      {/* Main Feature - All Deals (simplified for dashboard) */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center justify-between mb-6">
          <Heading level={2} className="text-xl font-display font-semibold text-white">All Deals (Overview)</Heading>
          <Button
            onClick={handleViewAllDeals}
            className="text-primary hover:text-secondary transition-colors text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See More
          </Button>
        </div>
        {/*
          For dashboard, instead of full AllDealsGrid which has filtering,
          we might want a simpler list or a preview component here.
          For now, re-using AllDealsGrid to retain functionality, but
          ideally, this would be a more compact "Latest Deals" organism.
          The current AllDealsGrid handles its own data loading and display,
          which is good for a full page but less ideal as a section within another page
          without prop drilling to control its behavior or limit data.
          For this refactor, I'll put a placeholder and assume AllDealsGrid can be used directly or replaced by a dedicated dashboard component if required.
          To keep it simple and fulfill the "preserve all functionality", AllDealsGrid is used as is.
          If AllDealsGrid fetches all deals, it's redundant here. The existing `MainFeature` logic is better here.
          Let's create a specific "LatestDealsPreview" organism that fetches its own 3-5 latest deals.
        */}
        <DashboardRecentDeals onViewAllDeals={handleViewAllDeals} />
      </MotionDiv>
    </div>
  );
};

export default DashboardPage;