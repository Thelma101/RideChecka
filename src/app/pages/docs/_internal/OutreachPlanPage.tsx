// Strategic Partner Outreach Plan — Confidential Internal Document
import { useState } from 'react';
import { ArrowLeft, ChevronDown, Mail, Linkedin, Calendar, Target, Users, Shield, BarChart3, Clock, AlertTriangle, Handshake } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../../contexts/ThemeContext';

/* ── Reusable sub-components ────────────────────────────────────── */

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

function UL({ items }: { items: string[] }) {
  return (
    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5 ml-4 mb-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-green-500 mt-1 flex-shrink-0">•</span>
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
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-gray-100 dark:border-gray-800">
              {row.map((cell, ci) => (
                <td key={ci} className="p-2 text-gray-600 dark:text-gray-400">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmailBlock({ label, subject, body }: { label: string; subject: string; body: string }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-xl border mb-3 overflow-hidden ${open ? 'border-gray-200 dark:border-gray-700' : 'border-gray-100 dark:border-gray-800'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 text-left active:bg-gray-50 dark:active:bg-gray-900 transition-colors"
      >
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-green-900/40 text-green-400' : 'bg-green-100 text-green-600'}`}>
          <Mail className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-gray-900 dark:text-white text-sm" style={{ fontWeight: 600 }}>{label}</p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">Subject: {subject}</p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-800 pt-3">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-[10px] text-gray-400 mb-2 uppercase tracking-wider" style={{ fontWeight: 600 }}>Subject: {subject}</p>
                <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed font-sans">{body}</pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────────── */

export function OutreachPlanPage() {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="min-h-full bg-white dark:bg-black">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 safe-area-top">
        <div className="px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate('/_rc-admin/docs')} className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 active:scale-95 transition-all">
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <div>
            <h1 className="text-gray-900 dark:text-white" style={{ fontSize: '16px', fontWeight: 600 }}>Partner Outreach Plan</h1>
            <p className="text-[11px] text-gray-400">Confidential • v1.0 • Feb 2026</p>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 py-6 max-w-2xl mx-auto">
        {/* Title block */}
        <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center">
              <Handshake className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900 dark:text-white" style={{ fontSize: '22px', fontWeight: 700 }}>Strategic Partner Outreach</h1>
              <p className="text-sm text-gray-500">Email campaign • Contact sequence • IP protection</p>
            </div>
          </div>
          <div className={`rounded-xl p-3 ${isDark ? 'bg-red-900/20 border border-red-900/30' : 'bg-red-50 border border-red-100'}`}>
            <p className={`text-xs ${isDark ? 'text-red-400' : 'text-red-600'}`} style={{ fontWeight: 600 }}>
              🔒 CONFIDENTIAL — Internal Use Only. Do not share externally.
            </p>
          </div>
        </div>

        {/* 1. Executive Summary */}
        <Section title="1. Executive Summary">
          <P>
            RideChecka is Nigeria's first multi-service ride-hailing price comparison platform, aggregating fares from 16+ providers into a single instant search. This plan outlines a structured outreach campaign to onboard third-party transportation companies as integration partners.
          </P>
          <P>
            <strong>Campaign Goal:</strong> Secure ≥3 qualified discovery meetings per 50 contacts within 30 days, establishing the pipeline for Phase 1 partnerships (ride-hailing) and laying groundwork for Phase 2 partnerships (interstate bus operators & domestic airlines).
          </P>
          <div className={`rounded-xl p-4 mb-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <p className="text-xs text-gray-500 mb-2" style={{ fontWeight: 600 }}>VALUE PROPOSITION TO PARTNERS</p>
            <UL items={[
              'Incremental demand — Access to 50,000+ monthly searches from value-conscious commuters',
              'Zero customer-acquisition cost — RideChecka drives users directly to their booking flow',
              'Data intelligence — Anonymised route demand heatmaps and competitive pricing insights',
              'Brand visibility — Premium placement, verified badges, and featured promotions',
            ]} />
          </div>
        </Section>

        {/* 2. Audience Segmentation */}
        <Section title="2. Audience Segmentation">
          <div className={`rounded-xl p-4 mb-4 ${isDark ? 'bg-blue-900/20 border border-blue-900/30' : 'bg-blue-50 border border-blue-100'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-blue-500" />
              <p className="text-sm text-blue-700 dark:text-blue-400" style={{ fontWeight: 600 }}>Tier 1 — Digital-First Ride-Hailing</p>
            </div>
            <Table
              headers={['Criteria', 'Definition', 'Examples']}
              rows={[
                ['Fleet Size', '500+ active vehicles', 'Uber, Bolt, inDriver'],
                ['Digital Maturity', 'Existing API / developer portal', 'Uber API, Bolt Business API'],
                ['Routes', 'Intra-city, major metros', 'Lagos, Abuja, PH, Kano'],
                ['Priority', 'Highest — immediate integration', '—'],
              ]}
            />
            <P>Subject: <em>"[Company], your riders are already comparing you on RideChecka"</em></P>
            <P>Pain Points: Rider churn, low visibility in price-sensitive market, limited demand data.</P>
          </div>

          <div className={`rounded-xl p-4 mb-4 ${isDark ? 'bg-green-900/20 border border-green-900/30' : 'bg-green-50 border border-green-100'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-green-500" />
              <p className="text-sm text-green-700 dark:text-green-400" style={{ fontWeight: 600 }}>Tier 2 — Emerging & Regional</p>
            </div>
            <Table
              headers={['Criteria', 'Definition', 'Examples']}
              rows={[
                ['Fleet Size', '50–500 vehicles', 'Rida, Timber, Treepz, Moove'],
                ['Digital Maturity', 'App exists but limited API', 'Variable'],
                ['Routes', 'City-specific or niche', '—'],
                ['Priority', 'High — growth partners', '—'],
              ]}
            />
            <P>Subject: <em>"How [Company] can reach 50K+ new riders monthly — zero acquisition cost"</em></P>
          </div>

          <div className={`rounded-xl p-4 mb-4 ${isDark ? 'bg-amber-900/20 border border-amber-900/30' : 'bg-amber-50 border border-amber-100'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-amber-500" />
              <p className="text-sm text-amber-700 dark:text-amber-400" style={{ fontWeight: 600 }}>Tier 3 — Interstate & Airlines (Phase 2)</p>
            </div>
            <Table
              headers={['Criteria', 'Definition', 'Examples']}
              rows={[
                ['Fleet Size', '20+ coaches / 5+ aircraft', 'God is Good, Peace Mass, Air Peace, Arik'],
                ['Digital Maturity', 'Website booking; limited API', 'Variable'],
                ['Routes', 'Interstate', 'Lagos–Abuja, Lagos–Enugu, etc.'],
                ['Priority', 'Phase 2 — relationship-building now', '—'],
              ]}
            />
            <P>Subject: <em>"Nigeria's commuters are going multi-modal — let's talk [Company]"</em></P>
            <div className={`rounded-lg p-2 ${isDark ? 'bg-amber-900/30' : 'bg-amber-100'}`}>
              <p className="text-[11px] text-amber-700 dark:text-amber-400">⚠️ Tier 3 contacts get relationship-warming emails only. Full outreach activates in Phase 2.</p>
            </div>
          </div>
        </Section>

        {/* 3. Email Templates */}
        <Section title="3. Email Templates">
          <EmailBlock
            label="Template A — Initial Outreach"
            subject="[PERSONALISED — see Tier subject lines]"
            body={`Hi [First Name],

I'm [Your Name], [Title] at RideChecka — Nigeria's ride-hailing price comparison platform. Over 50,000 monthly searches already compare [Company] alongside other providers.

Here's why that matters to you:

  • Incremental bookings — Users who compare prices convert at 3x the rate of cold leads. Every search sends riders directly into your booking flow.
  • Zero cost — We don't charge per lead or take commissions during our launch partnership window.
  • Demand intelligence — We can share anonymised route-demand heatmaps for [City/Region] so you can optimise fleet positioning.

I'd love to share a brief demo and explore how a data-sharing integration could drive measurable bookings for [Company].

Would you have 15 minutes this week or next for a quick call?

→ Book directly on my calendar: [CALENDLY_LINK]

Best regards,
[Your Name]
[Title] · RideChecka
[Phone] · [Email]

P.S. — We've prepared a mutual-NDA for any technical discussions to protect both parties' proprietary information.`}
          />

          <EmailBlock
            label="Template B — Follow-Up (Day 5)"
            subject="Re: [Original Subject] — quick question"
            body={`Hi [First Name],

Just circling back on my note last week. I know inboxes are relentless.

One data point that might be useful: in [Month], we tracked [X] price-comparison searches on the [City] → [City] corridor. [Company] was included in [Y]% of them.

Happy to share the full route-demand report — takes just 15 minutes.

→ Pick a slot: [CALENDLY_LINK]

Cheers,
[Your Name]`}
          />

          <EmailBlock
            label="Template C — LinkedIn Message (Day 10)"
            subject="(LinkedIn direct message)"
            body={`Hi [First Name] — I lead partnerships at RideChecka, the ride price comparison app growing fast in [City]. I sent a quick note to your [work email / team] about how we're driving incremental bookings to providers like [Company] at zero cost. Would love 15 min to share what we're seeing. Happy to connect here or via [CALENDLY_LINK]. — [Your Name]`}
          />

          <EmailBlock
            label="Template D — Final Courtesy (Day 18)"
            subject="Closing the loop — [Company] + RideChecka"
            body={`Hi [First Name],

I respect your time, so this will be my last note. If the timing isn't right, no worries at all — my door stays open.

For reference, here's what we offer launch partners:
  ✓ Featured placement in the app (badge + priority ranking)
  ✓ Anonymised route-demand data for your operating cities
  ✓ Zero integration fee during the partnership pilot

If anything changes, just reply to this thread or book time here: [CALENDLY_LINK]

Wishing [Company] continued success.

Best,
[Your Name]`}
          />

          <EmailBlock
            label="Template E — Tier 3 Warm-Up (Interstate/Airlines)"
            subject="Nigeria's commuters are going multi-modal — let's talk [Company]"
            body={`Hi [First Name],

I'm [Your Name] from RideChecka. We're building Nigeria's first multi-modal transport comparison platform — starting with ride-hailing (live now with 16 services) and expanding to interstate coaches and domestic flights.

We're not pitching integration today. We're doing research into how companies like [Company] think about digital distribution, and your perspective would be invaluable.

Would you be open to a 15-minute conversation? No commitments — just an exchange of ideas.

→ [CALENDLY_LINK]

Warm regards,
[Your Name]`}
          />
        </Section>

        {/* 4. Contact Sequence */}
        <Section title="4. Tiered Contact Sequence">
          <div className="space-y-3 mb-4">
            {[
              { day: 'Day 0', icon: Mail, action: 'Initial Email (Template A or E)', cta: 'Book 15-min call via Calendly', color: 'bg-blue-500' },
              { day: 'Day 5', icon: Mail, action: 'Follow-Up Email (Template B)', cta: 'Share data report + Calendly link', color: 'bg-green-500' },
              { day: 'Day 10', icon: Linkedin, action: 'LinkedIn Connection + Message (Template C)', cta: 'Connect + Calendly link', color: 'bg-indigo-500' },
              { day: 'Day 18', icon: Mail, action: 'Final Courtesy Email (Template D)', cta: 'Soft close + evergreen Calendly', color: 'bg-amber-500' },
              { day: 'Day 25', icon: Clock, action: 'Mark as "Nurture" in CRM', cta: 'Add to newsletter; re-engage in 60 days', color: 'bg-gray-500' },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${step.color}`}>
                  <step.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white" style={{ fontWeight: 600 }}>{step.day} — {step.action}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">CTA: {step.cta}</p>
                </div>
              </div>
            ))}
          </div>

          <Table
            headers={['Rule', 'Detail']}
            rows={[
              ['Stop on reply', 'Any response pauses the sequence. Log in CRM.'],
              ['Open but no reply', 'If opened 3+ times, personalise follow-up with specific data.'],
              ['Bounce / invalid', 'Research alternate contact within 24 hours.'],
              ['Out-of-office', 'Resume 2 days after their return date.'],
              ['Referral received', 'Start new sequence for referred contact (Day 0).'],
            ]}
          />
        </Section>

        {/* 5. IP Protection */}
        <Section title="5. IP Protection & NDA-Lite Strategy">
          <P>We use a <strong>"Teaser-Only" disclosure model</strong> — share enough to generate interest, withhold proprietary details until mutual NDA is signed.</P>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className={`rounded-xl p-4 ${isDark ? 'bg-green-900/20 border border-green-900/30' : 'bg-green-50 border border-green-100'}`}>
              <p className="text-xs text-green-700 dark:text-green-400 mb-2" style={{ fontWeight: 600 }}>✅ SAFE TO SHARE FREELY</p>
              <UL items={[
                'RideChecka exists and is live with 16 services',
                'Aggregate user growth metrics (monthly searches, cities)',
                'General concept: multi-service price comparison',
                'Mutual benefit framing: incremental bookings, zero-cost distribution',
                'Anonymised route-demand summaries (top 5 corridors)',
              ]} />
            </div>
            <div className={`rounded-xl p-4 ${isDark ? 'bg-red-900/20 border border-red-900/30' : 'bg-red-50 border border-red-100'}`}>
              <p className="text-xs text-red-700 dark:text-red-400 mb-2" style={{ fontWeight: 600 }}>🔒 REQUIRES SIGNED NDA</p>
              <UL items={[
                'Pricing algorithm details and ML models',
                'Proprietary data pipeline architecture',
                'Revenue-share models and financial projections',
                'User-level analytics and segmentation data',
                'API integration specs and technical roadmap',
                'Partner-specific conversion data',
              ]} />
            </div>
          </div>

          <div className={`rounded-xl p-4 mb-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <p className="text-xs text-gray-500 mb-2" style={{ fontWeight: 600 }}>NDA-LITE CLAUSE (Calendar Confirmation)</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed italic">
              "By scheduling this call, both parties agree to treat any proprietary business or technical information shared during the discussion as confidential for a period of two (2) years. This includes, but is not limited to, pricing models, data architectures, user metrics, and partnership terms. A formal mutual NDA will be provided for execution should discussions advance to a technical integration phase."
            </p>
          </div>
        </Section>

        {/* 6. Success Metrics */}
        <Section title="6. Success Metrics">
          <P><strong>30-Day Targets (per batch of 50 contacts):</strong></P>
          <Table
            headers={['Metric', 'Target', 'Measurement']}
            rows={[
              ['Email Open Rate', '≥ 25%', 'Unique opens / delivered'],
              ['Reply Rate', '≥ 8%', 'Unique replies / delivered'],
              ['Qualified Meetings', '≥ 3', 'Discovery calls completed'],
              ['Positive Response Rate', '≥ 12%', 'Replies expressing interest'],
              ['Pipeline Value', '≥ 2 MoU drafts', 'MoUs sent after calls'],
              ['Sequence Completion', '100%', 'All contacts reach Day 25 or respond'],
            ]}
          />

          <P><strong>Weekly Health Indicators:</strong></P>
          <Table
            headers={['Indicator', 'Healthy', 'Action if Below']}
            rows={[
              ['Open rate', '> 30%', 'A/B test subject lines, check deliverability'],
              ['Click rate', '> 3%', 'Revise CTA placement and copy'],
              ['LinkedIn accept', '> 40%', 'Improve profile, add mutual connections'],
              ['Bounce rate', '< 5%', 'Verify emails (NeverBounce, ZeroBounce)'],
            ]}
          />
        </Section>

        {/* 7. Contingency */}
        <Section title="7. Contingency Tactics">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-purple-500" />
                <p className="text-sm text-gray-900 dark:text-white" style={{ fontWeight: 600 }}>Industry Conferences</p>
              </div>
              <Table
                headers={['Event', 'Timing', 'Action']}
                rows={[
                  ['Lagos Tech Summit', 'Annual (Q4)', 'Booth/attendee; pre-schedule meetings'],
                  ['NiTA Transport Conference', 'Bi-annual', 'Tier 3 relationship-building'],
                  ['Techpoint Africa Expo', 'Annual', 'Visibility + mobility networking'],
                  ['Mobility+ Africa', 'Annual', 'Panel + side meetings'],
                ]}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-500" />
                <p className="text-sm text-gray-900 dark:text-white" style={{ fontWeight: 600 }}>Mutual Connections</p>
              </div>
              <UL items={[
                'Map LinkedIn 2nd-degree connections to every Tier 1 & 2 contact',
                'Warm intros — provide forwarding blurb to mutual connections',
                'Engage 2–3 mobility industry advisors who can open doors',
                'Investor intros — ask portfolio network for introductions',
              ]} />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <p className="text-sm text-gray-900 dark:text-white" style={{ fontWeight: 600 }}>Pilot Incentives</p>
              </div>
              <Table
                headers={['Incentive', 'Details']}
                rows={[
                  ['Free featured placement', '3-month premium listing at zero cost for first 5 partners'],
                  ['Exclusive data reports', 'Monthly route-demand intel for their operating cities'],
                  ['Co-marketing', 'Joint press release + social media campaign'],
                  ['Revenue guarantee', 'Min 500 redirects/month during pilot'],
                  ['Technical support', 'Dedicated integration engineer for 30 days'],
                  ['White-label option', 'Embedded comparison widget for partner app/site'],
                ]}
              />
            </div>
          </div>
        </Section>

        {/* 8. Weekly Review */}
        <Section title="8. Weekly Review Cadence">
          <div className={`rounded-xl p-4 mb-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="grid grid-cols-2 gap-3 text-xs mb-3">
              <div><span className="text-gray-400">Frequency:</span> <span className="text-gray-700 dark:text-gray-300" style={{ fontWeight: 600 }}>Every Friday</span></div>
              <div><span className="text-gray-400">Duration:</span> <span className="text-gray-700 dark:text-gray-300" style={{ fontWeight: 600 }}>30 minutes</span></div>
              <div><span className="text-gray-400">Time:</span> <span className="text-gray-700 dark:text-gray-300" style={{ fontWeight: 600 }}>10:00 WAT</span></div>
              <div><span className="text-gray-400">Attendees:</span> <span className="text-gray-700 dark:text-gray-300" style={{ fontWeight: 600 }}>Partnerships + Product + CEO</span></div>
            </div>
          </div>
          <P><strong>Agenda:</strong></P>
          <UL items={[
            'Metrics snapshot (5 min) — opens, replies, meetings, pipeline',
            'Hot leads review (10 min) — assign next actions, escalate to exec',
            'Message optimisation (5 min) — A/B results, objection patterns',
            'Blockers & contingency (5 min) — non-responsive targets, events',
            'Actions & owners (5 min) — recap with deadlines',
          ]} />
        </Section>

        {/* Footer */}
        <div className={`text-center py-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <p className="text-[10px] text-gray-400 dark:text-gray-600">
            CONFIDENTIAL — RideChecka Internal Document • Version 1.0 • February 2026
          </p>
        </div>
      </motion.div>
    </div>
  );
}
