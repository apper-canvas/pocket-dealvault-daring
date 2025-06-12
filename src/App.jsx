import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './Layout';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { routes, routeArray } from '@/config/routes';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="h-screen bg-gray-50 dark:bg-background text-gray-900 dark:text-white overflow-hidden transition-colors duration-200">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              {routeArray.map(route => (
                <Route 
                  key={route.id}
                  path={route.path} 
                  element={<route.component />} 
                />
              ))}
            </Route>
          </Routes>
          
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            toastClassName="!bg-white dark:!bg-surface !text-gray-900 dark:!text-white !border !border-gray-200 dark:!border-gray-700"
            progressClassName="!bg-gradient-primary"
            className="z-[9999]"
          />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;