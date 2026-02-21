// About RideChecka — public user-facing page
import { useNavigate } from 'react-router';
import { Card } from '../../components/ui/card';
import { ArrowLeft, MapPin, TrendingDown, Shield, Globe, Heart, Zap, Users, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';

const FEATURES = [
  {
    icon: MapPin,
    title: 'Compare 16 Services',
    desc: 'See fares from Uber, Bolt, inDriver, Yango, and 12 more — instantly.',
  },
  {
    icon: TrendingDown,
    title: 'Save Up to 40%',
    desc: 'Always pick the cheapest option. Surge alerts warn you before prices spike.',
  },
  {
    icon: Shield,
    title: 'Transparent Estimates',
    desc: 'Every price shows a confidence score so you know how reliable the estimate is.',
  },
  {
    icon: Globe,
    title: 'Works in Your Language',
    desc: 'Switch between English, Yorùbá, Hausa, and Igbo — more coming soon.',
  },
  {
    icon: Heart,
    title: 'Save Favourite Routes',
    desc: 'Bookmark daily routes and re-check fares with a single tap.',
  },
  {
    icon: Zap,
    title: 'Offline Support',
    desc: 'Recent results are cached so you can view prices even without data.',
  },
];

const FAQS = [
  {
    q: 'Is RideChecka free?',
    a: 'Yes! Comparing prices across all 16 services is completely free.',
  },
  {
    q: 'Do I need an account?',
    a: 'No. You can use the app fully without signing up. An account lets you sync favourites and fare reports across devices.',
  },
  {
    q: 'How accurate are the prices?',
    a: 'Estimates are based on fare models calibrated with real trip data from Nigerian cities. Each estimate shows a price range and confidence score. You can help improve accuracy by reporting your actual fare after a trip.',
  },
  {
    q: 'Can I book a ride through RideChecka?',
    a: 'RideChecka opens the ride app directly so you can book. We deep-link to the official app for each service.',
  },
  {
    q: 'Which cities are supported?',
    a: 'We support all major Nigerian cities — Lagos, Abuja, Port Harcourt, Ibadan, Kano, and more.',
  },
  {
    q: 'How do I report a fare?',
    a: 'After comparing prices, tap "Report fare" on any service card. Enter the actual amount you paid and we\'ll use it to improve future estimates.',
  },
];

export function AboutPage() {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`min-h-full ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-600 text-white px-5 pt-14 pb-10 safe-area-top relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute top-20 -left-6 w-20 h-20 bg-white/5 rounded-full" />
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 active:bg-white/20 transition-all active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-green-100">Back</span>
          </div>
          <h1 className="text-2xl mb-2 tracking-tight font-bold">About RideChecka</h1>
          <p className="text-green-100 text-sm leading-relaxed max-w-sm">
            The fastest way to compare ride-hailing prices across Nigeria.
            Stop overpaying — find the cheapest ride in seconds.
          </p>
        </motion.div>
      </div>

      <div className="px-4 -mt-5 relative z-10 pb-8 space-y-6">
        {/* How it works */}
        <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <Card className={`p-5 rounded-2xl border-0 shadow-sm ${isDark ? 'bg-gray-900' : ''}`}>
            <h2 className={`text-base font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              How It Works
            </h2>
            <div className="space-y-4">
              {[
                { step: '1', text: 'Enter your pickup and destination' },
                { step: '2', text: 'See prices from 16 ride services side by side' },
                { step: '3', text: 'Compare services, check confidence scores' },
                { step: '4', text: 'Tap to open the cheapest app and book your ride' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isDark ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-700'
                  }`}>
                    {item.step}
                  </div>
                  <p className={`text-sm pt-0.5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}>
          <h2 className={`text-base font-bold mb-3 px-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURES.map((f, i) => (
              <Card key={i} className={`p-4 rounded-xl border-0 shadow-sm ${isDark ? 'bg-gray-900' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-green-900/40 text-green-400' : 'bg-green-100 text-green-600'
                  }`}>
                    <f.icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>{f.title}</p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{f.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Supported services */}
        <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className={`p-5 rounded-2xl border-0 shadow-sm ${isDark ? 'bg-gray-900' : ''}`}>
            <div className="flex items-center gap-2 mb-3">
              <Users className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <h2 className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Supported Services
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Uber', 'Bolt', 'inDriver', 'Yango', 'Lyft', 'Gokada', 'Rida', 'ORide', 'MAX', 'SafeBoda', 'Taxify', 'LagRide', 'Shuttlers', 'Treepz', 'Moove', 'Little Cab'].map((s) => (
                <span
                  key={s}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* FAQ */}
        <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}>
          <div className="flex items-center gap-2 mb-3 px-1">
            <HelpCircle className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <h2 className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <Card key={i} className={`p-4 rounded-xl border-0 shadow-sm ${isDark ? 'bg-gray-900' : ''}`}>
                <p className={`text-sm font-semibold mb-1.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>{faq.q}</p>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{faq.a}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className={`rounded-2xl p-4 border text-center ${
            isDark ? 'border-gray-800 bg-gray-900/50' : 'border-gray-100 bg-white'
          }`}>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              RideChecka v1.0 — Built in Lagos, Nigeria
            </p>
            <p className={`text-[10px] mt-1 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>
              RideChecka is not affiliated with any ride-hailing service. All trademarks belong to their respective owners.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
