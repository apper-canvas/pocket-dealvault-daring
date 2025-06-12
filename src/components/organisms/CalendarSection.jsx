import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from 'react-calendar';
import { format, parseISO, isSameDay } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import dealService from '@/services/api/dealService';

function CalendarSection() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    try {
      setLoading(true);
      const dealsData = await dealService.getAll();
      setDeals(dealsData);
    } catch (error) {
      console.error('Error loading deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const dealDates = deals
    .filter(deal => deal.purchaseDate)
    .map(deal => parseISO(deal.purchaseDate));

  const selectedDateDeals = deals.filter(deal => 
    deal.purchaseDate && isSameDay(parseISO(deal.purchaseDate), selectedDate)
  );

  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
      <div className="mb-4">
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="flex items-center justify-between w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <ApperIcon name="Calendar" size={16} className="text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Deal Calendar</span>
          </div>
          <ApperIcon 
            name={showCalendar ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-gray-500 dark:text-gray-400" 
          />
        </button>
      </div>

      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {loading ? (
              <div className="glass-morphism rounded-xl p-4 flex items-center justify-center">
                <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : (
              <>
                <div className="glass-morphism rounded-xl p-3 mb-4">
                  <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    className="w-full text-sm"
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

                {selectedDateDeals.length > 0 && (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Deals on {format(selectedDate, 'MMM dd, yyyy')}
                    </p>
                    {selectedDateDeals.map(deal => (
                      <div key={deal.id} className="glass-morphism rounded-lg p-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-primary rounded-md flex items-center justify-center">
                            <ApperIcon name="Package" size={12} className="text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                              {deal.productName}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              ${deal.salePrice}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CalendarSection;