import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import dealService from '@/services/api/dealService';
import categoryService from '@/services/api/categoryService';
import platformService from '@/services/api/platformService';
import DealItemCard from '@/components/molecules/DealItemCard';
import DealSkeletonCard from '@/components/molecules/DealSkeletonCard';
import FilterBar from '@/components/molecules/FilterBar';
import EmptyStateMessage from '@/components/molecules/EmptyStateMessage';
import ErrorMessage from '@/components/molecules/ErrorMessage';
import MotionDiv from '@/components/atoms/MotionDiv';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';

const AllDealsGrid = () => {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dealsData, categoriesData, platformsData] = await Promise.all([
        dealService.getAll(),
        categoryService.getAll(),
        platformService.getAll()
      ]);
      
      setDeals(dealsData);
      setFilteredDeals(dealsData);
      setCategories(categoriesData);
      setPlatforms(platformsData);
    } catch (err) {
      setError(err.message || 'Failed to load deals');
      toast.error('Failed to load deals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter deals based on search and filters
  useEffect(() => {
    let filtered = [...deals];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(deal =>
        deal.productName.toLowerCase().includes(query) ||
        deal.description.toLowerCase().includes(query) ||
        deal.platform.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(deal => deal.category === selectedCategory);
    }

    // Platform filter
    if (selectedPlatform) {
      filtered = filtered.filter(deal => deal.platform === selectedPlatform);
    }

    // Status filter
    if (selectedStatus) {
      filtered = filtered.filter(deal => deal.status === selectedStatus);
    }

    setFilteredDeals(filtered);
  }, [deals, searchQuery, selectedCategory, selectedPlatform, selectedStatus]);

  const handleEdit = (deal) => {
    toast.info(`Editing ${deal.productName}`);
  };

  const handleDelete = async (dealId) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await dealService.delete(dealId);
        const updatedDeals = deals.filter(deal => deal.id !== dealId);
        setDeals(updatedDeals);
        toast.success('Deal deleted successfully');
      } catch (err) {
        toast.error('Failed to delete deal');
      }
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedPlatform('');
    setSelectedStatus('');
  };

  if (loading) {
    return (
      <div className="max-w-full overflow-hidden">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-gray-700 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-64 animate-pulse"></div>
        </div>

        {/* Filter Bar Skeleton */}
        <div className="bg-surface rounded-2xl p-6 mb-6 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-700 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Deals Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <DealSkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadData} />;
  }

  const filtersActive = searchQuery || selectedCategory || selectedPlatform || selectedStatus;

  return (
    <div className="max-w-full overflow-hidden">
      {/* Header */}
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <Heading level={1} className="text-3xl font-display font-bold text-white mb-2">All Deals</Heading>
            <Paragraph className="text-gray-400">
              {filteredDeals.length} of {deals.length} deals
            </Paragraph>
          </div>
          {filtersActive && (
            <Button
              onClick={clearFilters}
              className="text-primary hover:text-secondary transition-colors text-sm font-medium flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon name="X" size={16} />
              <span>Clear Filters</span>
            </Button>
          )}
        </div>
      </MotionDiv>

      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        categories={categories}
        platforms={platforms}
      />

      {/* Deals Grid */}
      <AnimatePresence>
        {filteredDeals.length === 0 ? (
          <EmptyStateMessage
            iconName="Search"
            title="No deals found"
            message={filtersActive ? "Try adjusting your filters to find more deals" : "Start building your collection by adding your first deal"}
            buttonText={filtersActive ? null : "Add Your First Deal"}
            showButton={!filtersActive}
            onButtonClick={() => toast.info("Add Deal functionality goes here!")} // Placeholder
          />
        ) : (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredDeals.map((deal, index) => (
              <DealItemCard
                key={deal.id}
                deal={deal}
                onEdit={handleEdit}
                onDelete={handleDelete}
                index={index}
              />
            ))}
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllDealsGrid;