// Documentation Center — Public user-facing hub
import { useNavigate } from 'react-router';
import { Card } from '../components/ui/card';
import { ArrowLeft, Palette, Info, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';

const docs = [
  {
    id: 'about',
    title: 'About RideChecka',
    subtitle: 'How it works, features & FAQ',
    icon: Info,
    color: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400',
    description: 'Learn how RideChecka compares fares, supported services, and answers to common questions.',
  },
  {
    id: 'brand',
    title: 'Brand Guidelines',
    subtitle: 'Visual identity system',
    icon: Palette,
    color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400',
    description: 'Logo usage, color palette, typography, iconography, and voice & tone.',
  },
];

export function DocsPage() {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`min-h-full ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-5 pt-14 pb-8 safe-area-top relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full" />
        <div className="absolute top-20 -left-6 w-20 h-20 bg-white/5 rounded-full" />
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate('/profile')}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 active:bg-white/20 transition-all active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-400">Back to Profile</span>
          </div>
          <h1 className="text-2xl mb-1 tracking-tight" style={{ fontWeight: 700 }}>
            Help & Info
          </h1>
          <p className="text-gray-400 text-sm">
            Learn about RideChecka, how it works, and our design standards.
          </p>
        </motion.div>
      </div>

      {/* Document cards */}
      <div className="px-4 -mt-4 relative z-10 pb-6">
        <div className="space-y-3">
          {docs.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.06 }}
            >
              <Card
                className={`p-4 rounded-xl border-0 shadow-sm cursor-pointer active:scale-[0.99] transition-all ${isDark ? 'bg-gray-900 shadow-black/20' : ''}`}
                onClick={() => navigate(`/docs/${doc.id}`)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${doc.color}`}>
                    <doc.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '15px', fontWeight: 600 }}>
                      {doc.title}
                    </h3>
                    <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{doc.subtitle}</p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{doc.description}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 flex-shrink-0 mt-1 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}