import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SupabaseProvider } from './SupabaseContext';
import { LanguageProvider } from './LanguageContext';
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import News from "./pages/News";
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SupabaseProvider>
        <LanguageProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/news" element={<News />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </SupabaseProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
