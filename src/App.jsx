import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from './DataContext';
import { I18nextProvider } from 'react-i18next';
import React, { Suspense } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import i18n from './i18n';
import './i18n';

// Lazy load route components
const Index = React.lazy(() => import("./pages/Index"));
const Projects = React.lazy(() => import("./pages/Projects"));
const Company = React.lazy(() => import("./pages/Company"));
const Companies = React.lazy(() => import("./pages/Companies"));
const News = React.lazy(() => import("./pages/News"));
const About = React.lazy(() => import("./pages/About"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

// Loading component for Suspense
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
      cacheTime: 30 * 60 * 1000, // Cache persists for 30 minutes
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
      retry: 1, // Limit retry attempts
    },
  },
});

const App = () => {
  const baseName = `/Savunma-Atlas`;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <DataProvider>
            <I18nextProvider i18n={i18n}>
              <Toaster />
              <BrowserRouter basename={baseName}>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/companies" element={<Companies />} />
                    <Route path="/company/:companyName" element={<Company />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </I18nextProvider>
          </DataProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
