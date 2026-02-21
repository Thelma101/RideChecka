// Investor Pitch Deck — Interactive presentation for Ridechecka
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';

interface Slide {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  bg: string;
  textColor: string;
}

function StatCard({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className={`rounded-xl p-3 ${color}`}>
      <p className="text-white" style={{ fontSize: '22px', fontWeight: 700 }}>{value}</p>
      <p className="text-white/70 text-[10px] mt-0.5">{label}</p>
    </div>
  );
}

const slides: Slide[] = [
  // Slide 1: Title
  {
    title: '',
    bg: 'bg-gradient-to-br from-green-600 via-green-700 to-green-700',
    textColor: 'text-white',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl">
          <span className="text-4xl">??</span>
        </div>
        <h1 className="text-3xl text-white mb-2 tracking-tight" style={{ fontWeight: 800 }}>RIDECHECKA</h1>
        <p className="text-green-100 text-sm mb-1">Compare. Save. Ride Smart.</p>
        <div className="w-12 h-0.5 bg-green-400 rounded my-4" />
        <p className="text-green-100/80 text-xs">Investor Pitch Deck — Q1 2026</p>
        <p className="text-green-100/60 text-[10px] mt-1">Seed Round: $500K</p>
      </div>
    ),
  },
  // Slide 2: Problem
  {
    title: 'The Problem',
    bg: 'bg-gradient-to-br from-red-600 to-red-800',
    textColor: 'text-white',
    content: (
      <div className="px-6 py-4">
        <p className="text-red-100 text-sm mb-4 leading-relaxed">
          Nigerian riders waste <span className="text-white" style={{ fontWeight: 700 }}>?50B+/year</span> by not comparing ride prices across platforms.
        </p>
        <div className="space-y-3 mb-4">
          {[
            { emoji: '??', text: 'Must open 3-5 separate apps to compare a single ride' },
            { emoji: '??', text: 'Average 4-7 minutes wasted per comparison attempt' },
            { emoji: '??', text: 'Overpay ?200-800 per ride without realizing it' },
            { emoji: '??', text: 'No visibility into surge pricing across platforms' },
            { emoji: '??', text: 'Local services (often cheapest) are invisible to most riders' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-white/10 rounded-lg p-3">
              <span className="text-lg">{item.emoji}</span>
              <p className="text-red-100 text-xs leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="bg-white/15 rounded-xl p-3 text-center">
          <p className="text-white text-xs" style={{ fontWeight: 600 }}>
            "I check Uber, Bolt, and inDriver every morning. It takes forever." — Lagos commuter survey respondent
          </p>
        </div>
      </div>
    ),
  },
  // Slide 3: Solution
  {
    title: 'Our Solution',
    bg: 'bg-gradient-to-br from-green-600 to-green-700',
    textColor: 'text-white',
    content: (
      <div className="px-6 py-4">
        <p className="text-green-100 text-sm mb-4 leading-relaxed">
          Ridechecka is a <span className="text-white" style={{ fontWeight: 700 }}>one-tap price comparison</span> for every ride-hailing service in Nigeria.
        </p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { icon: '?', title: 'Instant Compare', desc: '50+ services, < 1 second' },
            { icon: '??', title: 'Price Trends', desc: 'Historical charts & analytics' },
            { icon: '??', title: 'Dark Mode', desc: 'OLED-optimized for battery' },
            { icon: '??', title: '4 Languages', desc: 'English, Yoruba, Hausa, Igbo' },
            { icon: '??', title: 'Works Offline', desc: 'Cached routes, no data needed' },
            { icon: '??', title: 'PWA Install', desc: 'No app store required' },
          ].map((item, i) => (
            <div key={i} className="bg-white/10 rounded-xl p-3">
              <span className="text-lg">{item.icon}</span>
              <p className="text-white text-xs mt-1" style={{ fontWeight: 600 }}>{item.title}</p>
              <p className="text-green-100/70 text-[10px] mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Slide 4: Market Opportunity
  {
    title: 'Market Opportunity',
    bg: 'bg-gradient-to-br from-blue-600 to-indigo-800',
    textColor: 'text-white',
    content: (
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <StatCard value="$1.8B" label="Nigerian ride-hailing market (2025)" color="bg-white/15" />
          <StatCard value="$4.5B" label="Projected by 2028 (CAGR 35%)" color="bg-white/15" />
          <StatCard value="15M+" label="Monthly ride-hailing users in Nigeria" color="bg-white/15" />
          <StatCard value="200M" label="Nigeria's population" color="bg-white/15" />
        </div>
        <div className="bg-white/10 rounded-xl p-3 mb-3">
          <p className="text-white text-xs mb-2" style={{ fontWeight: 600 }}>Key Market Drivers</p>
          <ul className="text-blue-100 text-[11px] space-y-1">
            <li>• Rapid urbanization: 50%+ urban by 2030</li>
            <li>• Growing smartphone penetration: 60%+ and rising</li>
            <li>• Highly fragmented market = strong aggregator opportunity</li>
            <li>• Government regulation of ride-hailing (Lagos LagRide)</li>
            <li>• Rising fuel costs driving demand for price transparency</li>
          </ul>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <p className="text-white text-xs" style={{ fontWeight: 600 }}>Total Addressable Market</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-green-400 rounded-full" style={{ width: '100%' }} />
            </div>
            <span className="text-white text-[10px]">TAM: $1.8B</span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 rounded-full" style={{ width: '45%' }} />
            </div>
            <span className="text-white text-[10px]">SAM: $810M</span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-blue-400 rounded-full" style={{ width: '12%' }} />
            </div>
            <span className="text-white text-[10px]">SOM: $216M</span>
          </div>
        </div>
      </div>
    ),
  },
  // Slide 5: Business Model
  {
    title: 'Business Model',
    bg: 'bg-gradient-to-br from-amber-500 to-orange-700',
    textColor: 'text-white',
    content: (
      <div className="px-6 py-4">
        <div className="space-y-3 mb-4">
          {[
            { icon: '??', title: 'Affiliate Commissions (Primary)', desc: '2-5% per ride booking redirected from our platform. At scale, ?50-200 per successful redirect.', rev: '60% of revenue' },
            { icon: '?', title: 'Premium Subscription', desc: '?1,500/mo for ad-free experience, advanced analytics, price alerts, route optimization, expense export.', rev: '25% of revenue' },
            { icon: '??', title: 'Promoted Listings', desc: 'Ride services pay for priority placement in comparison results. Non-intrusive "Sponsored" badges.', rev: '10% of revenue' },
            { icon: '??', title: 'Data Insights (B2B)', desc: 'Anonymized market intelligence sold to ride-hailing companies: pricing trends, demand patterns, route analytics.', rev: '5% of revenue' },
          ].map((item, i) => (
            <div key={i} className="bg-white/15 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <p className="text-white text-xs" style={{ fontWeight: 600 }}>{item.title}</p>
                </div>
                <span className="text-amber-200 text-[10px] bg-white/10 px-2 py-0.5 rounded-full">{item.rev}</span>
              </div>
              <p className="text-amber-100/80 text-[11px] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Slide 6: Competitive Landscape
  {
    title: 'Competitive Landscape',
    bg: 'bg-gradient-to-br from-gray-800 to-gray-900',
    textColor: 'text-white',
    content: (
      <div className="px-6 py-4">
        <p className="text-gray-300 text-xs mb-4">No direct ride-hailing aggregator exists in Nigeria. Here's how we compare to alternatives:</p>
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-1.5 text-gray-400">Feature</th>
                <th className="text-center p-1.5 text-green-400" style={{ fontWeight: 700 }}>Ridechecka</th>
                <th className="text-center p-1.5 text-gray-400">Google Maps</th>
                <th className="text-center p-1.5 text-gray-400">Manual Check</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {[
                ['50+ Services', '?', '2-3', '1 at a time'],
                ['Nigerian Local Services', '?', '?', '?'],
                ['Real-time Prices', '?', '~ Estimates', '?'],
                ['Price History', '?', '?', '?'],
                ['Offline Mode', '?', 'Partial', '?'],
                ['4 Nigerian Languages', '?', '?', 'Per app'],
                ['Dark Mode / OLED', '?', '?', 'Per app'],
                ['Analytics Dashboard', '?', '?', '?'],
                ['Free to Use', '?', '?', '?'],
                ['No Download Required', '? PWA', '?', '?'],
              ].map((row, i) => (
                <tr key={i} className="border-b border-gray-800">
                  <td className="p-1.5 text-gray-400">{row[0]}</td>
                  <td className="p-1.5 text-center text-green-400" style={{ fontWeight: 600 }}>{row[1]}</td>
                  <td className="p-1.5 text-center">{row[2]}</td>
                  <td className="p-1.5 text-center">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-green-900/30 rounded-xl p-3 mt-4 border border-green-700/50">
          <p className="text-green-400 text-[11px]" style={{ fontWeight: 600 }}>
            Moat: Local language support, Nigerian-specific service coverage, offline-first PWA approach, and community trust as an independent aggregator.
          </p>
        </div>
      </div>
    ),
  },
  // Slide 7: Traction
  {
    title: 'Traction & Milestones',
    bg: 'bg-gradient-to-br from-purple-600 to-purple-900',
    textColor: 'text-white',
    content: (
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <StatCard value="v2.0" label="Product built & functional" color="bg-white/15" />
          <StatCard value="50+" label="Services integrated (mocked)" color="bg-white/15" />
          <StatCard value="25+" label="Nigerian locations mapped" color="bg-white/15" />
          <StatCard value="80+" label="i18n translation keys" color="bg-white/15" />
        </div>
        <p className="text-purple-200 text-xs mb-3" style={{ fontWeight: 600 }}>Completed Milestones</p>
        <div className="space-y-2">
          {[
            { date: 'Jan 2026', text: 'MVP: Core comparison engine, 10 services, Lagos locations' },
            { date: 'Jan 2026', text: 'v1.5: Favorites, history, price trend charts, 4 languages' },
            { date: 'Feb 2026', text: 'v2.0: Dark mode, onboarding, analytics, notifications, filters, offline' },
            { date: 'Feb 2026', text: 'PWA shell: Splash, install prompt, haptics, page transitions' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0 mt-1.5" />
              <div>
                <span className="text-purple-300 text-[10px]">{item.date}</span>
                <p className="text-purple-100 text-[11px]">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white/10 rounded-xl p-3 mt-4">
          <p className="text-white text-xs" style={{ fontWeight: 600 }}>Next: Beta launch with real APIs (Q2 2026)</p>
        </div>
      </div>
    ),
  },
  // Slide 8: Product Demo
  {
    title: 'Product Screens',
    bg: 'bg-gradient-to-br from-gray-900 to-black',
    textColor: 'text-white',
    content: (
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: 'Home', desc: 'Location input, GPS, favorites, features', color: 'from-green-600 to-green-700' },
            { title: 'Results', desc: 'Price cards, sort, filter, save favorite', color: 'from-blue-600 to-blue-800' },
            { title: 'History', desc: 'Grouped searches, trends, analytics', color: 'from-purple-600 to-purple-800' },
            { title: 'Favorites', desc: 'Saved routes, quick compare', color: 'from-red-500 to-red-700' },
            { title: 'Profile', desc: 'Theme, language, notifications', color: 'from-amber-500 to-amber-700' },
            { title: 'Analytics', desc: 'Spending insights, service distribution', color: 'from-cyan-600 to-cyan-800' },
          ].map((screen, i) => (
            <div key={i} className={`bg-gradient-to-br ${screen.color} rounded-xl p-3`}>
              <p className="text-white text-xs" style={{ fontWeight: 600 }}>{screen.title}</p>
              <p className="text-white/60 text-[10px] mt-0.5">{screen.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-white/10 rounded-xl p-3 mt-4 text-center">
          <p className="text-gray-300 text-[11px]">
            Full PWA with native-feeling splash screen, onboarding tutorial, bottom navigation, pull-to-refresh, bottom sheet drawers, haptic feedback, and smooth page transitions.
          </p>
        </div>
      </div>
    ),
  },
  // Slide 9: Go-to-Market
  {
    title: 'Go-to-Market Strategy',
    bg: 'bg-gradient-to-br from-teal-600 to-teal-900',
    textColor: 'text-white',
    content: (
      <div className="px-6 py-4">
        <div className="space-y-3">
          {[
            { phase: 'Phase 1: Lagos Launch', timeline: 'Q3 2026', items: ['University campus ambassador program (UNILAG, LASU, Covenant)', 'Social media campaign: Instagram, Twitter, TikTok', 'WhatsApp community groups (organic growth)', 'Influencer partnerships with Lagos tech/lifestyle creators'] },
            { phase: 'Phase 2: Abuja + PH', timeline: 'Q4 2026', items: ['Geo-targeted Facebook/Google ads', 'Partnership with corporate ride programs', 'Radio spots on popular FM stations', 'Market drivers at busy bus stops'] },
            { phase: 'Phase 3: National', timeline: 'Q1 2027', items: ['TV advertising during prime time', 'Integration partnerships with ride-hailing apps', 'Premium tier launch with referral program', 'B2B enterprise accounts'] },
          ].map((phase, i) => (
            <div key={i} className="bg-white/10 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white text-xs" style={{ fontWeight: 600 }}>{phase.phase}</p>
                <span className="text-teal-200 text-[10px] bg-white/10 px-2 py-0.5 rounded-full">{phase.timeline}</span>
              </div>
              <ul className="text-teal-100/80 text-[11px] space-y-1">
                {phase.items.map((item, j) => (
                  <li key={j}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Slide 10: Financial Projections
  {
    title: 'Financial Projections',
    bg: 'bg-gradient-to-br from-green-600 to-green-900',
    textColor: 'text-white',
    content: (
      <div className="px-6 py-4">
        <div className="overflow-x-auto -mx-2 mb-4">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="border-b border-green-700">
                <th className="text-left p-1.5 text-green-100">Metric</th>
                <th className="text-center p-1.5 text-green-100">Year 1</th>
                <th className="text-center p-1.5 text-green-100">Year 2</th>
                <th className="text-center p-1.5 text-green-100">Year 3</th>
              </tr>
            </thead>
            <tbody className="text-green-100">
              {[
                ['MAU', '250K', '1M', '3M'],
                ['Revenue', '$120K', '$850K', '$3.2M'],
                ['Gross Margin', '70%', '75%', '80%'],
                ['Monthly Burn', '$25K', '$45K', '$80K'],
                ['Team Size', '8', '20', '45'],
                ['Premium Subs', '5K', '40K', '150K'],
                ['Cities', '5', '15', '30+'],
              ].map((row, i) => (
                <tr key={i} className="border-b border-green-700/50">
                  <td className="p-1.5 text-green-100">{row[0]}</td>
                  <td className="p-1.5 text-center">{row[1]}</td>
                  <td className="p-1.5 text-center">{row[2]}</td>
                  <td className="p-1.5 text-center" style={{ fontWeight: 600 }}>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <p className="text-white text-xs mb-1" style={{ fontWeight: 600 }}>Unit Economics (at scale)</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-green-100 text-[10px]">CAC</p>
              <p className="text-white" style={{ fontWeight: 700 }}>$0.80</p>
            </div>
            <div>
              <p className="text-green-100 text-[10px]">LTV</p>
              <p className="text-white" style={{ fontWeight: 700 }}>$12.50</p>
            </div>
            <div>
              <p className="text-green-100 text-[10px]">LTV:CAC</p>
              <p className="text-green-400" style={{ fontWeight: 700 }}>15.6x</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  // Slide 11: Team
  {
    title: 'Team',
    bg: 'bg-gradient-to-br from-indigo-600 to-indigo-900',
    textColor: 'text-white',
    content: (
      <div className="px-6 py-4">
        <p className="text-indigo-200 text-xs mb-4">Built by Nigerians who understand the Nigerian commuter experience</p>
        <div className="space-y-3 mb-4">
          {[
            { role: 'CEO / Product Lead', desc: 'Former ride-hailing power user, product management background, deep understanding of Nigerian mobility landscape', placeholder: '[Name TBD]' },
            { role: 'CTO / Lead Engineer', desc: 'Full-stack React/TypeScript developer, PWA specialist, Supabase experience, built the entire v2.0 product', placeholder: '[Name TBD]' },
            { role: 'Head of Growth', desc: 'Digital marketing specialist with Nigerian market experience, previous startup growth role', placeholder: '[Name TBD]' },
            { role: 'Operations / Partnerships', desc: 'Ride-hailing industry connections, API partnership negotiation, Lagos/Abuja network', placeholder: '[Name TBD]' },
          ].map((member, i) => (
            <div key={i} className="bg-white/10 rounded-xl p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500/50 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                  ??
                </div>
                <div>
                  <p className="text-white text-xs" style={{ fontWeight: 600 }}>{member.role}</p>
                  <p className="text-indigo-200/60 text-[10px] mt-0.5">{member.placeholder}</p>
                  <p className="text-indigo-200/80 text-[10px] mt-0.5">{member.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-indigo-300/60 text-[10px] text-center italic">Hiring: Mobile engineer, data analyst, community manager</p>
      </div>
    ),
  },
  // Slide 12: The Ask
  {
    title: 'The Ask',
    bg: 'bg-gradient-to-br from-green-600 via-green-700 to-green-900',
    textColor: 'text-white',
    content: (
      <div className="px-6 py-4 flex flex-col items-center text-center">
        <div className="bg-white/15 rounded-3xl px-8 py-6 mb-6">
          <p className="text-green-100 text-xs mb-1">Seed Round</p>
          <p className="text-white" style={{ fontSize: '36px', fontWeight: 800 }}>$500K</p>
          <p className="text-green-100/70 text-xs mt-1">18-month runway</p>
        </div>
        <div className="w-full space-y-3 mb-6">
          <p className="text-white text-xs" style={{ fontWeight: 600 }}>Use of Funds</p>
          {[
            { label: 'Engineering (API integrations, Supabase, native wrapper)', pct: '40%', color: 'bg-blue-500' },
            { label: 'Growth & Marketing (Lagos launch, campus ambassadors)', pct: '25%', color: 'bg-green-600' },
            { label: 'Operations & Partnerships (API access, ride-hailing deals)', pct: '20%', color: 'bg-amber-500' },
            { label: 'Team (key hires: mobile eng, data analyst)', pct: '15%', color: 'bg-purple-500' },
          ].map((item, i) => (
            <div key={i} className="text-left">
              <div className="flex items-center justify-between mb-1">
                <span className="text-green-100/80 text-[11px]">{item.label}</span>
                <span className="text-white text-[11px]" style={{ fontWeight: 600 }}>{item.pct}</span>
              </div>
              <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${item.color}`} style={{ width: item.pct }} />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white/10 rounded-xl p-3 w-full">
          <p className="text-green-100/80 text-[11px]">
            Target: Break-even by Month 14. Series A readiness by Month 18.
          </p>
        </div>
      </div>
    ),
  },
  // Slide 13: Thank You
  {
    title: '',
    bg: 'bg-gradient-to-br from-green-600 via-green-700 to-green-700',
    textColor: 'text-white',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl">
          <span className="text-4xl">??</span>
        </div>
        <h1 className="text-2xl text-white mb-2" style={{ fontWeight: 800 }}>Thank You</h1>
        <div className="w-12 h-0.5 bg-green-400 rounded my-4" />
        <p className="text-green-100 text-sm mb-6">Let's make every ride cheaper for 200 million Nigerians</p>
        <div className="bg-white/15 rounded-xl p-4 w-full max-w-xs">
          <p className="text-green-100 text-xs mb-1">Contact</p>
          <p className="text-white text-sm" style={{ fontWeight: 600 }}>hello@ridechecka.com</p>
          <p className="text-green-100/70 text-xs mt-1">ridechecka.com</p>
        </div>
      </div>
    ),
  },
];

export function PitchDeckPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goNext = () => {
    if (current < slides.length - 1) {
      setDirection(1);
      setCurrent(current + 1);
    }
  };

  const goPrev = () => {
    if (current > 0) {
      setDirection(-1);
      setCurrent(current - 1);
    }
  };

  const slide = slides[current];

  return (
    <div className="min-h-full bg-black flex flex-col">
      {/* Navigation bar */}
      <div className="bg-black/95 backdrop-blur-xl border-b border-gray-800 safe-area-top flex-shrink-0 z-20">
        <div className="px-4 py-2 flex items-center justify-between">
          <button onClick={() => navigate('/_rc-admin/docs')} className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 active:scale-95 transition-all">
            <ArrowLeft className="w-4 h-4 text-gray-300" />
          </button>
          <div className="text-center">
            <p className="text-white text-xs" style={{ fontWeight: 600 }}>Pitch Deck</p>
            <p className="text-gray-500 text-[10px]">{current + 1} / {slides.length}</p>
          </div>
          <div className="w-8" />
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-gray-800">
          <div
            className="h-full bg-green-600 transition-all duration-300"
            style={{ width: `${((current + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -80 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`absolute inset-0 ${slide.bg} overflow-y-auto`}
          >
            {slide.title && (
              <div className="px-6 pt-5 pb-2">
                <h2 className={`${slide.textColor}`} style={{ fontSize: '20px', fontWeight: 700 }}>
                  {slide.title}
                </h2>
              </div>
            )}
            <div className={slide.title ? '' : 'h-full'}>
              {slide.content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide controls */}
      <div className="bg-black border-t border-gray-800 px-4 py-3 safe-area-bottom flex items-center justify-between flex-shrink-0">
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center active:scale-95 transition-all disabled:opacity-30"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5 overflow-hidden max-w-[200px]">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`rounded-full transition-all flex-shrink-0 ${
                i === current ? 'w-6 h-2 bg-green-600' : 'w-2 h-2 bg-gray-700'
              }`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={current === slides.length - 1}
          className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center active:scale-95 transition-all disabled:opacity-30"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
