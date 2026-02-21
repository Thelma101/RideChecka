// Metrics Dashboard Specification — KPIs for Bolt API Partnership Pitch
// Confidential Internal Document
import { useNavigate } from 'react-router';
import { ArrowLeft, ShieldAlert, BarChart3, Users, Clock, TrendingUp, MapPin, Star, Share2, ArrowRightLeft, Target, Smartphone } from 'lucide-react';
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

function MetricCard({ icon: Icon, title, definition, target, howToTrack, whyBoltCares, isDark }: {
  icon: React.ElementType; title: string; definition: string; target: string; howToTrack: string; whyBoltCares: string; isDark: boolean;
}) {
  return (
    <div className={`p-4 rounded-xl mb-3 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <Icon className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>
        <div className="flex-1">
          <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{title}</p>
          <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}><strong>Definition:</strong> {definition}</p>
          <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}><strong>Target:</strong> {target}</p>
          <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}><strong>How to track:</strong> {howToTrack}</p>
          <div className={`mt-2 p-2 rounded-lg text-xs ${isDark ? 'bg-blue-950/40 text-blue-400' : 'bg-blue-50 text-blue-700'}`}>
            <strong>Why Bolt cares:</strong> {whyBoltCares}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MetricsDashboardPage() {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`min-h-full pb-10 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-gray-900 text-white px-5 pt-14 pb-8">
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate('/_rc-admin/docs')} className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-purple-300">Back to Documents</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] uppercase tracking-wider text-purple-400 font-semibold">Confidential</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Metrics Dashboard Spec</h1>
          <p className="text-purple-200/70 text-sm mt-1">KPIs that prove value to Bolt's API partnership team</p>
        </motion.div>
      </div>

      <div className="px-5 max-w-3xl">
        {/* Context */}
        <Section title="Purpose" isDark={isDark}>
          <div className={`p-5 rounded-xl text-sm leading-relaxed ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'}`}>
            <p>When we approach Bolt (or any ride service) for API access, we need a <strong>data-driven pitch deck</strong>. The metrics below are specifically chosen because they answer the questions Bolt's partnership team will ask:</p>
            <ul className="mt-3 list-disc ml-4 space-y-1 text-xs">
              <li>"How many users do you actually have?" → DAU, MAU, registration count</li>
              <li>"Do users stick around or churn?" → Retention rates, session frequency</li>
              <li>"How much business do you actually drive to us?" → Deep-link taps, conversion rate</li>
              <li>"Is this a real product or a side project?" → App store ratings, session duration, engagement depth</li>
              <li>"What geographic coverage do you have?" → City heatmaps, route density</li>
              <li>"What's the ROI of giving you API access?" → Attributed bookings, incremental users, savings data</li>
            </ul>
            <p className="mt-3">Each metric below includes exactly how to track it, what target to aim for, and why Bolt specifically cares about it.</p>
          </div>
        </Section>

        {/* ─── CORE METRICS ─── */}
        <Section title="Core User Metrics" isDark={isDark}>
          <MetricCard isDark={isDark}
            icon={Users}
            title="Daily Active Users (DAU)"
            definition="Unique users who open the app and perform at least 1 price comparison in a 24-hour period."
            target="1,500 DAU by Month 3. 5,000 DAU by Month 6."
            howToTrack="Supabase analytics or Mixpanel free tier. Track with session start event + comparison event. DAU = unique user_ids with ≥1 comparison event per day."
            whyBoltCares="DAU shows real, habitual engagement. A high DAU means users trust and rely on the app daily — these are high-intent riders, not casual downloaders."
          />
          <MetricCard isDark={isDark}
            icon={Users}
            title="Monthly Active Users (MAU)"
            definition="Unique users with ≥1 app session in a 30-day rolling window."
            target="10,000 MAU by Month 4. 50,000 MAU by Month 6."
            howToTrack="Same event tracking. MAU = distinct user_ids with ≥1 session in trailing 30 days. Report both registered and anonymous users separately."
            whyBoltCares="MAU is the headline number in every partnership pitch. Below 5K, you're too small to matter. Above 10K, you're worth a meeting. Above 50K, they'll proactively reach out."
          />
          <MetricCard isDark={isDark}
            icon={TrendingUp}
            title="DAU/MAU Ratio (Stickiness)"
            definition="DAU divided by MAU. Measures what fraction of monthly users come back daily."
            target="25%+ (world-class consumer apps are 20–30%). Do NOT let this drop below 15%."
            howToTrack="Calculated from DAU and MAU. Report weekly average."
            whyBoltCares="A 25% DAU/MAU ratio means 1 in 4 monthly users uses the app EVERY DAY. That's a utility — like checking weather. It proves habitual intent, not novelty."
          />
        </Section>

        <Section title="Retention Metrics" isDark={isDark}>
          <MetricCard isDark={isDark}
            icon={Clock}
            title="Day-1, Day-7, Day-30 Retention"
            definition="% of new users who return on Day 1, Day 7, and Day 30 after first use."
            target="D1: 40%+. D7: 25%+. D30: 15%+. (Industry avg for utility apps: D1 35%, D7 15%, D30 8%.)"
            howToTrack="Cohort analysis. Group users by signup date. Track return visits at each interval. Supabase + custom query or Mixpanel retention report."
            whyBoltCares="Retention proves product-market fit. If 15%+ of users are still active after 30 days, the app solves a real problem. High retention = sustained booking demand."
          />
          <MetricCard isDark={isDark}
            icon={Clock}
            title="Average Session Duration"
            definition="Time from app open to last interaction, averaged across all sessions."
            target="90–180 seconds. (Users should find what they need quickly — long sessions can mean confusion.)"
            howToTrack="Track session_start and session_end timestamps. Filter out sessions < 5s (bounces) and > 30 min (idle tabs)."
            whyBoltCares="Shows the app is functional and users engage meaningfully. Combined with comparison count, proves users are actively comparing, not just loading and leaving."
          />
          <MetricCard isDark={isDark}
            icon={ArrowRightLeft}
            title="Sessions Per User Per Week"
            definition="Average number of times a user opens the app per week."
            target="3–5 sessions/week. This means the app is part of their commute ritual."
            howToTrack="Count sessions per user_id per 7-day window. Report median (more robust than mean)."
            whyBoltCares="3+ sessions/week = the user checks RideChecka before every ride. Each session is a potential booking for Bolt."
          />
        </Section>

        <Section title="Engagement & Value Metrics" isDark={isDark}>
          <MetricCard isDark={isDark}
            icon={BarChart3}
            title="Comparisons Per User Per Session"
            definition="Number of distinct route comparisons a user makes in a single session."
            target="1.5–2.5 comparisons/session. Multiple comparisons = exploring options = high intent."
            howToTrack="Track each 'compare' event. Group by session_id. Calculate average."
            whyBoltCares="Multiple comparisons per session means the user is actively shopping — not browsing. These are purchase-intent signals, the most valuable traffic you can send."
          />
          <MetricCard isDark={isDark}
            icon={TrendingUp}
            title="Average Estimated Savings Per User (Monthly)"
            definition="The difference between the highest priced service and the service the user taps 'Book Now' on, summed across a month."
            target="₦3,000–8,000/user/month estimated savings."
            howToTrack="When user taps 'Book Now': savings = max(all prices shown) - price of selected service. Store per user. If user checks 20 rides/month and saves ₦400/ride avg, that's ₦8,000/month."
            whyBoltCares="'Our users save an average of ₦5,000/month' is the single most powerful marketing claim for both user acquisition AND partner pitches. If Bolt is the cheapest option 60% of the time, they benefit from this narrative."
          />
          <MetricCard isDark={isDark}
            icon={Target}
            title="Deep-Link Tap-Through Rate"
            definition="% of comparisons where the user taps 'Book Now' to open a specific ride service app."
            target="30–50% of comparisons should result in a tap-through."
            howToTrack="Track 'book_now_tap' event with service_id. Rate = book taps / total comparisons. Also track by service: 'Bolt received 45% of all book taps.'"
            whyBoltCares="This is THE metric. If 45% of our booking taps go to Bolt, and we have 10K MAU doing 3 sessions/week × 1.5 comparisons × 40% tap rate = ~18,000 monthly booking intents to Bolt. At ₦0 acquisition cost to them."
          />
          <MetricCard isDark={isDark}
            icon={ArrowRightLeft}
            title="Conversion Rate (Comparison → Actual Booking)"
            definition="% of deep-link taps that result in a completed ride. This is hard to track without API, but can be estimated."
            target="Estimated 40–60% of deep-link taps convert to actual bookings."
            howToTrack="Without API: use 'Report your fare' crowdsource feature as proxy. With API: track booking confirmation events. Industry benchmark: 50–70% of users who open a ride app with destination pre-filled complete the booking."
            whyBoltCares="We need to credibly claim: 'We send you X booking intents per month, of which Y convert to actual rides.' Even a conservative estimate (40% conversion) makes the numbers compelling."
          />
        </Section>

        <Section title="Geographic & Coverage Metrics" isDark={isDark}>
          <MetricCard isDark={isDark}
            icon={MapPin}
            title="Geographic Coverage Density"
            definition="Heatmap of where searches originate. Shows which neighborhoods/cities have active users."
            target="Lagos: 70%+ of searches. Abuja: 15%+. Port Harcourt: 5%+. 3+ cities with meaningful coverage."
            howToTrack="Store pickup coordinates for each comparison. Aggregate into hex cells (H3) or neighborhood-level buckets. Visualize as heatmap."
            whyBoltCares="A coverage heatmap shows exactly where RideChecka drives demand. If our users are concentrated in Lekki/VI/Ikeja — Bolt's highest-revenue zones — that's incredibly valuable. We're not sending them users in low-demand areas."
          />
          <MetricCard isDark={isDark}
            icon={MapPin}
            title="Top 100 O-D Pairs"
            definition="The 100 most-searched origin-destination routes on RideChecka."
            target="Document with route, search volume, average fare, price spread, and which service wins most often."
            howToTrack="Aggregate all comparison events. Group by rounded (pickup_lat, pickup_lng, dest_lat, dest_lng) coordinates. Rank by frequency."
            whyBoltCares="This is market intelligence that Bolt can only see for their own users. We show them the TOTAL ride demand landscape, including trips going to competitors. This data is valuable enough that Bolt might grant API access just to get regular reports."
          />
        </Section>

        <Section title="Brand & Social Metrics" isDark={isDark}>
          <MetricCard isDark={isDark}
            icon={Star}
            title="App Store / Play Store Rating"
            definition="Average star rating and total number of reviews on Google Play and Apple App Store."
            target="4.5+ stars with 200+ reviews by Month 6."
            howToTrack="Check weekly. Prompt happy users (those who find savings > ₦500) to rate. Use in-app rating prompt after 3rd successful comparison (iOS/Android native prompts)."
            whyBoltCares="A 4.5+ star rating signals quality. Bolt won't partner with a 3-star app. Reviews that mention 'saved money' and 'found cheaper rides' reinforce our value prop."
          />
          <MetricCard isDark={isDark}
            icon={Share2}
            title="Social Shares & Mentions"
            definition="Number of times users share price comparisons via WhatsApp/social media, plus organic mentions of RideChecka on Twitter/Instagram."
            target="500+ shares/month by Month 3. 50+ organic Twitter mentions/month."
            howToTrack="Track 'share' button taps in-app. Monitor Twitter/Instagram mentions with social listening tools (free: TweetDeck searches, Mention.com free tier). Screenshot and log notable mentions."
            whyBoltCares="Social proof. If RideChecka is being talked about organically on Nigerian tech Twitter, it signals genuine market demand. Screenshot compilations of positive tweets are powerful in pitch decks."
          />
          <MetricCard isDark={isDark}
            icon={Smartphone}
            title="PWA Install Rate"
            definition="% of web visitors who install the PWA to their home screen."
            target="15%+ install rate (industry avg for PWAs is 5–10%)."
            howToTrack="Track 'beforeinstallprompt' and 'appinstalled' events via the PWA lifecycle API. We already have InstallPrompt component."
            whyBoltCares="Installed PWA users are 3× more likely to return daily than web-only users. A high install rate means our user base is committed, not casual."
          />
        </Section>

        {/* ─── DASHBOARD MOCKUP ─── */}
        <Section title="Dashboard Layout Specification" isDark={isDark}>
          <div className={`p-5 rounded-xl text-sm ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'}`}>
            <p className={`font-semibold mb-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>When built, the internal metrics dashboard should show:</p>
            <div className="space-y-4 text-xs">
              <div>
                <p className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Row 1 — Hero KPIs (large number cards):</p>
                <p className="mt-1">DAU | MAU | DAU/MAU% | D30 Retention | Avg Savings/User</p>
              </div>
              <div>
                <p className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Row 2 — Trend Charts (7-day + 30-day):</p>
                <p className="mt-1">DAU over time | Comparisons/day | Deep-link taps/day | New registrations/day</p>
              </div>
              <div>
                <p className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Row 3 — Service Breakdown:</p>
                <p className="mt-1">Pie chart: % of "Book Now" taps per service (Bolt vs Uber vs inDriver vs others). Bar chart: avg fare per service for top 10 routes. Table: conversion rate per service.</p>
              </div>
              <div>
                <p className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Row 4 — Geographic Heatmap:</p>
                <p className="mt-1">Map of Nigeria (or Lagos zoomed) with H3 hex cells colored by search density. Click a cell to see top routes from that area.</p>
              </div>
              <div>
                <p className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Row 5 — Referral & Growth:</p>
                <p className="mt-1">Viral coefficient (K-factor) | Referral conversion rate | Waitlist count | Top referrers leaderboard</p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl mt-3 ${isDark ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
            <p className={`text-xs font-semibold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>Implementation note:</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-amber-300/70' : 'text-amber-600'}`}>
              Before building a custom dashboard, use free tools: Supabase's built-in analytics for user counts, Mixpanel free tier (up to 20M events/month) for retention and funnel analysis, and Google Sheets for manual weekly reporting. A custom dashboard is a Month 4+ investment — don't build it until the numbers are worth dashboarding.
            </p>
          </div>
        </Section>

        {/* ─── PITCH DECK METRICS FORMAT ─── */}
        <Section title="How to Present These Metrics to Bolt" isDark={isDark}>
          <div className={`p-5 rounded-xl text-sm space-y-4 ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'}`}>
            <div>
              <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Slide 1: "The Demand We've Built"</p>
              <p className="text-xs mt-1">MAU number (big), DAU/MAU ratio, 30-day retention. One line: "X thousand Nigerians check ride prices on RideChecka every month."</p>
            </div>
            <div>
              <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Slide 2: "The Business We Send You"</p>
              <p className="text-xs mt-1">Monthly deep-link taps to Bolt specifically. Estimated conversion to actual bookings. Geographic heatmap showing overlap with Bolt's high-revenue zones.</p>
            </div>
            <div>
              <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Slide 3: "The Market Intelligence"</p>
              <p className="text-xs mt-1">Top 20 O-D pairs with cross-service price comparison. Show where Bolt wins (reinforce their value) and where they lose (opportunity to adjust pricing or improve service).</p>
            </div>
            <div>
              <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Slide 4: "The Ask"</p>
              <p className="text-xs mt-1">"With your real-time pricing API, we can increase booking conversion by 25% (because estimated prices → exact prices). We project sending you X,000 additional completed rides per month. Revenue share: 2–3% of attributed booking fees."</p>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className={`text-[10px] ${isDark ? 'text-gray-700' : 'text-gray-400'}`}>
            Metrics Dashboard Spec v1.0 — February 2026 — Confidential
          </p>
        </div>
      </div>
    </div>
  );
}
