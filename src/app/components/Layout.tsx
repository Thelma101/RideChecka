// Layout wrapper — responsive: sidebar on desktop, bottom nav on mobile
import { Outlet, useLocation, Link } from 'react-router';
import { BottomNav } from './BottomNav';
import { InstallPrompt } from './InstallPrompt';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import { Home, Heart, History, User, Sun, Moon } from 'lucide-react';
import { t } from '../utils/i18n';
import { getLanguage } from '../services/storage';

export function Layout() {
  const location = useLocation();
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const lang = getLanguage();

  const navItems = [
    { path: '/', icon: Home, label: t('home', lang) },
    { path: '/favorites', icon: Heart, label: t('favorites', lang) },
    { path: '/history', icon: History, label: t('history', lang) },
    { path: '/profile', icon: User, label: t('profile', lang) },
  ];

  return (
    <div className={`flex h-full h-[100dvh] ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Desktop sidebar */}
      <aside className={`hidden md:flex w-56 flex-col flex-shrink-0 border-r ${
        isDark ? 'bg-gray-950 border-gray-800' : 'bg-gray-50/80 border-gray-200'
      }`}>
        <div className="px-5 py-6">
          <h1 className={`text-lg tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 700 }}>
            RideChecka
          </h1>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Compare ride prices
          </p>
        </div>

        <nav className="flex-1 px-3 space-y-0.5">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? isDark
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-200/80 text-gray-900'
                    : isDark
                      ? 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
                style={{ fontWeight: isActive ? 600 : 400 }}
              >
                <Icon className="w-[18px] h-[18px]" strokeWidth={isActive ? 2.2 : 1.8} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-4">
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm w-full transition-colors ${
              isDark ? 'text-gray-400 hover:bg-gray-800/50' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            {isDark ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden -webkit-overflow-scrolling-touch"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile bottom nav only */}
        <div className="md:hidden">
          <BottomNav />
        </div>

        <InstallPrompt />
      </div>
    </div>
  );
}
