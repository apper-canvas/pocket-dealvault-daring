import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import ThemeToggle from '@/components/molecules/ThemeToggle';
import { navRoutes } from '@/config/routes';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Fetch deals on component mount
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Mobile Header */}
      <header className="lg:hidden flex-shrink-0 h-16 bg-white dark:bg-surface border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <ApperIcon name="Vault" size={18} className="text-white" />
          </div>
          <h1 className="text-xl font-display font-bold gradient-text">DealVault</h1>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
<aside className="hidden lg:block w-64 bg-white dark:bg-surface border-r border-gray-200 dark:border-gray-700 z-40">
          <div className="h-full flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <ApperIcon name="Vault" size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-display font-bold gradient-text">DealVault</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Lifetime Deal Tracker</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
              {navRoutes.map(route => (
                <NavLink
                  key={route.id}
                  to={route.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-primary text-white shadow-lg shadow-primary/25'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <ApperIcon name={route.icon} size={20} />
<span>{route.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Bottom section */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="glass-morphism rounded-xl p-4 flex-1 mr-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-success rounded-lg flex items-center justify-center">
                      <ApperIcon name="DollarSign" size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Total Saved</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Track your savings</p>
                    </div>
                  </div>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
                onClick={toggleMobileMenu}
              />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "tween", duration: 0.3 }}
className="lg:hidden fixed left-0 top-0 h-full w-72 bg-white dark:bg-surface border-r border-gray-200 dark:border-gray-700 z-50"
              >
                <div className="h-full flex flex-col">
                  {/* Mobile Logo */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                          <ApperIcon name="Vault" size={20} className="text-white" />
                        </div>
                        <div>
                          <h1 className="text-xl font-display font-bold gradient-text">DealVault</h1>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Lifetime Deal Tracker</p>
                        </div>
                      </div>
                      <button
                        onClick={toggleMobileMenu}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <ApperIcon name="X" size={20} className="text-gray-600 dark:text-gray-300" />
                      </button>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="p-4 space-y-2">
                    {navRoutes.map(route => (
                      <NavLink
                        key={route.id}
                        to={route.path}
                        onClick={toggleMobileMenu}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-gradient-primary text-white shadow-lg shadow-primary/25'
                              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`
                        }
                      >
                        <ApperIcon name={route.icon} size={20} />
                        <span>{route.label}</span>
                      </NavLink>
                    ))}
</nav>

                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-background">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};
export default Layout;