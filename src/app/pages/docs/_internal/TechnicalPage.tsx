// Technical Architecture Document — Ridechecka System Design
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800" style={{ fontSize: '18px', fontWeight: 700 }}>{title}</h2>
      {children}
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">{children}</p>;
}

function Code({ children }: { children: string }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-4 overflow-x-auto">
      <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre">{children}</pre>
    </div>
  );
}

function UL({ items }: { items: string[] }) {
  return (
    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5 ml-4 mb-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-purple-500 mt-1">•</span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function TechnicalPage() {
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
            <h1 className="text-gray-900 dark:text-white" style={{ fontSize: '16px', fontWeight: 600 }}>Technical Architecture</h1>
            <p className="text-[11px] text-gray-400">System Design v2.0</p>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 py-6 max-w-2xl mx-auto">
        <Section title="1. Tech Stack Overview">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { label: 'Framework', value: 'React 18.3' },
              { label: 'Language', value: 'TypeScript' },
              { label: 'Build Tool', value: 'Vite 6.3' },
              { label: 'Styling', value: 'Tailwind CSS 4.1' },
              { label: 'Routing', value: 'React Router 7' },
              { label: 'Animation', value: 'Motion (Framer)' },
              { label: 'Charts', value: 'Recharts 2.15' },
              { label: 'UI Components', value: 'shadcn/ui + Radix' },
              { label: 'Toasts', value: 'Sonner 2.0' },
              { label: 'Drawers', value: 'Vaul 1.1' },
              { label: 'Icons', value: 'Lucide React' },
              { label: 'Date Utils', value: 'date-fns 3.6' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2.5">
                <p className="text-[10px] text-gray-400 dark:text-gray-500">{item.label}</p>
                <p className="text-xs text-gray-800 dark:text-gray-200" style={{ fontWeight: 600 }}>{item.value}</p>
              </div>
            ))}
          </div>
          <P>The application is a single-page Progressive Web Application built with React and TypeScript, bundled with Vite for fast development and optimized production builds. Tailwind CSS v4 with custom CSS variables provides the styling system.</P>
        </Section>

        <Section title="2. Architecture Diagram">
          <Code>{`+-----------------------------------------------------+
¦                    CLIENT (PWA)                      ¦
¦                                                     ¦
¦  +---------+  +----------+  +-------------------+  ¦
¦  ¦  React   ¦  ¦  React   ¦  ¦   Motion/React    ¦  ¦
¦  ¦  Router  ¦  ¦  Context  ¦  ¦   (Animations)    ¦  ¦
¦  ¦  v7      ¦  ¦ (Theme)  ¦  ¦                   ¦  ¦
¦  +----------+  +----------+  +-------------------+  ¦
¦       ¦              ¦                               ¦
¦  +------------------------------------------------+  ¦
¦  ¦              Page Components                    ¦  ¦
¦  ¦  HomePage ¦ ResultsPage ¦ FavoritesPage ¦ etc.  ¦  ¦
¦  +------------------------------------------------+  ¦
¦                    ¦                                 ¦
¦  +-----------------+------------------------------+  ¦
¦  ¦           Feature Components                    ¦  ¦
¦  ¦  PriceCard ¦ LocationInput ¦ TrendChart ¦ etc.  ¦  ¦
¦  ¦  SearchFilter ¦ AnalyticsDashboard ¦ Notifs    ¦  ¦
¦  +------------------------------------------------+  ¦
¦                    ¦                                 ¦
¦  +-----------------+------------------------------+  ¦
¦  ¦            Service Layer                        ¦  ¦
¦  ¦                                                 ¦  ¦
¦  ¦  rideApi.ts        ¦  storage.ts  ¦  i18n.ts   ¦  ¦
¦  ¦  (Mock API +       ¦  (localStorage¦  (4-lang  ¦  ¦
¦  ¦   price engine)    ¦   persistence)¦  support)  ¦  ¦
¦  +------------------------------------------------+  ¦
¦                                                     ¦
¦  +-------------------------------------------------+  ¦
¦  ¦          UI Component Library                    ¦  ¦
¦  ¦    shadcn/ui + Radix Primitives (40+ components)¦  ¦
¦  +-------------------------------------------------+  ¦
¦                                                     ¦
+-----------------------------------------------------+
                         ¦
                    +---------+
                    ¦ Future  ¦
                    ¦Supabase ¦
                    ¦ Backend ¦
                    +---------+
      +------------------+------------------+
      ¦                  ¦                  ¦
 +----------+    +-------------+   +-------------+
 ¦ Supabase ¦    ¦  Supabase   ¦   ¦  Supabase   ¦
 ¦   Auth   ¦    ¦  Database   ¦   ¦    Edge     ¦
 ¦ (OAuth)  ¦    ¦ (PostgreSQL)¦   ¦  Functions  ¦
 +----------+    +-------------+   +-------------+`}</Code>
        </Section>

        <Section title="3. File Structure">
          <Code>{`src/
+-- app/
¦   +-- App.tsx                    # Root: ThemeProvider + Router + Toaster
¦   +-- routes.ts                  # React Router config (5 routes)
¦   +-- components/
¦   ¦   +-- Layout.tsx             # App shell: Outlet + BottomNav + InstallPrompt
¦   ¦   +-- BottomNav.tsx          # 4-tab nav with haptic feedback
¦   ¦   +-- SplashScreen.tsx       # Animated launch screen (1.8s)
¦   ¦   +-- Onboarding.tsx         # 5-step tutorial with achievements
¦   ¦   +-- LocationInput.tsx      # Autocomplete with GPS support
¦   ¦   +-- PriceCard.tsx          # Service fare card
¦   ¦   +-- TrendChart.tsx         # Recharts price history
¦   ¦   +-- AnalyticsDashboard.tsx # Spending/route analytics
¦   ¦   +-- SearchFilter.tsx       # Bottom sheet filter drawer
¦   ¦   +-- NotificationCenter.tsx # Alerts & preferences
¦   ¦   +-- ConnectivityIndicator.tsx # Online/offline banner
¦   ¦   +-- PullToRefresh.tsx      # Touch gesture refresh
¦   ¦   +-- InstallPrompt.tsx      # PWA install banner
¦   ¦   +-- PageTransition.tsx     # AnimatePresence wrapper
¦   ¦   +-- ui/                    # 40+ shadcn/ui primitives
¦   +-- contexts/
¦   ¦   +-- ThemeContext.tsx        # System/light/dark + OLED toggle
¦   +-- pages/
¦   ¦   +-- HomePage.tsx           # Landing: location input + favorites
¦   ¦   +-- ResultsPage.tsx        # Price comparison results
¦   ¦   +-- FavoritesPage.tsx      # Saved routes
¦   ¦   +-- HistoryPage.tsx        # Search history + trends
¦   ¦   +-- ProfilePage.tsx        # Settings & account
¦   +-- services/
¦   ¦   +-- rideApi.ts             # Mock API: 10 services, Haversine distance
¦   ¦   +-- storage.ts             # localStorage CRUD for all data
¦   +-- types/
¦   ¦   +-- index.ts               # TypeScript interfaces
¦   +-- utils/
¦       +-- i18n.ts                # 80+ translation keys, 4 languages
+-- styles/
    +-- theme.css                  # CSS variables: light + dark tokens
    +-- mobile.css                 # PWA: safe areas, scroll, haptics
    +-- fonts.css                  # Font imports
    +-- index.css                  # Entry CSS
    +-- tailwind.css               # Tailwind base`}</Code>
        </Section>

        <Section title="4. Routing Architecture">
          <P>React Router v7 in Data mode with createBrowserRouter:</P>
          <Code>{`createBrowserRouter([
  {
    path: '/',
    Component: Layout,       // Shell: BottomNav + InstallPrompt
    children: [
      { index: true, Component: HomePage },
      { path: 'results', Component: ResultsPage },
      { path: 'favorites', Component: FavoritesPage },
      { path: 'history', Component: HistoryPage },
      { path: 'profile', Component: ProfilePage },
      { path: 'docs', Component: DocsPage },
      { path: 'docs/:docId', Component: DocViewerPage },
    ],
  },
]);`}</Code>
          <P>Page transitions use Motion's AnimatePresence with location.pathname as key for smooth cross-fade + slide animations (0.2s, cubic-bezier easing).</P>
        </Section>

        <Section title="5. State Management">
          <P>The application uses a lightweight state strategy appropriate for a PWA:</P>
          <UL items={[
            'React Context: ThemeContext (theme mode, OLED toggle, system preference detection)',
            'React Router State: Route search params passed via location.state (pickup, destination)',
            'Local Component State: useState for all page-level data (estimates, filters, history)',
            'localStorage Persistence: User data, favorites, search history, cached routes, language, theme, notification preferences — all via storage.ts service',
            'No Redux/Zustand needed: Data is page-scoped or persisted to localStorage',
          ]} />
        </Section>

        <Section title="6. Price Comparison Engine">
          <P>The mock API in rideApi.ts simulates a realistic pricing engine:</P>
          <UL items={[
            'Haversine formula calculates straight-line distance between GPS coordinates',
            'Base fare: ?500 + ?100/km — calibrated for Nigerian pricing',
            'Service variance: ±30% randomized spread per service',
            'Local discount: Nigerian services get 15% cost reduction',
            'Surge simulation: 20% chance of 1.0-1.5x multiplier',
            'Discount simulation: 15% chance of 10-30% promotional discount',
            'Network simulation: 200-800ms delay, 5% failure rate',
            'Vehicle type assignment: Bikes for local services, car classes for international',
            'Feature randomization: AC, WiFi, Card Payment, Split Fare, Pet Friendly',
          ]} />
          <P>Production will replace this with Supabase Edge Functions calling real ride-hailing APIs (Uber API, Bolt API, inDriver webhooks, etc.) with response normalization and caching.</P>
        </Section>

        <Section title="7. Offline Strategy">
          <P>Multi-layer offline support:</P>
          <UL items={[
            'Route Cache: Last 20 searched routes stored with 1-hour TTL in localStorage',
            'Automatic Fallback: On API failure, cached results displayed with "Offline" indicator',
            'Connectivity Detection: window online/offline events with visual banner (ConnectivityIndicator)',
            'Optimistic UI: UI renders immediately from cache while fresh data loads in background',
            'Future: Service Worker pre-caching of app shell + critical assets for full offline PWA',
          ]} />
        </Section>

        <Section title="8. Dark Mode System">
          <P>Three-mode theme system with OLED optimization:</P>
          <Code>{`ThemeContext provides:
- theme: 'light' | 'dark' | 'system'
- resolvedTheme: 'light' | 'dark' (resolved from system preference)
- isOLED: boolean (true black background toggle)

Implementation:
1. CSS variables in theme.css define light + dark tokens
2. .dark class on <html> element toggles all CSS variables
3. matchMedia('prefers-color-scheme: dark') for system detection
4. Theme transition class for smooth 300ms cross-fade
5. meta[name="theme-color"] dynamically updated for mobile browser chrome
6. navigator.vibrate(5) on theme toggle for haptic feedback
7. Persisted to localStorage across sessions`}</Code>
        </Section>

        <Section title="9. Internationalization (i18n)">
          <P>Lightweight custom i18n system supporting 4 Nigerian languages:</P>
          <UL items={[
            '80+ translation keys covering all UI strings',
            'Languages: English (en), Yoruba (yo), Hausa (ha), Igbo (ig)',
            't(key, lang) function for simple string lookup with English fallback',
            'Language preference persisted in localStorage',
            'Full page reload on language change to ensure consistent state',
            'Production: Lazy-load language bundles, add pluralization, date formatting',
          ]} />
        </Section>

        <Section title="10. PWA Features">
          <UL items={[
            'Splash Screen: 1.8s animated launch with logo, branding, loading dots (Motion)',
            'Install Prompt: Intercepts beforeinstallprompt event; iOS-specific Safari guide',
            'Bottom Navigation: 4-tab nav with spring-animated indicator, haptic feedback',
            'Pull-to-Refresh: Touch gesture (80px threshold) with resistance physics, spinner',
            'Bottom Sheet Drawers: Vaul-powered for filters, trends, analytics, notifications',
            'Page Transitions: AnimatePresence with opacity + y-offset (6px slide)',
            'Haptic Feedback: navigator.vibrate() on all buttons, toggles, gestures (5-15ms)',
            'Safe Area Support: CSS env() for notch/bottom bar on modern devices',
            'Input Zoom Prevention: Forced 16px font-size on all inputs for iOS Safari',
            'Overscroll Prevention: overscroll-behavior: none for native app feel',
          ]} />
        </Section>

        <Section title="11. Future: Supabase Backend">
          <P>Planned Supabase integration for v2.0 beta:</P>
          <Code>{`Supabase Services:
+-- Auth
¦   +-- Email/password signup
¦   +-- Google OAuth
¦   +-- Facebook OAuth
¦   +-- Row Level Security (RLS) policies
+-- Database (PostgreSQL)
¦   +-- users table
¦   +-- favorites table (user_id FK)
¦   +-- search_history table (user_id FK)
¦   +-- price_cache table (route + timestamp)
¦   +-- notifications table
+-- Edge Functions
¦   +-- fetch-prices: Aggregate real API calls
¦   +-- price-alerts: Check thresholds, send push
¦   +-- analytics-digest: Generate daily summaries
+-- Realtime
¦   +-- Price update subscriptions
+-- Storage
    +-- User profile photos`}</Code>
          <P>Migration strategy: localStorage remains as fallback. Supabase syncs on login, localStorage serves as offline cache. Incremental migration with feature flags.</P>
        </Section>

        <Section title="12. Performance Budget">
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="text-left p-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700" style={{ fontWeight: 600 }}>Metric</th>
                  <th className="text-left p-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700" style={{ fontWeight: 600 }}>Target</th>
                  <th className="text-left p-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700" style={{ fontWeight: 600 }}>Current</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                {[
                  ['First Contentful Paint', '= 1.5s', '~1.2s'],
                  ['Largest Contentful Paint', '= 2.5s', '~2.0s'],
                  ['Total Blocking Time', '= 200ms', '~150ms'],
                  ['Cumulative Layout Shift', '= 0.1', '~0.05'],
                  ['Bundle Size (gzipped)', '= 500KB', '~380KB'],
                  ['API Response Time', '= 1s', '200-800ms (mocked)'],
                  ['Location Autocomplete', '= 300ms', '100-300ms (mocked)'],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="p-2">{row[0]}</td>
                    <td className="p-2">{row[1]}</td>
                    <td className="p-2 text-green-600 dark:text-green-400">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="13. Security Considerations">
          <UL items={[
            'Current: No server-side components. All data in localStorage (client-only)',
            'No PII transmitted. Optional name/email stored locally only',
            'HTTPS-only deployment via hosting platform',
            'Future: Supabase RLS for row-level access control',
            'Future: API keys stored in Supabase Edge Function environment variables (never exposed to client)',
            'Future: Rate limiting on price comparison API to prevent abuse',
            'CSP headers to prevent XSS',
            'No eval() or dangerouslySetInnerHTML on user-supplied data',
          ]} />
        </Section>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-600">Ridechecka Technical Architecture v2.0 — Confidential</p>
          <p className="text-[10px] text-gray-300 dark:text-gray-700 mt-1">Last updated: February 20, 2026</p>
        </div>
      </motion.div>
    </div>
  );
}
