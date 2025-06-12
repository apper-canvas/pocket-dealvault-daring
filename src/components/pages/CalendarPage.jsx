import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import { format, parseISO, isSameDay } from 'date-fns';
import MotionDiv from '@/components/atoms/MotionDiv';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import BaseCard from '@/components/atoms/BaseCard';
import ApperIcon from '@/components/ApperIcon';
import dealService from '@/services/api/dealService';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch deals on component mount
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const dealsData = await dealService.getAll();
        setDeals(dealsData || []);
      } catch (error) {
        console.error('Failed to fetch deals:', error);
        setDeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  // Calculate deal dates from deals data
  const dealDates = deals
    .filter(deal => deal.purchaseDate)
    .map(deal => {
      try {
        return typeof deal.purchaseDate === 'string' 
          ? parseISO(deal.purchaseDate) 
          : new Date(deal.purchaseDate);
      } catch (error) {
        console.error('Invalid date format:', deal.purchaseDate);
        return null;
      }
    })
    .filter(Boolean);

  // Get deals for selected date
  const selectedDateDeals = deals.filter(deal => {
    if (!deal.purchaseDate) return false;
    try {
      const dealDate = typeof deal.purchaseDate === 'string' 
        ? parseISO(deal.purchaseDate) 
        : new Date(deal.purchaseDate);
      return isSameDay(dealDate, selectedDate);
    } catch (error) {
      return false;
    }
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Heading level={1} className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Deal Calendar
        </Heading>
        <Paragraph className="text-gray-600 dark:text-gray-400">
          View and track your deals by date. Dates with deals are highlighted.
        </Paragraph>
      </MotionDiv>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-2">
          <BaseCard className="p-6">
            <div className="calendar-container">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                className="w-full react-calendar"
                tileClassName={({ date }) => {
                  const hasDeals = dealDates.some(dealDate => isSameDay(date, dealDate));
                  return hasDeals ? 'has-deals' : null;
                }}
                tileContent={({ date }) => {
                  const dayDeals = dealDates.filter(dealDate => isSameDay(date, dealDate));
                  return dayDeals.length > 0 ? (
                    <div className="w-2 h-2 bg-primary rounded-full mx-auto mt-1"></div>
                  ) : null;
                }}
              />
            </div>
          </BaseCard>
        </div>

        {/* Selected Date Details */}
        <div className="space-y-6">
          <BaseCard className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <ApperIcon name="Calendar" size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Selected Date
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {format(selectedDate, 'EEEE, MMMM dd, yyyy')}
                </p>
              </div>
            </div>

            {loading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Loading deals...</p>
              </div>
            )}

            {!loading && selectedDateDeals.length === 0 && (
              <div className="text-center py-6">
                <ApperIcon name="Package" size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No deals found for this date
                </p>
              </div>
            )}

            {!loading && selectedDateDeals.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Deals ({selectedDateDeals.length})
                </h4>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {selectedDateDeals.map(deal => (
                    <motion.div
                      key={deal.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="glass-morphism rounded-lg p-4"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                          <ApperIcon name="Package" size={16} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-gray-900 dark:text-white truncate">
                            {deal.productName}
                          </h5>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                              ${deal.salePrice}
                            </span>
                            {deal.originalPrice && (
                              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                ${deal.originalPrice}
                              </span>
                            )}
                          </div>
                          {deal.platform && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {deal.platform}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </BaseCard>

          {/* Calendar Stats */}
          <BaseCard className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="BarChart3" size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Calendar Stats
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This month's overview
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Deals</span>
                <span className="font-semibold text-gray-900 dark:text-white">{deals.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Days with Deals</span>
                <span className="font-semibold text-gray-900 dark:text-white">{dealDates.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Selected Date</span>
                <span className="font-semibold text-gray-900 dark:text-white">{selectedDateDeals.length}</span>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;