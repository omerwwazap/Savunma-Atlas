import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from './DataContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import News from "./pages/News";
import About from "./pages/About";
import './i18n';

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DataProvider>
      <I18nextProvider i18n={i18n}>
          <Toaster />
          <BrowserRouter basename="/military-projects-hub">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/news" element={<News />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </BrowserRouter>
          </I18nextProvider>
      </DataProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
