import React from 'react';
import { useNavigate } from 'react-router-dom';
import MotionDiv from '@/components/atoms/MotionDiv';
import AnimatedButton from '@/components/molecules/AnimatedButton';
import HomeHeroSection from '@/components/organisms/HomeHeroSection';
import HomeFeaturesSection from '@/components/organisms/HomeFeaturesSection';
import HomeStatsPreview from '@/components/organisms/HomeStatsPreview';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-4xl mx-auto"
      >
        <HomeHeroSection />

        <HomeFeaturesSection />

        {/* CTA Buttons */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-x-4"
        >
          <AnimatedButton
            className="bg-gradient-primary text-white"
            icon="LayoutDashboard"
            onClick={() => navigate('/dashboard')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Dashboard
          </AnimatedButton>
          
          <AnimatedButton
            className="glass-morphism text-white hover:bg-white/20"
            shadowClass=""
            icon="Plus"
            onClick={() => navigate('/add-deal')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add First Deal
          </AnimatedButton>
        </MotionDiv>

        <HomeStatsPreview />
      </MotionDiv>
    </div>
  );
};

export default HomePage;