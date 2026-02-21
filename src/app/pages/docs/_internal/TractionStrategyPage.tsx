// Pre-API Traction & User Acquisition Strategy — Confidential Internal Document
// Multi-phase plan for building user base before API partnerships
import { useNavigate } from 'react-router';
import { ArrowLeft, ShieldAlert, Users, Megaphone, Gift, Building2, GraduationCap, Gamepad2, Timer, Share2, MessageCircle, Target } from 'lucide-react';
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

function ActionItem({ title, detail, timeline, cost, impact, isDark }: { title: string; detail: string; timeline: string; cost: string; impact: string; isDark: boolean }) {
  return (
    <div className={`p-4 rounded-xl mb-3 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{title}</p>
      <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{detail}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${isDark ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>{timeline}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${isDark ? 'bg-green-900/40 text-green-400' : 'bg-green-50 text-green-600'}`}>{cost}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${isDark ? 'bg-purple-900/40 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>{impact}</span>
      </div>
    </div>
  );
}

export function TractionStrategyPage() {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`min-h-full pb-10 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-gray-900 text-white px-5 pt-14 pb-8">
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate('/_rc-admin/docs')} className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-emerald-300">Back to Documents</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">Confidential</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">User Acquisition & Traction Strategy</h1>
          <p className="text-emerald-200/70 text-sm mt-1">Pre-API partnership playbook — building leverage through user demand</p>
        </motion.div>
      </div>

      <div className="px-5 max-w-3xl">
        {/* ─── EXECUTIVE SUMMARY ─── */}
        <Section title="Executive Summary" isDark={isDark}>
          <div className={`p-5 rounded-xl text-sm leading-relaxed ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'}`}>
            <p>The core challenge: Bolt will grant API access when we prove we drive value (users, bookings, data). But we need users before we have APIs. This is the classic chicken-and-egg.</p>
            <p className="mt-3"><strong className={isDark ? 'text-gray-200' : 'text-gray-800'}>The solution:</strong> Build a 10,000+ monthly active user base using estimation-grade pricing (our current model is good enough), viral loops, strategic local partnerships, and aggressive content marketing. When we walk into Bolt with 10K MAU and 3K monthly booking intents flowing to their app, the API conversation shifts from "why should we?" to "how quickly can we integrate?"</p>
            <p className="mt-3"><strong className={isDark ? 'text-gray-200' : 'text-gray-800'}>Timeline:</strong> 6 months to API-ready traction. Budget: ₦300K–600K total.</p>
          </div>
        </Section>

        {/* ─── 1. VIRAL REFERRAL PROGRAM ─── */}
        <Section title="1. Viral Referral Program — Tiered Rewards" isDark={isDark}>
          <div className={`p-5 rounded-xl text-sm ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'}`}>
            <p className={`font-semibold mb-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Concept: "Share RideChecka, Save Together"</p>
            <p>Every user gets a unique referral link. When their referral uses RideChecka to compare and taps "Book Now" on any service, both parties earn reward points. Points unlock real benefits.</p>
          </div>

          <div className="mt-3 space-y-2">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🥉</span>
                <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Tier 1: Starter (1–5 referrals)</p>
              </div>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Reward: "Price Alert" feature — get notified when a specific route drops below a threshold. This costs us nothing to build but creates daily engagement.</p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🥈</span>
                <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Tier 2: Connector (6–15 referrals)</p>
              </div>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Reward: "Route Insights" — see the cheapest time-of-day for their frequent routes. Plus, their profile gets a "Top Saver" badge. Social proof drives more sharing.</p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🥇</span>
                <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Tier 3: Ambassador (16–50 referrals)</p>
              </div>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Reward: Access to "RideChecka Pro" features (when built) — multi-stop comparison, group rides, fare history analytics. Plus, featured on a "Top Ambassadors" leaderboard. Recognition is a powerful motivator in Nigerian social culture.</p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">💎</span>
                <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Tier 4: Legend (50+ referrals)</p>
              </div>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Reward: Cash reward — ₦5,000 airtime or bank transfer. Only top referrers hit this. At 50 referrals, each costing us ₦100 effective, the user has brought in 50 new users for ₦5K total = ₦100/user acquisition cost. Phenomenal CAC for a Nigerian market.</p>
            </div>
          </div>

          <div className={`p-4 rounded-xl mt-3 text-sm ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'}`}>
            <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Viral mechanics:</p>
            <ul className="mt-2 space-y-1.5 text-xs list-disc ml-4">
              <li><strong>WhatsApp share button</strong> (already built) — When a user sees results, "Share on WhatsApp" sends a price card image + referral link. The image does the selling. The link does the tracking.</li>
              <li><strong>Share text template:</strong> "I just saved ₦800 on my ride from Lekki to VI using RideChecka! Bolt was ₦2,400 vs Uber ₦3,200 🤯 Try it: [link]" — Specific numbers are 3× more shareable than generic "save money" claims.</li>
              <li><strong>Post-booking prompt:</strong> 30 seconds after a user taps "Book Now" deep-link, show: "Did you book? Share your savings with a friend!" Timing matters — they're feeling good about saving money.</li>
              <li><strong>Referral tracking:</strong> URL parameter `?ref=USER_ID` + localStorage persistence. Even if the referred user doesn't sign up immediately, we attribute them when they return.</li>
            </ul>
          </div>

          <div className={`p-4 rounded-xl mt-3 ${isDark ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
            <p className={`text-xs font-semibold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>Realistic projection:</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-amber-300/70' : 'text-amber-600'}`}>
              If 20% of users share once, and 15% of share recipients convert, a 1,000-user base generates 30 new users/week organically. Compounding over 4 months → ~3,500 organic users from referral alone. Combined with other channels, this supports the 10K MAU target.
            </p>
          </div>
        </Section>

        {/* ─── 2. STRATEGIC PARTNERSHIPS ─── */}
        <Section title="2. Strategic Local Partnerships" isDark={isDark}>
          <ActionItem isDark={isDark}
            title="Universities — Campus Ambassador Program"
            detail="Recruit 1 ambassador per campus at 10 universities: UNILAG, LASU, Covenant, Babcock, LUTH (medical students), OAU, UI, FUTA, UNIBEN, Nile. Each ambassador creates a campus WhatsApp group (200+ students), posts weekly price comparisons for campus-to-city routes, and runs 'Cheapest Ride Challenge' competitions. Students are the most price-sensitive demographic — they WILL switch apps to save ₦300. Ambassador gets ₦15,000/month + branded merchandise."
            timeline="Week 1–4"
            cost="₦150K/month (10 ambassadors)"
            impact="3,000–5,000 users"
          />
          <ActionItem isDark={isDark}
            title="Corporate Offices — Transport Savings Program"
            detail="Target HR/admin departments at 20 mid-size companies (50–200 employees) in Victoria Island, Lekki, and Wuse 2. Pitch: 'Your employees spend ₦40K–80K/month on ride-hailing. RideChecka helps them save 15–25%. Happy employees, zero cost to you.' Deliverable: Monthly savings report per company. Offer to present at team meetings (5-minute pitch). Start with tech companies (they get it fastest): Andela, Flutterwave, Paystack, Interswitch, Kuda, Piggyvest offices."
            timeline="Week 3–8"
            cost="₦0 (pitch decks + meetings)"
            impact="2,000–4,000 users"
          />
          <ActionItem isDark={isDark}
            title="Local Businesses — QR Code Partnerships"
            detail="Print 5,000 QR code stickers. Place at: (1) Restaurants in Lekki/VI/Ikeja — 'Check your ride price while you wait for your bill,' (2) Salons and barbershops — average wait is 30min, perfect time to discover an app, (3) Coworking spaces — WorkStation, Leadspace, Cranium, (4) Pharmacies — Medplus, Healthplus. Each sticker has a unique location code so we track which placements convert best. Offer businesses: 'We'll feature your location as a pickup point in our app.'"
            timeline="Week 2–6"
            cost="₦30K (printing + distribution)"
            impact="1,000–2,000 users"
          />
          <ActionItem isDark={isDark}
            title="Church & Mosque Partnerships"
            detail="This sounds unconventional but is extremely high-impact in Nigeria. After Sunday services at Redeemed (RCCG parishes), Winners Chapel, Catholic churches in Lagos — thousands of people simultaneously need rides home. Partner with transport/welfare committees: 'Help your members save on transport.' Provide a QR code for the church bulletin or WhatsApp broadcast. Same approach for Friday Jummah at central mosques. One RCCG parish can have 5,000+ attendees."
            timeline="Week 4–8"
            cost="₦10K (printed materials)"
            impact="1,500–3,000 users"
          />
          <ActionItem isDark={isDark}
            title="Fintech App Partnerships"
            detail="Approach OPay, PalmPay, Moniepoint, Kuda with a widget proposal: 'Embed a RideChecka comparison widget in your app's transport section. We drive engagement for your super-app vision, you give us distribution to your millions of users.' Start with a simple landing page integration: 'Compare ride prices → powered by RideChecka.' Even a 0.1% conversion from OPay's 35M+ users = 35,000 users. This is the highest-leverage partnership available."
            timeline="Month 2–4"
            cost="₦0 (partnership deal)"
            impact="5,000–50,000 users"
          />
        </Section>

        {/* ─── 3. CONTENT MARKETING ─── */}
        <Section title="3. Content Marketing — Fare Comparison Case Studies" isDark={isDark}>
          <div className={`p-5 rounded-xl text-sm ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'}`}>
            <p className={`font-semibold mb-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Weekly "Price Report" Series</p>
            <p>Publish every Monday morning. Format: infographic showing the cheapest service for 5 popular routes that week. Post on Twitter/X, Instagram, TikTok, and WhatsApp Status.</p>
            <div className="mt-4 space-y-3">
              <div>
                <p className={`font-semibold text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Sample Week 1: "Lagos Island Price Wars"</p>
                <p className="text-xs mt-1">VI → Lekki Phase 1: Bolt ₦2,400 | Uber ₦2,800 | inDriver ₦1,900–2,500<br />
                Ikeja → Victoria Island: Bolt ₦4,100 | Uber ₦4,500 | inDriver ₦3,200–4,000<br />
                Surulere → Yaba: Bolt ₦1,800 | Uber ₦2,100 | Gokada ₦800 (bike)<br />
                Ajah → Ikoyi: Bolt ₦5,200 | Uber ₦5,800 | inDriver ₦4,500–5,500<br />
                Airport → VI: Bolt ₦6,500 | Uber ₦7,200 | inDriver ₦5,000–6,500</p>
              </div>
              <div>
                <p className={`font-semibold text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Sample Week 3: "Peak Hour Premium — How Much More Do You Pay at 6PM?"</p>
                <p className="text-xs mt-1">Show same 5 routes at 10AM vs 6PM. Visualize the surge difference. Conclusion: "Check RideChecka at 5:45PM before booking blindly."</p>
              </div>
              <div>
                <p className={`font-semibold text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Sample Month 2: "January vs February — Did Prices Drop After Festive Season?"</p>
                <p className="text-xs mt-1">Monthly trend analysis. Position RideChecka as the source of truth for transportation pricing in Nigeria.</p>
              </div>
            </div>
          </div>

          <ActionItem isDark={isDark}
            title="'How I Saved ₦X' User Story Campaign"
            detail="Collect real user stories (with permission). Example: 'Chioma, UNILAG student, saves ₦4,800/week by checking RideChecka before every ride.' Feature on Instagram Reels and TikTok. Real faces + real savings = 5× more engagement than brand content. Incentive: Users who submit stories get featured + ₦2,000 airtime. Budget: ₦20K/month for 10 stories."
            timeline="Month 2 onwards"
            cost="₦20K/month"
            impact="Brand authority + organic shares"
          />

          <ActionItem isDark={isDark}
            title="SEO Content — 'How Much Is Uber/Bolt From X to Y?'"
            detail="Create 50 landing pages targeting 'how much is Uber from Lekki to Victoria Island,' 'Bolt price from Ikeja to Airport,' etc. These exact queries get 1,000–5,000 monthly searches on Google Nigeria. Each page shows our comparison + CTA to use RideChecka. This is free, compounding organic traffic. Produce 10 pages/week using our own fare data."
            timeline="Week 2 onwards (compound)"
            cost="₦0 (content creation time)"
            impact="2,000–10,000 monthly organic visitors"
          />
        </Section>

        {/* ─── 4. SOCIAL MEDIA STRATEGY ─── */}
        <Section title="4. Social Media Engagement Strategy" isDark={isDark}>
          <div className={`p-5 rounded-xl text-sm space-y-4 ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'}`}>
            <div>
              <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Twitter/X — The Nigerian Tech Megaphone</p>
              <p className="text-xs mt-1">Nigerian tech Twitter is the most influential tech community in Africa. Strategy:</p>
              <ul className="list-disc ml-4 mt-2 text-xs space-y-1">
                <li>Post daily "Price Check" — one route, all services, with comparison graphic</li>
                <li>Engage with ride-hailing complaints (search "Bolt expensive," "Uber surge") — reply with: "Here's what other services charge for that route 👀 [screenshot]"</li>
                <li>Tag @TechCabal, @Techpoint_Africa, @BenjaminDada for coverage. They cover Nigerian startups actively</li>
                <li>Run weekly "Worst Surge of the Week" post — users LOVE sharing their outrageous surge screenshots. We become the community hub for ride pricing grievances</li>
                <li>Thread format works best: "I compared all 16 ride services in Lagos for 5 popular routes. Here's what I found 🧵" — this format gets 10–50K impressions organically</li>
              </ul>
            </div>
            <div>
              <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Instagram — Visual Savings Stories</p>
              <p className="text-xs mt-1">Reels showing the RideChecka UI in action: finger taps pickup, taps destination, prices animate in, reaction face when the cheapest is 40% less. Music: trending Afrobeats snippet. Target: 15–30 age group, female-skewing (women are the most active ride-hailing users in Lagos). Post 4 Reels/week.</p>
            </div>
            <div>
              <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>TikTok — "Did You Know?" Series</p>
              <p className="text-xs mt-1">"Did you know Bolt is 30% cheaper than Uber for VI to Lekki?" — 15-second clips with surprising fare facts. TikTok's algorithm favors new creators who post consistently. 5 videos/week for 4 weeks = typical breakout window.</p>
            </div>
            <div>
              <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>WhatsApp — The Distribution Engine</p>
              <p className="text-xs mt-1">Create "RideChecka Lagos," "RideChecka Abuja" broadcast lists. Daily price update at 7:30AM (commute time). Weekly "best deals" summary. Users can reply with their route and we respond with a comparison. This creates a personal, trusted relationship. WhatsApp is where Nigerians live — not email, not push notifications. WhatsApp.</p>
            </div>
          </div>
        </Section>

        {/* ─── 5. GAMIFICATION ─── */}
        <Section title="5. Gamification Elements" isDark={isDark}>
          <div className="space-y-3">
            <ActionItem isDark={isDark}
              title="Daily Savings Streak"
              detail="Track how many consecutive days a user checks prices. 7-day streak = 'Smart Commuter' badge. 30-day streak = 'Savings Champion.' Display streaks on profile. This creates a habit loop (cue: morning commute → routine: check RideChecka → reward: streak continues). Duolingo built a $7B company on this mechanic."
              timeline="Month 2"
              cost="₦0 (feature build)"
              impact="40% increase in DAU/MAU ratio"
            />
            <ActionItem isDark={isDark}
              title="Total Savings Counter"
              detail="Show each user their cumulative estimated savings: 'You've saved ₦23,400 since joining RideChecka.' This is calculated as: (highest price shown) minus (price of service they tapped to book), summed across all their sessions. Even if it's approximate, it's motivating. Users will screenshot and share their savings counter. Free viral content."
              timeline="Month 1–2"
              cost="₦0 (feature build)"
              impact="Shareability + retention"
            />
            <ActionItem isDark={isDark}
              title="Weekly Leaderboard"
              detail="'Top Savers This Week' — users who saved the most (by aggregate comparison-to-booking delta). Top 3 get featured in our Instagram story + ₦500 airtime. Costs ₦6K/month but creates competitive behavior. People will use the app more just to climb the leaderboard."
              timeline="Month 2–3"
              cost="₦6K/month"
              impact="15% increase in weekly sessions"
            />
            <ActionItem isDark={isDark}
              title="Route Explorer Badges"
              detail="'Island Explorer' — compared rides for 10+ different routes on Lagos Island. 'Abuja Navigator' — 10+ routes in Abuja. 'Cross-City Traveler' — compared routes across 3+ cities. Collectors will explore the app just to earn badges. Display on profile with a share button."
              timeline="Month 3"
              cost="₦0 (feature build)"
              impact="Broader route diversity + engagement"
            />
            <ActionItem isDark={isDark}
              title="'Fare Predictor' Game"
              detail="Show a route. Ask: 'Guess the Bolt fare for this route.' User guesses. Reveal actual estimate. Closest guess wins points. This is entertainment + education — users learn price patterns, which makes them more engaged with the comparison tool. Can be a daily mini-game (30 seconds)."
              timeline="Month 3–4"
              cost="₦0 (feature build)"
              impact="Daily engagement hook"
            />
          </div>
        </Section>

        {/* ─── 6. WAITLIST SYSTEM ─── */}
        <Section title="6. Waitlist & Exclusivity System" isDark={isDark}>
          <div className={`p-5 rounded-xl text-sm ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'}`}>
            <p className={`font-semibold mb-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Strategy: "RideChecka Pro" Waitlist</p>
            <p>The free app stays fully functional (current feature set). But we announce "RideChecka Pro" — coming with real-time API prices, multi-stop comparison, fare alerts, and route optimization. Users can join the waitlist. Waitlist position improves with referrals.</p>
          </div>

          <div className={`p-4 rounded-xl mt-3 text-sm ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'}`}>
            <p className={`font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Mechanics:</p>
            <ul className="list-disc ml-4 space-y-2 text-xs">
              <li><strong>Position display:</strong> "You're #847 on the waitlist. Refer 3 friends to jump 200 spots." This creates viral urgency. Robinhood used this exact mechanic to get 1M signups pre-launch.</li>
              <li><strong>Milestone emails/notifications:</strong> "You moved up 50 spots this week!" — re-engagement touchpoint without being spammy.</li>
              <li><strong>Early access unlock:</strong> Top 500 on the waitlist get "Pro Beta Access" when we land our first API. These become our most vocal advocates because they feel like insiders.</li>
              <li><strong>City-specific waitlists:</strong> "RideChecka Pro launches in Lagos first. Be first in line for Abuja." This lets us sequence city launches and create FOMO in non-launch cities.</li>
              <li><strong>Social proof counter:</strong> "12,847 people are waiting for RideChecka Pro" — shown on the landing page. This number itself is a pitch deck metric for Bolt: "Look at the demand we've created."</li>
            </ul>
          </div>

          <div className={`p-4 rounded-xl mt-3 ${isDark ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
            <p className={`text-xs font-semibold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>Key insight:</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-amber-300/70' : 'text-amber-600'}`}>
              The waitlist doesn't require us to build Pro features yet. It's a demand-capturing mechanism. Even if Pro takes 12 months to fully ship, the waitlist starts working from Day 1 as a referral engine and a proof-of-demand signal for investors/partners.
            </p>
          </div>
        </Section>

        {/* ─── BUDGET SUMMARY ─── */}
        <Section title="Budget Summary — 6-Month Total" isDark={isDark}>
          <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <table className="w-full text-left">
              <thead>
                <tr className={`text-[11px] uppercase tracking-wide font-semibold ${isDark ? 'text-gray-400 bg-gray-800/60' : 'text-gray-500 bg-gray-100'}`}>
                  <th className="px-3 py-2.5">Item</th>
                  <th className="px-3 py-2.5">Monthly</th>
                  <th className="px-3 py-2.5">6-Month</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  ['Campus ambassadors (10)', '₦150K', '₦900K'],
                  ['QR stickers + printed materials', '₦10K', '₦60K'],
                  ['User story incentives', '₦20K', '₦120K'],
                  ['Leaderboard rewards', '₦6K', '₦36K'],
                  ['Referral cash rewards (Tier 4)', '₦10K', '₦60K'],
                  ['Misc (transport, meetings)', '₦15K', '₦90K'],
                ].map(([item, monthly, total], i) => (
                  <tr key={i} className={isDark ? 'text-gray-300 border-gray-800' : 'text-gray-700 border-gray-100'}>
                    <td className={`px-3 py-2.5 border-b text-xs ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>{item}</td>
                    <td className={`px-3 py-2.5 border-b text-xs ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>{monthly}</td>
                    <td className={`px-3 py-2.5 border-b text-xs ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>{total}</td>
                  </tr>
                ))}
                <tr className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <td className="px-3 py-2.5 text-xs">TOTAL</td>
                  <td className="px-3 py-2.5 text-xs">₦211K</td>
                  <td className="px-3 py-2.5 text-xs">₦1.27M</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`text-xs mt-3 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            Note: Campus ambassadors are the largest cost. Can start with 5 ambassadors (₦75K/month) in Lagos only, then expand. Without ambassadors, budget drops to ₦370K for 6 months. Fintech partnerships and SEO content are zero-cost and highest-leverage.
          </p>
        </Section>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className={`text-[10px] ${isDark ? 'text-gray-700' : 'text-gray-400'}`}>
            Traction Strategy v1.0 — February 2026 — Confidential
          </p>
        </div>
      </div>
    </div>
  );
}
