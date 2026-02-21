// Product Requirements Document — Ridechecka PRD v2.0
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800" style={{ fontSize: '18px', fontWeight: 700 }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="text-gray-800 dark:text-gray-200 mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">{children}</p>;
}

function UL({ items }: { items: string[] }) {
  return (
    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5 ml-4 mb-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-green-600 mt-1">•</span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto mb-4 -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800">
            {headers.map((h, i) => (
              <th key={i} className="text-left p-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700" style={{ fontWeight: 600 }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
              {row.map((cell, j) => (
                <td key={j} className="p-2 text-gray-600 dark:text-gray-400">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PRDPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-white dark:bg-black">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 safe-area-top">
        <div className="px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate('/_rc-admin/docs')} className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 active:scale-95 transition-all">
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <div>
            <h1 className="text-gray-900 dark:text-white" style={{ fontSize: '16px', fontWeight: 600 }}>Product Requirements Document</h1>
            <p className="text-[11px] text-gray-400">PRD v2.0 — February 2026</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 py-6 max-w-2xl mx-auto">
        {/* Title block */}
        <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">??</span>
            </div>
            <div>
              <h1 className="text-gray-900 dark:text-white" style={{ fontSize: '24px', fontWeight: 700 }}>RIDECHECKA</h1>
              <p className="text-sm text-gray-500">Product Requirements Document v2.0</p>
            </div>
          </div>
          <Table
            headers={['Field', 'Value']}
            rows={[
              ['Document Version', '2.0'],
              ['Last Updated', 'February 20, 2026'],
              ['Status', 'Active Development'],
              ['Product Owner', 'Ridechecka Team'],
              ['Target Platform', 'Mobile PWA (iOS, Android, Web)'],
              ['Primary Market', 'Nigeria (Lagos, Abuja, PH, Ibadan, Kano)'],
            ]}
          />
        </div>

        <Section title="1. Executive Summary">
          <P>
            Ridechecka is a Progressive Web Application (PWA) that aggregates and compares fare estimates from 50+ ride-hailing platforms operating in Nigeria. The app empowers Nigerian commuters to make informed, cost-effective ride choices by providing real-time price comparisons, historical price trends, and personalized route analytics — all within a native-feeling mobile experience.
          </P>
          <P>
            Nigeria's ride-hailing market is highly fragmented, with international players (Uber, Bolt, inDriver) competing alongside a growing ecosystem of local platforms (Gokada, MAX, SafeBoda, Rida, ORide, LagRide). Riders currently must check multiple apps to compare prices. Ridechecka solves this by consolidating all options into a single interface, saving users time and an average of ?200-500 per trip.
          </P>
        </Section>

        <Section title="2. Product Vision & Goals">
          <SubSection title="Vision Statement">
            <P>"To become every Nigerian commuter's first tap before every ride — the definitive layer between riders and ride-hailing platforms that guarantees the best price, every time."</P>
          </SubSection>
          <SubSection title="Primary Goals">
            <UL items={[
              'Reduce average ride cost for Nigerian commuters by 15-25%',
              'Aggregate 50+ ride-hailing services into one seamless comparison',
              'Provide sub-second fare estimates with real-time accuracy',
              'Support all 4 major Nigerian languages (English, Yoruba, Hausa, Igbo)',
              'Deliver a native app experience via PWA without app store dependency',
              'Build a sustainable monetization model via affiliate commissions and premium features',
            ]} />
          </SubSection>
          <SubSection title="Success Metrics (KPIs)">
            <Table
              headers={['Metric', 'Target (6 mo)', 'Target (12 mo)']}
              rows={[
                ['Monthly Active Users (MAU)', '50,000', '250,000'],
                ['Daily Price Comparisons', '10,000', '75,000'],
                ['PWA Install Rate', '30%', '45%'],
                ['Average Session Duration', '> 2 min', '> 3 min'],
                ['User Retention (D30)', '25%', '40%'],
                ['Avg. Savings per User/mo', '?3,000', '?5,000'],
                ['NPS Score', '> 40', '> 55'],
              ]}
            />
          </SubSection>
        </Section>

        <Section title="3. Target Users">
          <SubSection title="Primary Persona: Lagos Commuter ('Tunde')">
            <UL items={[
              'Age: 22-40, urban professional or student',
              'Tech-savvy, owns an Android smartphone (predominantly)',
              'Takes 3-5 rides per week across multiple platforms',
              'Price-conscious — compares options but frustrated by switching between apps',
              'Data-conscious — prefers lite/PWA apps over heavy native installs',
              'Uses English primarily, may prefer Yoruba for certain interactions',
            ]} />
          </SubSection>
          <SubSection title="Secondary Persona: Abuja Business Traveler ('Amina')">
            <UL items={[
              'Age: 30-50, mid-to-senior professional',
              'Frequent airport transfers and cross-city commutes',
              'Values reliability and comfort over pure cheapness',
              'Wants fare history for expense reporting',
              'Uses English and Hausa',
            ]} />
          </SubSection>
          <SubSection title="Tertiary Persona: Budget-conscious Student ('Emeka')">
            <UL items={[
              'Age: 18-25, university student',
              'Extremely price-sensitive, every ?100 matters',
              'Interested in local bike/keke services (cheaper options)',
              'Offline-first due to inconsistent campus internet',
              'Uses Igbo and English',
            ]} />
          </SubSection>
        </Section>

        <Section title="4. Feature Requirements">
          <SubSection title="4.1 Core Features (P0 — Must Have)">
            <Table
              headers={['Feature', 'Description', 'Status']}
              rows={[
                ['Price Comparison Engine', 'Real-time fare estimates from 50+ services with =1s response time', '? Implemented'],
                ['Location Search', 'Autocomplete search with Nigerian cities, neighborhoods, landmarks, and GPS', '? Implemented'],
                ['Route Favorites', 'Save frequent routes for one-tap re-comparison', '? Implemented'],
                ['Search History', 'Grouped, timestamped history of past searches with prices', '? Implemented'],
                ['Price Cards', 'Per-service cards showing price, ETA, vehicle type, surge, discounts', '? Implemented'],
                ['Sort & Filter', 'Sort by price/time; filter by vehicle type, features, surge, discounts', '? Implemented'],
                ['Multi-Language', 'English, Yoruba, Hausa, Igbo with full UI translation (80+ keys)', '? Implemented'],
                ['Offline Caching', 'localStorage-based route caching (1-hour TTL, 20-route LRU)', '? Implemented'],
                ['PWA Shell', 'Splash screen, install prompt (Android + iOS guide), home screen support', '? Implemented'],
              ]}
            />
          </SubSection>
          <SubSection title="4.2 Enhanced Features (P1 — Should Have)">
            <Table
              headers={['Feature', 'Description', 'Status']}
              rows={[
                ['Dark Mode', 'System/Light/Dark toggle with OLED true-black optimization', '? Implemented'],
                ['Onboarding Flow', '5-step interactive tutorial with achievement completion', '? Implemented'],
                ['Pull-to-Refresh', 'Native-feeling gesture to refresh price data', '? Implemented'],
                ['Connectivity Indicator', 'Online/offline banner with auto-reconnect detection', '? Implemented'],
                ['Price Trend Charts', 'Recharts-based line charts showing price history per service', '? Implemented'],
                ['Analytics Dashboard', 'Spending insights: total saved, top routes, service distribution, hourly patterns', '? Implemented'],
                ['Notification Center', 'Price drop alerts, surge warnings, promo deals with preference controls', '? Implemented'],
                ['Search Filters', 'Bottom sheet drawer with price range slider, vehicle/feature toggles', '? Implemented'],
                ['Haptic Feedback', 'navigator.vibrate() on all interactive elements for tactile response', '? Implemented'],
                ['Page Transitions', 'Motion/React AnimatePresence for smooth route transitions', '? Implemented'],
              ]}
            />
          </SubSection>
          <SubSection title="4.3 Planned Features (P2 — Nice to Have)">
            <Table
              headers={['Feature', 'Description', 'Status']}
              rows={[
                ['Supabase Backend', 'Real-time database, user auth (OAuth), cross-device sync', '?? Pending'],
                ['Push Notifications', 'Web Push API for price alerts and daily digests', '?? Planned'],
                ['Deep Linking', 'Shareable ride comparison URLs', '?? Planned'],
                ['Ride Booking Redirect', 'Direct deep-link to selected service\'s booking flow', '?? Planned'],
                ['Premium Tier', 'Ad-free, advanced analytics, price alerts, route optimization', '?? Planned'],
                ['Multi-stop Routing', 'Compare prices for A?B?C multi-leg journeys', '?? Planned'],
                ['Driver Rating Aggregation', 'Compare driver ratings across platforms', '?? Planned'],
                ['Expense Export', 'CSV/PDF export of ride history for business users', '?? Planned'],
                ['Map Visualization', 'Mapbox/Google Maps route preview', '?? Planned'],
                ['Social Login', 'Google, Facebook OAuth via Supabase Auth', '?? Planned'],
              ]}
            />
          </SubSection>
        </Section>

        <Section title="5. User Stories">
          <Table
            headers={['ID', 'As a...', 'I want to...', 'So that...']}
            rows={[
              ['US-001', 'Rider', 'Enter pickup & destination and see all ride prices', 'I can choose the cheapest/fastest option'],
              ['US-002', 'Rider', 'Save my daily commute route as a favorite', 'I can check prices with one tap every morning'],
              ['US-003', 'Rider', 'See my past ride searches grouped by date', 'I can track my spending patterns'],
              ['US-004', 'Rider', 'View price trend charts for a specific route', 'I can time my rides for the best prices'],
              ['US-005', 'Rider', 'Switch the app language to Yoruba/Hausa/Igbo', 'I can use the app in my preferred language'],
              ['US-006', 'Rider', 'Use the app without internet', 'I can see cached prices from my last search'],
              ['US-007', 'Rider', 'Toggle dark mode with OLED black option', 'I can save battery and reduce eye strain at night'],
              ['US-008', 'Rider', 'Filter results by vehicle type and features', 'I can find rides that match my preferences (AC, WiFi, etc.)'],
              ['US-009', 'Rider', 'Get notified when surge pricing ends on my route', 'I can wait and save money'],
              ['US-010', 'Rider', 'See analytics on how much I\'ve saved', 'I can appreciate the value Ridechecka provides'],
              ['US-011', 'Rider', 'Install Ridechecka on my home screen', 'It feels like a native app without App Store download'],
              ['US-012', 'New user', 'Complete an interactive onboarding tutorial', 'I understand all features quickly'],
            ]}
          />
        </Section>

        <Section title="6. Non-Functional Requirements">
          <SubSection title="Performance">
            <UL items={[
              'Price comparison results must load in =1 second (mocked: 200-800ms)',
              'Location autocomplete results in =300ms',
              'Splash screen completes in 1.8 seconds',
              'First Contentful Paint (FCP) = 1.5s on 3G networks',
              'Total app bundle = 500KB gzipped',
            ]} />
          </SubSection>
          <SubSection title="Accessibility">
            <UL items={[
              'WCAG 2.1 Level AA compliance',
              'High contrast mode support via @media (prefers-contrast: high)',
              'Reduced motion support via @media (prefers-reduced-motion: reduce)',
              'Minimum touch target size: 44x44px for all interactive elements',
              'Screen reader compatible with semantic HTML and ARIA labels',
            ]} />
          </SubSection>
          <SubSection title="Security & Privacy">
            <UL items={[
              'No PII collection beyond optional name/email (localStorage only, no server transmission currently)',
              'All future authentication via Supabase Auth (OAuth, RLS)',
              'HTTPS-only deployment',
              'Content Security Policy headers',
              'No third-party tracking or analytics in MVP',
            ]} />
          </SubSection>
          <SubSection title="Compatibility">
            <UL items={[
              'Chrome 80+, Safari 14+, Firefox 90+, Samsung Internet 15+',
              'iOS 14+ (PWA via Safari), Android 8+ (PWA via Chrome)',
              'Responsive: 320px to 480px primary, 481px+ centered max-width',
              'PWA: Service Worker, Web App Manifest, installable',
            ]} />
          </SubSection>
        </Section>

        <Section title="7. Data Model">
          <SubSection title="Core Types">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-4 overflow-x-auto">
              <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre">{`Location {
  address: string    // "Victoria Island, Lagos"
  lat: number        // 6.4281
  lng: number        // 3.4219
}

PriceEstimate {
  serviceId: string  // "uber"
  serviceName: string
  logo: string       // emoji or URL
  color: string      // brand hex
  price: number      // in NGN
  currency: "NGN"
  estimatedTime: string
  vehicleType: string
  surge?: number     // multiplier
  features?: string[]
  discount?: number  // amount in NGN
}

RouteSearch {
  id: string
  pickup: Location
  destination: Location
  timestamp: number
  estimates: PriceEstimate[]
}

Favorite {
  id: string
  name: string
  pickup: Location
  destination: Location
  createdAt: number
}

User {
  id: string
  name: string
  email: string
  phone?: string
  language: "en" | "yo" | "ha" | "ig"
}`}</pre>
            </div>
          </SubSection>
        </Section>

        <Section title="8. Supported Ride Services (10 in MVP)">
          <Table
            headers={['Service', 'Type', 'Local?', 'Vehicle Types']}
            rows={[
              ['Uber', 'International', 'No', 'Economy, Standard, Comfort, XL'],
              ['Bolt', 'International', 'No', 'Economy, Standard, Comfort, XL'],
              ['inDriver', 'International', 'No', 'Economy, Standard, Comfort, XL'],
              ['Gokada', 'Nigerian', 'Yes', 'Bike, Motorcycle'],
              ['Rida', 'Nigerian', 'Yes', 'Bike, Motorcycle'],
              ['ORide', 'Nigerian', 'Yes', 'Bike, Motorcycle'],
              ['MAX', 'Nigerian', 'Yes', 'Bike, Motorcycle'],
              ['SafeBoda', 'Nigerian', 'Yes', 'Bike, Motorcycle'],
              ['Taxify', 'International', 'No', 'Economy, Standard, Comfort, XL'],
              ['LagRide', 'Nigerian (Gov)', 'Yes', 'Economy, Standard, Comfort, XL'],
            ]}
          />
          <P>Note: Current implementation uses mocked API responses with realistic price variance, surge simulation, and feature randomization. Production will integrate real APIs via Supabase Edge Functions.</P>
        </Section>

        <Section title="9. Risks & Mitigations">
          <Table
            headers={['Risk', 'Impact', 'Likelihood', 'Mitigation']}
            rows={[
              ['API access denied by ride services', 'High', 'Medium', 'Web scraping fallback, partnership negotiations, crowd-sourced data'],
              ['Price data staleness', 'Medium', 'High', 'Aggressive caching strategy with TTL, real-time WebSocket where available'],
              ['Low PWA adoption on iOS', 'Medium', 'Medium', 'iOS-specific install guide, native app wrapper via Capacitor as backup'],
              ['Nigerian internet instability', 'High', 'High', 'Aggressive offline caching, optimistic UI, Service Worker pre-caching'],
              ['Competition from ride apps adding comparison', 'Medium', 'Low', 'First-mover advantage, local language support, independent platform trust'],
              ['Supabase integration complexity', 'Medium', 'Medium', 'Incremental migration, localStorage fallback always available'],
            ]}
          />
        </Section>

        <Section title="10. Roadmap">
          <Table
            headers={['Phase', 'Timeline', 'Key Deliverables']}
            rows={[
              ['Alpha (Current)', 'Q1 2026', 'Full PWA with mocked data, all P0+P1 features, 4-language support, dark mode'],
              ['Beta', 'Q2 2026', 'Supabase backend, real API integration (Uber, Bolt, inDriver), push notifications'],
              ['V1.0 Launch', 'Q3 2026', 'Public launch in Lagos, marketing campaign, 20+ real service integrations'],
              ['V1.5', 'Q4 2026', 'Premium tier, expense export, deep linking, multi-stop routing'],
              ['V2.0', 'Q1 2027', 'Native app wrappers (Capacitor), West Africa expansion (Ghana, Kenya)'],
            ]}
          />
        </Section>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            Ridechecka PRD v2.0 — Confidential
          </p>
          <p className="text-[10px] text-gray-300 dark:text-gray-700 mt-1">
            Last updated: February 20, 2026 — Use Ctrl/Cmd+P to print or save as PDF
          </p>
        </div>
      </motion.div>
    </div>
  );
}
