// Splash screen for app-like loading experience
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 500);
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Detect system dark mode for splash
  const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const stored = typeof window !== 'undefined' ? localStorage.getItem('ridechecka_theme') : null;
  const isDark = stored === 'dark' || (stored !== 'light' && prefersDark);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${
            isDark
              ? 'bg-gradient-to-br from-green-900 via-green-950 to-emerald-950'
              : 'bg-gradient-to-br from-green-600 via-green-700 to-emerald-800'
          }`}
        >
          {/* Animated logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-8"
          >
            <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl ${
              isDark ? 'bg-gray-900' : 'bg-white'
            }`}>
              <span className="text-5xl">🚗</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-white text-3xl mb-2 tracking-tight"
            style={{ fontWeight: 700 }}
          >
            RideChecka
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-green-200 text-sm"
          >
            Compare. Save. Ride Smart.
          </motion.p>

          {/* Loading dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-2 mt-12"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white/60 rounded-full"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
