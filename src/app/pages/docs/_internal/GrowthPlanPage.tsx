// Phased Growth Strategy — Specific Milestones & Timelines
// Confidential Internal Document
import { useNavigate } from 'react-router';
import { ArrowLeft, ShieldAlert, Rocket, Target, TrendingUp, Users, Zap, Award, CheckCircle2 } from 'lucide-react';
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

function Milestone({ week, title, metric, actions, risk, isDark }: { week: string; title: string; metric: string; actions: string[]; risk: string; isDark: boolean }) {
  return (
    <div className={`p-4 rounded-xl mb-3 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>{week}</span>
        <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{title}</p>
      </div>
      <div className={`text-xs px-3 py-1.5 rounded-lg mb-2 ${isDark ? 'bg-green-950/40 text-green-400' : 'bg-green-50 text-green-700'}`}>
        Target: {metric}
      </div>
      <ul className={`text-xs space-y-1 list-disc ml-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
        {actions.map((a, i) => <li key={i}>{a}</li>)}
      </ul>
      <div className={`mt-2 text-xs ${isDark ? 'text-red-400/60' : 'text-red-500/70'}`}>
        Risk: {risk}
      </div>
    </div>
  );
}

export function GrowthPlanPage() {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`min-h-full pb-10 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-900 via-orange-800 to-gray-900 text-white px-5 pt-14 pb-8">
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate('/_rc-admin/docs')} className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-orange-300">Back to Documents</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-4 h-4 text-orange-400" />
            <span className="text-[10px] uppercase tracking-wider text-orange-400 font-semibold">Confidential</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Phased Growth Plan</h1>
          <p className="text-orange-200/70 text-sm mt-1">0 → 150K users in 6 months — milestones, timelines, and contingencies</p>
        </motion.div>
      </div>

      <div className="px-5 max-w-3xl">
        {/* ─── TARGETS OVERVIEW ─── */}
        <Section title="Growth Targets Summary" isDark={isDark}>
          <div className="grid grid-cols-3 gap-3">
            {[
              { phase: 'Phase 1', period: 'Months 1–2', users: '10,000', mar: '40%', color: isDark ? 'bg-blue-950 border-blue-800' : 'bg-blue-50 border-blue-200' },
              { phase: 'Phase 2', period: 'Months 3–4', users: '50,000', mar: '35%', color: isDark ? 'bg-green-950 border-green-800' : 'bg-green-50 border-green-200' },
              { phase: 'Phase 3', period: 'Months 5–6', users: '150,000', mar: '30%', color: isDark ? 'bg-purple-950 border-purple-800' : 'bg-purple-50 border-purple-200' },
            ].map((p, i) => (
              <div key={i} className={`p-3 rounded-xl border text-center ${p.color}`}>
                <p className={`text-[10px] font-semibold uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{p.phase}</p>
                <p className={`text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{p.users}</p>
                <p className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{p.period}</p>
                <p className={`text-[10px] mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>MAR: {p.mar}</p>
              </div>
            ))}
          </div>
          <div className={`mt-4 p-4 rounded-xl text-xs ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'}`}>
            <p><strong className={isDark ? 'text-gray-200' : 'text-gray-800'}>Viral coefficient target:</strong> K-factor (viral coefficient) = invites sent per user × conversion rate of invites. At K &gt; 1.0, growth is self-sustaining. Target K = 1.5 by Month 5, meaning each user brings in 1.5 new users on average. This is aggressive but achievable if 30% of users share and 20% of share recipients convert.</p>
            <p className="mt-2"><strong className={isDark ? 'text-gray-200' : 'text-gray-800'}>Realistic calibration:</strong> These targets assume Nigerian market dynamics: high mobile penetration, WhatsApp virality, extreme price sensitivity in the ride-hailing segment, and zero existing competition in the comparison space. If any assumption fails, Phase 3 may slip 1–2 months.</p>
          </div>
        </Section>

        {/* ─── PHASE 1 ─── */}
        <Section title="Phase 1: Foundation & Early Traction (Months 1–2)" isDark={isDark}>
          <div className={`p-4 rounded-xl mb-4 ${isDark ? 'bg-blue-950/30 border border-blue-900' : 'bg-blue-50 border border-blue-200'}`}>
            <p className={`text-sm font-bold ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>Goal: 10,000 registered users • 4,000 MAU • 40% Monthly Active Rate</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-blue-400/70' : 'text-blue-600'}`}>
              Focus: Product polish, initial distribution channels, and establishing the comparison habit among early adopters.
            </p>
          </div>

          <Milestone isDark={isDark}
            week="Week 1–2"
            title="Product readiness + soft launch"
            metric="500 registered users"
            actions={[
              'Finalize PWA: install prompt, offline fallback, push notification permission flow',
              'Set up Mixpanel event tracking (session_start, comparison_search, book_now_tap, share_action)',
              'Create referral system: unique URL per user (?ref=USER_ID), attribution tracking in Supabase',
              'Soft launch: Share in personal networks, Nigerian tech WhatsApp groups (10–15 groups, ~2,000 total members)',
              'Post launch announcement on Twitter/X tagging @TechCabal, @Techpoint_Africa, @BenjaminDada',
              'Set up Google Search Console and submit sitemap for SEO crawling',
            ]}
            risk="Low user quality from personal networks (they'll try once but may not retain). Guard against vanity metrics — focus on D7 retention, not just signups."
          />

          <Milestone isDark={isDark}
            week="Week 3–4"
            title="Campus launch + WhatsApp engine"
            metric="2,500 registered users • 1,000 MAU"
            actions={[
              'Recruit 5 campus ambassadors: UNILAG, LASU, Covenant, Babcock, OAU (₦15K/month each)',
              'Each ambassador creates campus WhatsApp group and posts 3 comparisons/week for campus routes',
              'Launch "RideChecka Lagos" and "RideChecka Abuja" WhatsApp broadcast lists — daily price update at 7:30AM',
              'Publish first 2 SEO pages: "How much is Uber from Lekki to VI" and "Bolt price from Ikeja to Airport"',
              'Run first Twitter thread: "I compared all 16 ride services in Lagos. Here\'s what I found 🧵"',
              'Print 1,000 QR stickers for campus canteens, hostels, and campus gates',
            ]}
            risk="Ambassador quality varies. Vet by asking for sample WhatsApp posts before hiring. Fire fast if engagement is low."
          />

          <Milestone isDark={isDark}
            week="Week 5–6"
            title="Content engine starts + referral acceleration"
            metric="5,000 registered users • 2,200 MAU"
            actions={[
              'Launch weekly "Lagos Price Report" infographic series (Monday mornings)',
              'Publish 5 more SEO pages for high-search-volume routes',
              'Activate referral tier rewards (Tier 1: Price Alerts at 5 referrals)',
              'First "How I Saved ₦X" user story on Instagram Reels (real user, real savings)',
              'Engage with ride-hailing complaints on Twitter — reply with RideChecka screenshots',
              'Add "Total Savings Counter" to user profile (cumulative estimated savings)',
              'Approach 1 coworking space for QR code placement (test conversion)',
            ]}
            risk="Content creation bottleneck if doing everything solo. Batch-create 4 weeks of infographics in one day. Use Canva templates."
          />

          <Milestone isDark={isDark}
            week="Week 7–8"
            title="10K milestone + retention focus"
            metric="10,000 registered users • 4,000 MAU (40%)"
            actions={[
              'If behind target: double down on WhatsApp distribution (join 20 more groups), increase ambassador posting frequency',
              'If on target: shift focus from acquisition to retention — analyze D7 and D30 cohorts',
              'Launch "Daily Savings Streak" gamification feature',
              'First corporate pitch: approach 3 tech companies in VI (Andela, Flutterwave, Kuda) for employee onboarding',
              'Compile first Monthly Partner Report (5 pages) with actual data — this becomes our Bolt pitch foundation',
              'Publish first "Price Report: Abuja Edition" to expand beyond Lagos',
              'Survey 50 active users: "What would make you use RideChecka more?" (use Typeform or Google Forms)',
            ]}
            risk="40% MAR is aggressive. If MAR drops below 30%, prioritize push notifications and WhatsApp re-engagement over new user acquisition. A 30% MAR with 10K users is better than 20% MAR with 15K users."
          />

          <div className={`p-4 rounded-xl ${isDark ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
            <p className={`text-xs font-semibold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>Phase 1 Success Criteria (all must be met to proceed to Phase 2):</p>
            <ul className={`text-xs mt-2 space-y-1 list-disc ml-4 ${isDark ? 'text-amber-300/70' : 'text-amber-600'}`}>
              <li>≥10,000 registered users</li>
              <li>≥3,500 MAU (35% minimum, 40% target)</li>
              <li>D7 retention ≥20%</li>
              <li>≥1,000 deep-link taps per month</li>
              <li>≥3 campuses actively engaged</li>
              <li>≥10 SEO pages published and indexed</li>
            </ul>
          </div>
        </Section>

        {/* ─── PHASE 2 ─── */}
        <Section title="Phase 2: Growth & Partnerships (Months 3–4)" isDark={isDark}>
          <div className={`p-4 rounded-xl mb-4 ${isDark ? 'bg-green-950/30 border border-green-900' : 'bg-green-50 border border-green-200'}`}>
            <p className={`text-sm font-bold ${isDark ? 'text-green-300' : 'text-green-800'}`}>Goal: 50,000 registered users • 17,500 MAU • 35% retention</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-green-400/70' : 'text-green-600'}`}>
              Focus: Scale distribution channels, lock in partnerships, and build the data story for Bolt pitch.
            </p>
          </div>

          <Milestone isDark={isDark}
            week="Month 3, Week 1–2"
            title="Partner channel activation"
            metric="18,000 registered users"
            actions={[
              'Scale campus ambassadors to 10 (add 5: UI, FUTA, UNIBEN, Nile, ABUTH)',
              'Launch corporate pilot with 2 companies — onboard 200+ employees each',
              'Approach OPay/PalmPay for widget partnership (prepare 3-page proposal with Phase 1 data)',
              'Print 3,000 more QR stickers — deploy at 30 restaurants, 20 salons, 10 pharmacies in Lagos',
              'Launch "Fare Predictor" daily mini-game for engagement',
              'Begin crowdsourced fare reporting — prompt users post-deep-link: "How much did you actually pay?"',
            ]}
            risk="Corporate onboarding is slow (HR approvals). Start conversations in Week 1, expect activation by Week 3–4."
          />

          <Milestone isDark={isDark}
            week="Month 3, Week 3–4"
            title="Content scale + Abuja expansion"
            metric="28,000 registered users"
            actions={[
              'Publish 3 TikTok videos/week ("Did you know Bolt is 30% cheaper for VI to Lekki?")',
              'Launch Abuja-specific campaign: 3 campus ambassadors, local WhatsApp groups, Abuja Price Report',
              'First Instagram collaboration with a Lagos lifestyle micro-influencer (5K–20K followers, pay ₦20K–50K)',
              'Compile 50+ crowdsourced fare reports — begin auto-adjusting fare model coefficients',
              'A/B test referral rewards: current tiers vs. instant ₦200 airtime on first referral conversion',
              'Publish case study: "How RideChecka saved UNILAG students ₦X in 2 months" with real data',
            ]}
            risk="TikTok requires consistent posting for 3–4 weeks before the algorithm picks you up. Don't expect immediate results."
          />

          <Milestone isDark={isDark}
            week="Month 4, Week 1–2"
            title="Fintech + SEO compound growth"
            metric="38,000 registered users"
            actions={[
              'If OPay/PalmPay partnership progresses: integrate landing page widget (expect 5,000–10,000 users from this alone)',
              'If not: pivot to Kuda/Piggyvest partnership or focus on organic channels',
              'SEO should now deliver 500+ organic visitors/week from 30+ published route pages',
              'Launch "RideChecka Pro" waitlist — set up landing page with waitlist position + referral boost mechanic',
              'Run first church partnership: 2 RCCG parishes in Lagos — QR codes in bulletins',
              'Approach Bolt Nigeria\'s business development team for initial informal conversation (not the API ask yet)',
            ]}
            risk="Fintech partnership is the wildcard. It could 5× our growth or deliver zero. Have organic growth as the reliable baseline."
          />

          <Milestone isDark={isDark}
            week="Month 4, Week 3–4"
            title="50K milestone + data compilation"
            metric="50,000 registered users • 17,500 MAU"
            actions={[
              'Compile comprehensive Monthly Partner Report with 4 months of data',
              'Document top 100 O-D pairs with service-level winning percentages',
              'Calculate total deep-link taps to Bolt specifically — this is the pitch headline',
              'Apply for Google Play Store listing (PWA → TWA wrapper) and Apple App Store (PWA → Capacitor)',
              'Request app store reviews from top 200 most active users',
              'Prepare formal partnership pitch deck for Bolt, Uber, and inDriver',
              'If viral coefficient < 1.0: invest ₦100K in targeted Instagram/Twitter ads for Lagos to accelerate',
            ]}
            risk="50K is ambitious. Realistic range: 35K–55K. If below 35K, extend Phase 2 by 1 month before entering Phase 3."
          />

          <div className={`p-4 rounded-xl ${isDark ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
            <p className={`text-xs font-semibold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>Phase 2 Success Criteria:</p>
            <ul className={`text-xs mt-2 space-y-1 list-disc ml-4 ${isDark ? 'text-amber-300/70' : 'text-amber-600'}`}>
              <li>≥35,000 registered users (minimum), 50K target</li>
              <li>≥12,000 MAU</li>
              <li>D30 retention ≥12%</li>
              <li>≥5,000 deep-link taps/month (with service-level attribution)</li>
              <li>≥200 crowdsourced fare reports</li>
              <li>App store listing live (Play Store minimum)</li>
              <li>≥1 corporate partner actively onboarded</li>
              <li>Formal Bolt outreach initiated</li>
            </ul>
          </div>
        </Section>

        {/* ─── PHASE 3 ─── */}
        <Section title="Phase 3: Scale & API Partnership (Months 5–6)" isDark={isDark}>
          <div className={`p-4 rounded-xl mb-4 ${isDark ? 'bg-purple-950/30 border border-purple-900' : 'bg-purple-50 border border-purple-200'}`}>
            <p className={`text-sm font-bold ${isDark ? 'text-purple-300' : 'text-purple-800'}`}>Goal: 150,000 users • K-factor &gt; 1.5 • API partnership secured</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-purple-400/70' : 'text-purple-600'}`}>
              Focus: Viral scale, prove ROI to Bolt with hard data, close the API deal.
            </p>
          </div>

          <Milestone isDark={isDark}
            week="Month 5"
            title="Viral acceleration + Bolt pitch"
            metric="90,000 registered users"
            actions={[
              'If K-factor < 1.5: inject ₦200K into paid social (Instagram + Twitter ads targeting Lagos 18–35, ride-hailing interest)',
              'Launch city-specific waitlists for Port Harcourt, Ibadan, Kano — create FOMO and capture demand',
              'Formal pitch to Bolt: Present data deck (MAU, deep-link taps to Bolt, savings data, route intelligence)',
              'Simultaneously pitch inDriver and Rida (smaller services say yes faster → creates competitive pressure on Bolt)',
              'Scale campus program to 20 universities across Lagos, Abuja, Ibadan, Port Harcourt',
              'Launch weekly Twitter Spaces: "Ride-hailing prices in Nigeria — what\'s fair?" Invite industry voices',
              'Integrate OSRM for road-distance routing (biggest accuracy improvement, helps API pitch credibility)',
            ]}
            risk="Bolt may take 4-8 weeks to respond to partnership requests. Start the conversation early and follow up every 2 weeks."
          />

          <Milestone isDark={isDark}
            week="Month 6"
            title="150K + partnership closure"
            metric="150,000 registered users • 45,000 MAU • K > 1.5"
            actions={[
              'If Bolt responds positively: begin API technical integration (they typically provide a sandbox first)',
              'If Bolt is slow: go live with inDriver or Rida API first — announce "real-time prices from [service]" — this creates urgency for Bolt',
              'Hit 4.5+ star rating on Play Store (prompt reviews at optimal moments: after a user finds savings > ₦1,000)',
              'Compile 6-month "State of Ride-Hailing Prices in Nigeria" report — pitch to TechCabal and Techpoint for publication',
              'This report positions RideChecka as the authoritative voice on ride pricing. Media coverage = free user acquisition',
              'Begin revenue model exploration: (1) affiliate commissions from ride services, (2) premium features subscription, (3) corporate dashboard subscription, (4) anonymized data insights for ride services',
              'If 150K target is not hit: recalibrate to realistic number. 80K users with strong engagement metrics is still a compelling API pitch.',
            ]}
            risk="150K in 6 months requires near-perfect execution. Realistic range: 80K–160K. The pitch to Bolt works at 50K+ if engagement metrics are strong."
          />
        </Section>

        {/* ─── CONTINGENCY ─── */}
        <Section title="Contingency Plans" isDark={isDark}>
          <div className="space-y-3">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>If growth is slower than projected (50% of target)</p>
              <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Extend each phase by 1 month. Focus on retention over acquisition. A slow-growing product with 30% D30 retention is better than a fast-growing product with 5% retention. Reduce ambassador spend. Double down on zero-cost channels: SEO, Twitter engagement, WhatsApp.
              </p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>If Bolt rejects API partnership</p>
              <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Plan B: Improve estimation model with OSRM + crowdsource data (achievable 85–90% accuracy). Partner with smaller services first (inDriver, Rida, Treepz). Build enough market presence that Bolt comes to us. Also explore Bolt's public deep-link system more aggressively — even without their pricing API, we can deep-link users into Bolt with pickup/destination pre-filled.
              </p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>If a competitor emerges</p>
              <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                First-mover advantage + crowdsourced data moat. A competitor starting 6 months later has zero fare reports, zero route data, zero user habits built. Our data asset grows with every user and is extremely hard to replicate. Speed of execution is the defense. Also: consider acquiring/partnering with the competitor if they're small.
              </p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>If funding is needed before profitability</p>
              <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                With 50K+ users and strong engagement: apply to Y Combinator (they love Nigerian startups), Techstars, or local accelerators (CcHUB, Ventures Platform). Pre-seed raise of $100K–250K covers 12–18 months of operations including salaries, marketing, and engineering. The data and user base you've built IS the primary asset for fundraising.
              </p>
            </div>
          </div>
        </Section>

        {/* ─── KEY METRICS PER PHASE ─── */}
        <Section title="Metrics Tracking Per Phase" isDark={isDark}>
          <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <table className="w-full text-left">
              <thead>
                <tr className={`text-[10px] uppercase tracking-wide font-semibold ${isDark ? 'text-gray-400 bg-gray-800/60' : 'text-gray-500 bg-gray-100'}`}>
                  <th className="px-3 py-2">Metric</th>
                  <th className="px-3 py-2">Phase 1</th>
                  <th className="px-3 py-2">Phase 2</th>
                  <th className="px-3 py-2">Phase 3</th>
                </tr>
              </thead>
              <tbody className="text-[11px]">
                {[
                  ['Registered users', '10,000', '50,000', '150,000'],
                  ['MAU', '4,000', '17,500', '45,000'],
                  ['DAU', '600', '2,500', '8,000'],
                  ['MAR (active rate)', '40%', '35%', '30%'],
                  ['D7 retention', '20%', '22%', '25%'],
                  ['D30 retention', '10%', '12%', '15%'],
                  ['Deep-link taps/month', '1,000', '5,000', '18,000'],
                  ['Fare reports/month', '—', '200', '1,500'],
                  ['K-factor (viral)', '0.5', '1.0', '1.5'],
                  ['Cities active', '1–2', '3–4', '5–7'],
                  ['Campus ambassadors', '5', '10', '20'],
                  ['SEO pages', '10', '30', '60'],
                  ['App store rating', '—', '4.0+', '4.5+'],
                  ['Monthly budget', '₦100K', '₦200K', '₦350K'],
                ].map(([metric, p1, p2, p3], i) => (
                  <tr key={i} className={isDark ? 'text-gray-300 border-gray-800' : 'text-gray-700 border-gray-100'}>
                    <td className={`px-3 py-2 border-b font-medium ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>{metric}</td>
                    <td className={`px-3 py-2 border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>{p1}</td>
                    <td className={`px-3 py-2 border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>{p2}</td>
                    <td className={`px-3 py-2 border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>{p3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ─── THE BOLD TRUTH ─── */}
        <Section title="The Honest Bottom Line" isDark={isDark}>
          <div className={`p-5 rounded-xl text-sm leading-relaxed ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'}`}>
            <p>150,000 users in 6 months is the <strong className={isDark ? 'text-gray-200' : 'text-gray-800'}>stretch goal</strong>. The realistic optimistic case is 80,000–120,000. The conservative case is 40,000–60,000.</p>
            <p className="mt-3">But here's what matters: <strong className={isDark ? 'text-gray-200' : 'text-gray-800'}>you don't need 150K users to get Bolt's API.</strong> You need:</p>
            <ul className="mt-2 list-disc ml-4 space-y-1 text-xs">
              <li>A provable, growing user base (even 20K MAU is meaningful)</li>
              <li>Clear attribution data showing booking intents flowing to Bolt</li>
              <li>A product that users actually return to (D30 retention &gt; 10%)</li>
              <li>A professional pitch that speaks Bolt's language (incremental rides, CAC reduction, market intelligence)</li>
            </ul>
            <p className="mt-3">Google Flights didn't need 10 million users to get airline APIs. They needed to prove that showing flight prices INCREASED bookings for airlines. Same principle. Prove you drive incremental value, and the API doors open.</p>
            <p className="mt-3"><strong className={isDark ? 'text-gray-200' : 'text-gray-800'}>Start small. Measure everything. Let the data speak.</strong></p>
          </div>
        </Section>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className={`text-[10px] ${isDark ? 'text-gray-700' : 'text-gray-400'}`}>
            Growth Plan v1.0 — February 2026 — Confidential
          </p>
        </div>
      </div>
    </div>
  );
}
