// Main App component — Mobile PWA shell with dark mode and onboarding
import { useState, useCallback } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';
import { SplashScreen } from './components/SplashScreen';
import { Onboarding, shouldShowOnboarding } from './components/Onboarding';
import { ConnectivityIndicator } from './components/ConnectivityIndicator';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AnimatePresence } from 'motion/react';

function AppInner() {
  // Allow ?reset to restart onboarding (clear all app data)
  if (typeof window !== 'undefined' && window.location.search.includes('reset')) {
    localStorage.removeItem('ridechecka_onboarding_complete');
    localStorage.removeItem('ridechecka_user');
    window.location.href = '/';
    return null;
  }

  const [showSplash, setShowSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(shouldShowOnboarding);
  const { resolvedTheme } = useTheme();

  const handleSplashComplete = useCallback(() => {
    // Remove the inline HTML splash (from index.html) if still present
    const inlineSplash = document.getElementById('inline-splash');
    if (inlineSplash) inlineSplash.remove();
    setShowSplash(false);
    // Small delay before mounting the router so the exit animation finishes
    setTimeout(() => setAppReady(true), 80);
  }, []);

  const handleOnboardingComplete = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>
      <AnimatePresence>
        {!showSplash && showOnboarding && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}
      </AnimatePresence>
      <ConnectivityIndicator />
      {appReady && <RouterProvider router={router} />}
      <Toaster
        position="top-center"
        theme={resolvedTheme}
        toastOptions={{
          style: {
            borderRadius: '12px',
            fontSize: '14px',
          },
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
