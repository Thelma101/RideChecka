// Bottom navigation — native mobile app style with dark mode
import { Home, Heart, History, User } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { t } from '../utils/i18n';
import { getLanguage } from '../services/storage';
import { useTheme } from '../contexts/ThemeContext';

export function BottomNav() {
  const location = useLocation();
  const lang = getLanguage();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const navItems = [
    { path: '/', icon: Home, label: t('home', lang) },
    { path: '/favorites', icon: Heart, label: t('favorites', lang) },
    { path: '/history', icon: History, label: t('history', lang) },
    { path: '/profile', icon: User, label: t('profile', lang) },
  ];

  const handleTap = () => {
    if (navigator.vibrate) {
      navigator.vibrate(5);
    }
  };

  return (
    <nav className={`relative backdrop-blur-xl border-t safe-area-bottom bottom-nav-safe z-50 flex-shrink-0 ${
      isDark
        ? 'bg-black/95 border-gray-800/60'
        : 'bg-white/95 border-gray-200/60'
    }`}>
      <div className="grid grid-cols-4 max-w-md mx-auto relative">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              onClick={handleTap}
              className="flex flex-col items-center justify-center py-2.5 relative ripple-effect"
            >
              <div className="relative">
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className={`absolute -inset-x-3 -inset-y-1 rounded-full ${
                      isDark ? 'bg-gray-800' : 'bg-gray-100'
                    }`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  className={`w-5 h-5 relative z-10 transition-colors duration-200 ${
                    isActive
                      ? isDark ? 'text-white' : 'text-gray-900'
                      : isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
              </div>
              <span
                className={`text-[10px] mt-1 transition-colors duration-200 ${
                  isActive
                    ? isDark ? 'text-white' : 'text-gray-900'
                    : isDark ? 'text-gray-500' : 'text-gray-400'
                }`}
                style={{ fontWeight: isActive ? 600 : 400 }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
