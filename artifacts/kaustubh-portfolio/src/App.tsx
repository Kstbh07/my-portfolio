import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { Loader } from '@/components/sections/Loader';
import Home from '@/pages/home';
import ProjectsPage from '@/pages/projects';
import AboutPage from '@/pages/about';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutPage} />
      <Route path="/projects" component={ProjectsPage} />
      <Route>
        <div className="min-h-screen flex items-center justify-center bg-[#020104] text-primary font-mono text-xl">
          [404] SYSTEM FAULT - PATH NOT RESOLVED
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  const [booted, setBooted] = useState(false);

  // Lock body scroll during loader without wrapping the content in a div that
  // changes scroll-container semantics (which breaks framer-motion useScroll).
  useEffect(() => {
    document.body.style.overflow = booted ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [booted]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CustomCursor />
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>

        <AnimatePresence>
          {!booted && (
            <Loader onComplete={() => setBooted(true)} />
          )}
        </AnimatePresence>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
