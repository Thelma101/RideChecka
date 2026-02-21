// Go-To-Market Strategy Document — Ridechecka Marketing Plan
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

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="text-gray-800 dark:text-gray-200 mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>{title}</h3>
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
          <span className="text-orange-500 mt-1">•</span>
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
              <th key={i} className="text-left p-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700" style={{ fontWeight: 600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
              {row.map((cell, j) => (
                <td key={j} className="p-2 text-gray-600 dark:text-gray-400">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MarketingPage() {
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
            <h1 className="text-gray-900 dark:text-white" style={{ fontSize: '16px', fontWeight: 600 }}>Go-To-Market Strategy</h1>
            <p className="text-[11px] text-gray-400">Marketing & Growth Plan v1.0</p>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 py-6 max-w-2xl mx-auto">
        <Section title="1. Executive Summary">
          <P>
            Ridechecka's go-to-market strategy is a city-by-city, community-driven rollout starting in Lagos — Nigeria's largest ride-hailing market with 8M+ daily commuters. We leverage the viral nature of savings discovery ("I saved ?500 today using Ridechecka!") combined with hyper-local marketing, university ambassador networks, and strategic influencer partnerships to achieve organic, cost-effective user acquisition.
          </P>
          <P>
            The PWA distribution model eliminates app store friction, allowing instant onboarding via shareable links — critical for the WhatsApp-centric Nigerian digital ecosystem where link sharing drives the majority of app discovery.
          </P>
        </Section>

        <Section title="2. Target Audience Segmentation">
          <Table
            headers={['Segment', 'Size', 'Behavior', 'Acquisition Channel']}
            rows={[
              ['Young Professionals (22-35)', '~5M in Lagos', 'Daily ride-hailing, price-conscious, tech-savvy', 'Instagram, Twitter, LinkedIn'],
              ['University Students (18-25)', '~2M across Nigeria', 'Extremely budget-sensitive, bike/keke preference', 'Campus ambassadors, WhatsApp groups'],
              ['Business Travelers (30-50)', '~1M frequent riders', 'Airport transfers, expense tracking, comfort-focused', 'LinkedIn, corporate partnerships'],
              ['Gig Economy Workers', '~500K delivery riders', 'Multiple daily trips, deep price sensitivity', 'Driver community groups, Telegram'],
              ['Parents & Families', '~3M in metros', 'School runs, family trips, safety-conscious', 'Facebook, Nairaland, parenting forums'],
            ]}
          />
        </Section>

        <Section title="3. Positioning & Messaging">
          <SubSection title="Brand Positioning">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 mb-4 border border-green-100 dark:border-green-700/30">
              <P>"Ridechecka is the free ride comparison app that helps Nigerian commuters find the cheapest ride in seconds — across every ride-hailing service."</P>
            </div>
          </SubSection>

          <SubSection title="Key Messages">
            <Table
              headers={['Audience', 'Primary Message', 'CTA']}
              rows={[
                ['Students', '"Stop overpaying for rides. Check every price in 1 tap."', 'Try Ridechecka Free'],
                ['Professionals', '"Your time is money. Compare 50+ ride services instantly."', 'Start Saving Now'],
                ['Business users', '"Track every ride expense. Compare prices. Stay on budget."', 'Get Ridechecka'],
                ['General', '"The smartest way to ride in Nigeria."', 'Compare Prices Free'],
              ]}
            />
          </SubSection>

          <SubSection title="Tagline Options">
            <UL items={[
              '"Compare. Save. Ride Smart." (Primary — used in splash screen)',
              '"Never overpay for a ride again."',
              '"Your ride, your price, your choice."',
              '"50+ services. 1 tap. Best price."',
              '"Ride smart, spend less."',
            ]} />
          </SubSection>
        </Section>

        <Section title="4. Launch Strategy (3 Phases)">
          <SubSection title="Phase 1: Lagos Soft Launch (Month 1-3)">
            <P>Goal: 10,000 MAU, validate product-market fit</P>
            <Table
              headers={['Channel', 'Tactic', 'Budget', 'Expected Impact']}
              rows={[
                ['Campus Ambassadors', '20 ambassadors across UNILAG, LASU, Covenant, Babcock', '?500K/mo', '3,000 student users'],
                ['WhatsApp Viral', 'Shareable comparison screenshots with "Saved ?X" overlays', '?0 (organic)', '2,000 via sharing'],
                ['Twitter/X Campaign', '"Lagos Ride Price" daily posts, route-specific comparisons', '?200K/mo', '2,000 engaged followers'],
                ['Instagram Reels', 'Short-form "which is cheapest?" comparisons at popular routes', '?300K/mo', '1,500 users'],
                ['Tech Blog Seeding', 'Articles on TechPoint, TechCabal, Nairametrics', '?150K/mo', '1,500 tech-early adopters'],
                ['Referral Bonus', 'Save ?200 for every friend who compares a ride', '?200K/mo', 'viral coefficient 1.2x'],
              ]}
            />
          </SubSection>

          <SubSection title="Phase 2: Lagos Full Launch + Abuja (Month 4-6)">
            <P>Goal: 50,000 MAU, establish brand recognition</P>
            <Table
              headers={['Channel', 'Tactic', 'Budget', 'Expected Impact']}
              rows={[
                ['Influencer Marketing', '5 Lagos lifestyle/tech influencers (50K-200K followers)', '?1.5M/mo', '15,000 new users'],
                ['Facebook/Meta Ads', 'Geo-targeted Lagos + Abuja, lookalike audiences', '?800K/mo', '10,000 installs'],
                ['Google Ads', 'Search ads for "cheapest ride Lagos", "Uber vs Bolt price"', '?500K/mo', '5,000 intent-driven users'],
                ['Radio Sponsorship', 'Cool FM Lagos morning drive-time spot (30s)', '?400K/mo', 'Brand awareness, 8,000 reach'],
                ['Corporate Partnerships', 'Offer Ridechecka to company transport allowance programs', '?200K/mo', '3,000 business users'],
                ['Abuja Expansion', 'Replicate campus + WhatsApp strategy in Abuja', '?600K/mo', '5,000 Abuja users'],
              ]}
            />
          </SubSection>

          <SubSection title="Phase 3: National Expansion (Month 7-12)">
            <P>Goal: 250,000 MAU, revenue generation begins</P>
            <Table
              headers={['Channel', 'Tactic', 'Budget', 'Expected Impact']}
              rows={[
                ['TV Advertising', 'NTA, Channels TV prime-time spots during news', '?3M/mo', 'Mass awareness'],
                ['Billboard / OOH', 'Digital billboards at Lekki toll gate, Ikeja city mall', '?1M/mo', 'Brand presence'],
                ['Port Harcourt + Ibadan', 'City-specific launch campaigns', '?800K/mo', '30,000 new users'],
                ['Premium Launch', 'Premium tier marketing: "Unlock Pro Analytics"', '?300K/mo', '5,000 conversions'],
                ['Partnership Deep Links', 'Direct booking integration with Bolt, Uber, inDriver', '?0 (rev share)', 'Monetization begins'],
                ['PR & Media', 'CNN Africa, BBC Pidgin, Guardian Nigeria features', '?200K/mo', 'Credibility + reach'],
              ]}
            />
          </SubSection>
        </Section>

        <Section title="5. Social Media Strategy">
          <Table
            headers={['Platform', 'Content Type', 'Frequency', 'Tone']}
            rows={[
              ['Twitter/X', 'Price comparisons, Lagos commute tips, surge alerts, user testimonials', 'Daily', 'Witty, relatable, Naija Twitter voice'],
              ['Instagram', 'Reels: "Which is cheaper?", stories: polls, carousels: savings tips', '4-5x/week', 'Visual, aspirational, informative'],
              ['TikTok', 'Short-form: route challenges, price reveals, behind-the-scenes', '3-4x/week', 'Fun, trendy, Gen Z friendly'],
              ['Facebook', 'Community group, user stories, ads, events', '3x/week', 'Community-focused, helpful'],
              ['LinkedIn', 'Business features, corporate partnerships, hiring, thought leadership', '2x/week', 'Professional, data-driven'],
              ['WhatsApp', 'Status updates, shareable comparison cards, broadcast lists', 'As needed', 'Personal, direct, trusted'],
            ]}
          />

          <SubSection title="Content Pillars">
            <UL items={[
              'Price Intelligence: Daily price comparisons, surge timing insights, cheapest routes',
              'User Stories: "How I saved ?X this week" testimonials, community spotlights',
              'Product Updates: New features, service additions, tips & tricks',
              'Lagos Life: Relatable commute humor, traffic memes, city-specific content',
              'Financial Wellness: Budgeting tips for commuters, ride expense tracking',
            ]} />
          </SubSection>
        </Section>

        <Section title="6. Viral Mechanics">
          <SubSection title="Built-in Viral Loops">
            <UL items={[
              'Savings Badges: "I saved ?500 today!" shareable cards after each comparison',
              'Route Challenges: "Find the cheapest Lekki-to-VI ride" community challenges',
              'Weekly Leaderboard: "Top savers this week" in analytics dashboard',
              'Referral Program: ?200 credit (toward premium) per referred user who completes a comparison',
              'WhatsApp Share: One-tap share button on results page generates branded comparison card',
              'Screenshot-Optimized UI: Price cards designed to be screenshot-friendly for organic sharing',
            ]} />
          </SubSection>
        </Section>

        <Section title="7. Pricing Strategy">
          <Table
            headers={['Tier', 'Price', 'Features']}
            rows={[
              ['Free (Core)', '?0 forever', 'Unlimited comparisons, 50+ services, favorites, history, 4 languages, dark mode, offline caching'],
              ['Premium', '?1,500/month or ?12,000/year', 'Ad-free, advanced analytics, price drop alerts, surge notifications, route optimization, expense CSV export, priority support'],
              ['Enterprise', 'Custom pricing', 'Company ride programs, bulk accounts, API access, custom reporting, dedicated account manager'],
            ]}
          />
          <P>Freemium model ensures no barrier to adoption. Premium conversion target: 5% of MAU by month 12. Annual plan discount (33% off) encourages long-term commitment.</P>
        </Section>

        <Section title="8. Partnership Strategy">
          <SubSection title="Ride-Hailing Platforms">
            <UL items={[
              'Value proposition: Ridechecka drives traffic and bookings to their platform',
              'Revenue model: 2-5% affiliate commission on redirected bookings',
              'Deep linking: Direct booking launch from price comparison results',
              'Co-marketing: Joint promotions ("Book via Ridechecka, get 10% off on Bolt")',
              'Data exchange: Anonymized demand data in exchange for real-time pricing API access',
            ]} />
          </SubSection>

          <SubSection title="Corporate Partners">
            <UL items={[
              'Banks: Co-branded "Ride Smart" campaigns with GTB, Access, FirstBank',
              'Telecoms: Data bundles for Ridechecka users (MTN, Airtel, Glo)',
              'Insurance: Ride insurance add-ons via comparison results',
              'Fintech: Integration with OPay, PalmPay for seamless payment options',
            ]} />
          </SubSection>
        </Section>

        <Section title="9. Localization Strategy">
          <P>Language is a competitive moat. No ride-hailing app in Nigeria offers Yoruba, Hausa, or Igbo interfaces.</P>
          <Table
            headers={['Language', 'Target Market', 'Priority']}
            rows={[
              ['English', 'All Nigeria, business users, tech-savvy', 'Default'],
              ['Yoruba', 'Lagos, Ibadan, Ogun, Ondo, Ekiti (60M+ speakers)', 'P0 — Implemented'],
              ['Hausa', 'Kano, Kaduna, Abuja, Northern Nigeria (80M+ speakers)', 'P0 — Implemented'],
              ['Igbo', 'Enugu, Anambra, Imo, Abia, PH diaspora (45M+ speakers)', 'P0 — Implemented'],
              ['Pidgin English', 'Pan-Nigerian informal communication', 'P1 — Planned'],
            ]}
          />
          <P>Marketing content will be produced in all 4 languages. Social media accounts per language community. Campus ambassadors selected for language fluency.</P>
        </Section>

        <Section title="10. Metrics & Analytics">
          <SubSection title="North Star Metric">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 mb-4 border border-green-100 dark:border-green-700/30">
              <p className="text-green-700 dark:text-green-100 text-sm" style={{ fontWeight: 700 }}>
                Weekly Active Comparisons (WAC)
              </p>
              <P>The number of unique price comparisons completed per week. This captures both user engagement and core product value delivery.</P>
            </div>
          </SubSection>

          <SubSection title="Tracking Dashboard">
            <Table
              headers={['Category', 'Metrics']}
              rows={[
                ['Acquisition', 'New users/day, install rate, source attribution, CAC by channel'],
                ['Activation', 'First comparison rate, onboarding completion, PWA install rate'],
                ['Engagement', 'WAC, session duration, pages/session, feature adoption rates'],
                ['Retention', 'D1/D7/D30 retention, churn rate, reactivation rate'],
                ['Revenue', 'ARPU, premium conversion, affiliate commission, LTV'],
                ['Virality', 'Share rate, referral conversion, viral coefficient (k-factor)'],
              ]}
            />
          </SubSection>
        </Section>

        <Section title="11. Budget Summary">
          <Table
            headers={['Category', 'Months 1-3', 'Months 4-6', 'Months 7-12', 'Year 1 Total']}
            rows={[
              ['Digital Ads', '?500K', '?1.3M', '?4M', '?5.8M'],
              ['Influencer Marketing', '?0', '?1.5M', '?4.5M', '?6M'],
              ['Campus Ambassadors', '?500K', '?600K', '?1.2M', '?2.3M'],
              ['Content Production', '?300K', '?500K', '?1.5M', '?2.3M'],
              ['Traditional Media', '?0', '?400K', '?4M', '?4.4M'],
              ['PR & Events', '?150K', '?200K', '?500K', '?850K'],
              ['Referral Rewards', '?200K', '?400K', '?1.2M', '?1.8M'],
              ['TOTAL', '?1.65M', '?4.9M', '?16.9M', '?23.45M (~$15K)'],
            ]}
          />
        </Section>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-600">Ridechecka GTM Strategy v1.0 — Confidential</p>
          <p className="text-[10px] text-gray-300 dark:text-gray-700 mt-1">Last updated: February 20, 2026</p>
        </div>
      </motion.div>
    </div>
  );
}
