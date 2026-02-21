// Page transition wrapper for native-like navigation
import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.25,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Slide-in variant for push navigation (e.g., Results page)
export function SlideTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ x: '30%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-15%', opacity: 0 }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
