import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundSection from '@/components/organisms/NotFoundSection';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <NotFoundSection onGoToDashboard={handleGoToDashboard} onGoBack={handleGoBack} />
    </div>
  );
};

export default NotFoundPage;