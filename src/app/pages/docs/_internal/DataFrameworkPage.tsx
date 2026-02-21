// Data Collection & Analysis Framework — Confidential Internal Document
// User behavior insights, tracking architecture, and partner pitch data
import { useNavigate } from 'react-router';
import { ArrowLeft, ShieldAlert, Database, Search, Route, Clock, Users, TrendingUp, FileBarChart, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../../contexts/ThemeContext';

function Section({ title, children, isDark }: { title: string; children: React.ReactNode; isDark: boolean }) {
  return (
    <div className="mt-8">
      <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
      {children}
    </div>
  );
}

function EventCard({ name, properties, purpose, isDark }: { name: string; properties: string[]; purpose: string; isDark: boolean }) {
  return (
    <div className={`p-4 rounded-xl mb-3 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <p className={`text-sm font-mono font-semibold ${isDark ? 'text-green-400' : 'text-green-700'}`}>{name}</p>
      <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}><strong>Purpose:</strong> {purpose}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {properties.map((p, i) => (
          <span key={i} className={`text-[10px] font-mono px-2 py-0.5 rounded ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>{p}</span>
        ))}
      </div>
    </div>
  );
}

export function DataFrameworkPage() {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`min-h-full pb-10 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-900 via-cyan-800 to-gray-900 text-white px-5 pt-14 pb-8">
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate('/_rc-admin/docs')} className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-cyan-300">Back to Documents</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-semibold">Confidential</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Data Collection & Analysis Framework</h1>
          <p className="text-cyan-200/70 text-sm mt-1">User behavior tracking, insights architecture, and pitch-ready reporting</p>
        </motion.div>
      </div>

      <div className="px-5 max-w-3xl">
        {/* ─── OVERVIEW ─── */}
        <Section title="Framework Overview" isDark={isDark}>
          <div className={`p-5 rounded-xl text-sm leading-relaxed ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'}`}>
            <p>Every user interaction on RideChecka generates valuable data. This framework defines exactly what data to collect, how to store it, how to analyze it, and how to package it for partner pitches.</p>
            <p className="mt-3"><strong className={isDark ? 'text-gray-200' : 'text-gray-800'}>Three pillars:</strong></p>
            <ul className="mt-2 list-disc ml-4 space-y-1 text-xs">
              <li><strong>Event tracking</strong> — capture every meaningful user action as a structured event</li>
              <li><strong>Aggregation & analysis</strong> — roll events into insights (patterns, segments, trends)</li>
              <li><strong>Reporting</strong> — present insights in pitch-ready formats for partners and investors</li>
            </ul>
            <p className="mt-3"><strong className={isDark ? 'text-gray-200' : 'text-gray-800'}>Privacy principle:</strong> We never track personal identity beyond what users voluntarily provide. All behavior data is analyzed in aggregate. Individual user data is anonymized in external reports. We comply with NDPR (Nigeria Data Protection Regulation).</p>
          </div>
        </Section>

        {/* ─── EVENT TRACKING SCHEMA ─── */}
        <Section title="1. Event Tracking Schema" isDark={isDark}>
          <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Every event follows this base structure, stored in Supabase or sent to Mixpanel:
          </p>
          <div className={`p-4 rounded-xl font-mono text-xs leading-relaxed mb-4 ${isDark ? 'bg-gray-900 text-cyan-400' : 'bg-gray-900 text-cyan-300'}`}>
            <p>{'{'}</p>
            <p className="ml-4">event_name: string,</p>
            <p className="ml-4">user_id: string | null,</p>
            <p className="ml-4">session_id: string,</p>
            <p className="ml-4">timestamp: ISO8601,</p>
            <p className="ml-4">properties: {'{ ... }'}</p>
            <p>{'}'}</p>
          </div>

          <EventCard isDark={isDark}
            name="session_start"
            properties={['device_type', 'browser', 'referrer', 'utm_source', 'utm_medium', 'is_pwa', 'city_detected', 'language']}
            purpose="Tracks every app open. Captures how users find us (referral, direct, social), what device they use, and whether they installed the PWA."
          />
          <EventCard isDark={isDark}
            name="comparison_search"
            properties={['pickup_lat', 'pickup_lng', 'pickup_address', 'dest_lat', 'dest_lng', 'dest_address', 'distance_km', 'time_of_day', 'day_of_week', 'is_favorite_route']}
            purpose="The core event. Every price comparison. This builds our route demand database and feeds the O-D pair analytics."
          />
          <EventCard isDark={isDark}
            name="results_viewed"
            properties={['services_shown', 'cheapest_service', 'most_expensive_service', 'price_spread_pct', 'load_time_ms']}
            purpose="What the user sees after searching. Tells us which services appear, price competitiveness, and app performance."
          />
          <EventCard isDark={isDark}
            name="book_now_tap"
            properties={['service_id', 'service_name', 'estimated_price', 'is_cheapest', 'rank_position', 'price_vs_cheapest_pct']}
            purpose="THE conversion event. Which service did they choose? Was it the cheapest? If not, why (brand preference, vehicle type, etc.)?"
          />
          <EventCard isDark={isDark}
            name="fare_report"
            properties={['service_id', 'route_pickup', 'route_dest', 'estimated_price', 'actual_price', 'difference_pct', 'surge_reported']}
            purpose="Crowdsourced fare data. Users report what they actually paid. This calibrates our model AND provides verified data for partners."
          />
          <EventCard isDark={isDark}
            name="share_action"
            properties={['channel', 'route_shared', 'savings_amount', 'referral_code']}
            purpose="Tracks viral sharing. Which channel (WhatsApp, Twitter, copy link)? What savings prompted the share?"
          />
          <EventCard isDark={isDark}
            name="favorite_saved"
            properties={['route_pickup', 'route_dest', 'route_name', 'total_favorites_count']}
            purpose="Route commitment signal. Users who save favorites have 3× higher retention. Tracks which routes have strong demand."
          />
        </Section>

        {/* ─── USER COMPARISON PATTERNS ─── */}
        <Section title="2. User Comparison Pattern Analysis" isDark={isDark}>
          <div className="space-y-3">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Search Frequency Segmentation</p>
              <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                <strong>Power users (5+ comparisons/week):</strong> Likely daily commuters. They check every ride. Highest LTV, most responsive to alerts/favorites. Estimate: 15% of users, 50% of total comparisons.<br /><br />
                <strong>Regular users (2–4 comparisons/week):</strong> Check before non-routine trips (meetings, events, weekends). Responsive to content marketing and price alerts. Estimate: 35% of users, 35% of comparisons.<br /><br />
                <strong>Casual users (1 or fewer/week):</strong> Discovered the app but haven't formed the habit yet. These are the retention challenge. Need onboarding nudges, push notifications, and gamification to convert to regular users. Estimate: 50% of users, 15% of comparisons.
              </p>
            </div>

            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Service Selection Patterns</p>
              <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Track what users <em>actually do</em> when shown comparison results:<br /><br />
                <strong>Price-driven (always picks cheapest):</strong> Estimated 55–65% of users. These validate our core value prop. They will switch services trip-by-trip based on price. The most valuable segment for partner pitches ("we drive users to whoever is cheapest").<br /><br />
                <strong>Brand-loyal (picks Bolt/Uber regardless):</strong> Estimated 20–25% of users. They use RideChecka for confirmation, not discovery. Still valuable — they generate comparison data and share with price-driven friends.<br /><br />
                <strong>Comfort-driven (picks Comfort/XL even if costlier):</strong> Estimated 10–15%. Higher spend per trip. Interesting to premium tiers at Bolt/Uber.<br /><br />
                <strong>Bid-seekers (gravitates to inDriver):</strong> Estimated 5–10%. Willing to wait for a lower bid. These users have the highest price sensitivity and the longest sessions.
              </p>
            </div>
          </div>
        </Section>

        {/* ─── PREFERRED ROUTES ─── */}
        <Section title="3. Route Intelligence" isDark={isDark}>
          <div className={`p-5 rounded-xl text-sm ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'}`}>
            <p className={`font-semibold mb-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Top Route Analysis (to be compiled monthly)</p>
            <div className="space-y-3 text-xs">
              <div>
                <p className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Route Demand Ranking</p>
                <p className="mt-1">Rank all searched routes by frequency. Top 100 routes represent an estimated 40–50% of total searches (power-law distribution). These are your "money routes" — highest ROI for accuracy improvement and partner value.</p>
              </div>
              <div>
                <p className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Route Price Volatility Index</p>
                <p className="mt-1">For each popular route, calculate the standard deviation of prices across services and across times. Routes with high volatility (e.g., Airport pickups during Harmattan) are where RideChecka adds the most value — users NEED to compare because prices are unpredictable.</p>
              </div>
              <div>
                <p className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Winning Service Per Route</p>
                <p className="mt-1">For each top route, which service is cheapest most often? Example: "Lekki → VI: Bolt wins 62% of the time, inDriver 25%, Uber 13%." This data is gold for Bolt's pitch: "On 62% of high-demand Lagos routes, your service is already the cheapest. Our app proves that to users, driving them to you."</p>
              </div>
              <div>
                <p className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Time-of-Day Route Demand</p>
                <p className="mt-1">Map when each route is most searched: 7–9AM (commute out), 12–2PM (lunch), 5–8PM (commute home), 10PM–12AM (nightlife). This tells services when to have more drivers positioned on specific routes.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── PRICE SENSITIVITY ─── */}
        <Section title="4. Price Sensitivity Analysis" isDark={isDark}>
          <div className="space-y-3">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Switching Threshold</p>
              <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Key question: How much cheaper does a service need to be before users switch?<br /><br />
                <strong>Methodology:</strong> Track cases where a user sees results, and the service they tap "Book Now" on is NOT the cheapest. Calculate the price difference they were willing to ignore.<br /><br />
                <strong>Expected findings:</strong> For trips under ₦3,000, users will switch services for a ₦300+ difference (~10%). For trips ₦3,000–8,000, the threshold rises to ₦500–800 (~12–15%). For trips above ₦8,000, a ₦1,000+ difference triggers switching.<br /><br />
                <strong>For the Bolt pitch:</strong> "Our data shows that 65% of Nigerian riders will switch from Uber to Bolt if the price difference exceeds ₦400. On the routes where Bolt is ₦400+ cheaper, we funnel those users directly to you."
              </p>
            </div>

            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Surge Tolerance</p>
              <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                When surge pricing is active, do users: (a) book anyway, (b) switch to a non-surging service, or (c) wait and retry later?<br /><br />
                Track by comparing search time with "Book Now" tap time. If a user searches at 6PM (peak), doesn't tap, then searches again at 7:30PM (post-peak), that's a "wait" behavior.<br /><br />
                <strong>Insight value:</strong> If 40% of users switch services during surge, that's a massive opportunity for whichever service keeps surge lowest. We can tell Bolt: "During Uber's surge periods, 40% of our users switch to you. Here's the revenue you're already capturing, and here's how we can send you more."
              </p>
            </div>
          </div>
        </Section>

        {/* ─── PEAK USAGE TIMES ─── */}
        <Section title="5. Peak Usage Time Analysis" isDark={isDark}>
          <div className={`p-5 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <p className={`text-sm font-semibold mb-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Expected Usage Distribution (Lagos baseline)</p>
            <div className="space-y-2 text-xs">
              {[
                { time: '6:00–9:00 AM', pct: '25%', note: 'Morning commute. Highest conversion rate (people NEED to get to work). Home→Office routes dominate.' },
                { time: '9:00–12:00 PM', pct: '10%', note: 'Low activity. Mostly freelancers and non-9-to-5 workers. Good for testing/maintenance windows.' },
                { time: '12:00–2:00 PM', pct: '12%', note: 'Lunch + errands. Short trips. Restaurant→Office returns.' },
                { time: '2:00–5:00 PM', pct: '8%', note: 'Lowest usage. Meeting-transit trips, sales team movements.' },
                { time: '5:00–8:00 PM', pct: '28%', note: 'PEAK. Evening commute + dinner + social. Highest search volume AND highest surge → highest RideChecka value.' },
                { time: '8:00–11:00 PM', pct: '12%', note: 'Nightlife, events, late dinners. Longer trips. Higher willingness to pay.' },
                { time: '11:00 PM–6:00 AM', pct: '5%', note: 'Late night/early morning. Airport runs, club exits. Safety premium > price sensitivity.' },
              ].map(({ time, pct, note }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`text-[10px] font-mono w-24 flex-shrink-0 pt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{time}</span>
                  <span className={`font-bold w-8 flex-shrink-0 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>{pct}</span>
                  <span className={`${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{note}</span>
                </div>
              ))}
            </div>
            <p className={`text-xs mt-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              Implication: Content posting, push notifications, and WhatsApp broadcasts should target 6:30–7:00 AM (catch the commuters before they book) and 4:30–5:00 PM (before peak surge makes prices unpredictable).
            </p>
          </div>
        </Section>

        {/* ─── DEMOGRAPHIC SEGMENTATION ─── */}
        <Section title="6. User Demographic Segmentation" isDark={isDark}>
          <div className={`p-5 rounded-xl text-sm ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'}`}>
            <p className="mb-3"><strong className={isDark ? 'text-gray-200' : 'text-gray-800'}>Note:</strong> We won't collect demographic data directly (privacy first). Instead, we infer segments from behavior:</p>
            <div className="space-y-4 text-xs">
              <div>
                <p className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Segment A: "Daily Commuters" (inferred)</p>
                <p className="mt-1"><em>Signals:</em> Same pickup address 80%+ of searches, searches cluster at 7–9AM and 5–7PM, Mon–Fri heavy, uses favorites. <em>Estimated:</em> 30% of users. <em>Value:</em> Highest LTV, most predictable, ideal for subscription features.</p>
              </div>
              <div>
                <p className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Segment B: "Weekend Warriors" (inferred)</p>
                <p className="mt-1"><em>Signals:</em> 60%+ of searches on Fri–Sun, varied destinations (restaurants, clubs, event venues), evening-heavy. <em>Estimated:</em> 25% of users. <em>Value:</em> Higher price tolerance, responsive to "weekend deals" content.</p>
              </div>
              <div>
                <p className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Segment C: "Budget Maximizers" (inferred)</p>
                <p className="mt-1"><em>Signals:</em> Always picks the cheapest option, frequently uses inDriver, average price per trip below ₦2,000. <em>Estimated:</em> 25% of users. <em>Value:</em> Drives the viral loop (most likely to share savings), validates our core value prop.</p>
              </div>
              <div>
                <p className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Segment D: "Comfort Seekers" (inferred)</p>
                <p className="mt-1"><em>Signals:</em> Picks Comfort/XL tiers even when economy is 30%+ cheaper. Average price above ₦5,000/trip. <em>Estimated:</em> 10% of users. <em>Value:</em> Higher revenue per trip for partners, less price-sensitive but values convenience of comparison.</p>
              </div>
              <div>
                <p className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Segment E: "Students" (inferred)</p>
                <p className="mt-1"><em>Signals:</em> Searches originate from university zones (UNILAG, LASU, etc.), bike services (Gokada, MAX) selected frequently, small trip distances. <em>Estimated:</em> 10% of users. <em>Value:</em> High referral rates, strong social media amplification, long customer lifetime (3–5 years of university).</p>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── REPORT FORMATS ─── */}
        <Section title="7. Pitch-Ready Report Templates" isDark={isDark}>
          <div className="space-y-3">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Weekly Internal Report (1 page)</p>
              <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                5 hero numbers: DAU, MAU, comparisons, deep-link taps, new users. 1 trend chart: DAU over 7 days. 1 insight: "This week's notable finding." Takes 15 minutes to compile from Supabase queries. Shared internally every Monday.
              </p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Monthly Partner Report (5 pages)</p>
              <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Page 1: Executive summary (MAU, growth rate, retention). Page 2: Service-level breakdown (which services get most taps, where each wins). Page 3: Geographic heatmap + top 20 routes. Page 4: User behavior insights (switching patterns, surge tolerance). Page 5: Projections for next month. This document goes to Bolt/Uber in partnership discussions.
              </p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Quarterly Investor Update (10 slides)</p>
              <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Slides: (1) Headline metrics, (2) Growth chart, (3) Retention cohorts, (4) Unit economics (CAC, LTV proxy), (5) Product milestones, (6) Partnership pipeline, (7) Competitive landscape, (8) Revenue model progress, (9) Team update, (10) Ask/next milestones. Format in Google Slides with the RideChecka brand colors.
              </p>
            </div>
          </div>
        </Section>

        {/* ─── TOOLS STACK ─── */}
        <Section title="8. Recommended Tools Stack" isDark={isDark}>
          <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <table className="w-full text-left">
              <thead>
                <tr className={`text-[10px] uppercase tracking-wide font-semibold ${isDark ? 'text-gray-400 bg-gray-800/60' : 'text-gray-500 bg-gray-100'}`}>
                  <th className="px-3 py-2.5">Purpose</th>
                  <th className="px-3 py-2.5">Tool</th>
                  <th className="px-3 py-2.5">Cost</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {[
                  ['Event tracking', 'Mixpanel (free tier: 20M events/mo)', '₦0'],
                  ['Database / Auth', 'Supabase (already in use)', '₦0'],
                  ['Session recording', 'PostHog (free tier: 1M events/mo)', '₦0'],
                  ['Heatmaps', 'PostHog or Microsoft Clarity', '₦0'],
                  ['Social listening', 'TweetDeck + manual monitoring', '₦0'],
                  ['Reporting', 'Google Sheets + Google Slides', '₦0'],
                  ['Retention analysis', 'Mixpanel retention reports', '₦0'],
                  ['Push notifications', 'OneSignal (free tier: 10K users)', '₦0'],
                ].map(([purpose, tool, cost], i) => (
                  <tr key={i} className={isDark ? 'text-gray-300 border-gray-800' : 'text-gray-700 border-gray-100'}>
                    <td className={`px-3 py-2.5 border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>{purpose}</td>
                    <td className={`px-3 py-2.5 border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>{tool}</td>
                    <td className={`px-3 py-2.5 border-b font-semibold ${isDark ? 'border-gray-800 text-green-400' : 'border-gray-100 text-green-600'}`}>{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`text-xs mt-3 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            Total analytics cost: ₦0. All tools have free tiers sufficient for our first 50K users. Upgrade when we hit limits (Mixpanel paid starts at $20/mo for 100M events, PostHog paid at $0/mo for first 1M events then $0.00031/event).
          </p>
        </Section>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className={`text-[10px] ${isDark ? 'text-gray-700' : 'text-gray-400'}`}>
            Data Framework v1.0 — February 2026 — Confidential
          </p>
        </div>
      </div>
    </div>
  );
}
