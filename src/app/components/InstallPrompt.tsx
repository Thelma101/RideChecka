// PWA Install Prompt banner with dark mode support
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Smartphone } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../contexts/ThemeContext';

export function InstallPrompt() {
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    const dismissed = localStorage.getItem('ridechecka_install_dismissed');
    if (dismissed) return;

    if (window.matchMedia('(display-mode: standalone)').matches) return;

    const ua = navigator.userAgent;
    const isiOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(isiOS);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setShowBanner(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler as any);

    if (isiOS) {
      setTimeout(() => setShowBanner(true), 5000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler as any);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setShowIOSGuide(false);
    localStorage.setItem('ridechecka_install_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto"
        >
          <div className={`rounded-2xl shadow-2xl overflow-hidden ${
            isDark
              ? 'bg-gray-900 border border-gray-800'
              : 'bg-white border border-gray-100'
          }`}>
            {!showIOSGuide ? (
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isDark ? 'bg-green-900/40' : 'bg-green-100'
                  }`}>
                    <Smartphone className={`w-6 h-6 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={isDark ? 'text-white' : 'text-gray-900'} style={{ fontSize: '15px', fontWeight: 600 }}>
                      Install RideChecka
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Add to your home screen for the full app experience
                    </p>
                  </div>
                  <button
                    onClick={handleDismiss}
                    className={`p-1 -mt-1 -mr-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    onClick={handleInstall}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-1.5" />
                    Install App
                  </Button>
                  <Button
                    onClick={handleDismiss}
                    variant="ghost"
                    size="sm"
                    className={isDark ? 'text-gray-400' : 'text-gray-500'}
                  >
                    Not now
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className={isDark ? 'text-white' : 'text-gray-900'} style={{ fontSize: '15px', fontWeight: 600 }}>
                    Install on iOS
                  </h3>
                  <button onClick={handleDismiss} className={`p-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className={`space-y-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {[
                    'Tap the Share button in Safari',
                    'Scroll down and tap "Add to Home Screen"',
                    'Tap "Add" to install',
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isDark ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-100 text-blue-600'
                      }`} style={{ fontWeight: 600 }}>
                        {i + 1}
                      </div>
                      <span dangerouslySetInnerHTML={{ __html: step.replace(/"([^"]+)"/g, '<strong>"$1"</strong>') }} />
                    </div>
                  ))}
                </div>
                <Button
                  onClick={handleDismiss}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  Got it
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
