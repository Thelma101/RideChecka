// Risk-Mitigation Checklist — Confidential Internal Document
import { ArrowLeft, ShieldCheck, Scale, Swords, Settings, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
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

function RiskRow({ id, risk, mitigation }: { id: string; risk: string; mitigation: string }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`rounded-lg p-3 mb-2 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex items-start gap-2 mb-1">
        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex-shrink-0" style={{ fontWeight: 600 }}>{id}</span>
        <p className="text-xs text-gray-900 dark:text-white" style={{ fontWeight: 600 }}>{risk}</p>
      </div>
      <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed ml-7">{mitigation}</p>
    </div>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 mb-1.5">
      <CheckCircle2 className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 mt-0.5 flex-shrink-0" />
      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{text}</p>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────────── */

export function RiskChecklistPage() {
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
            <h1 className="text-gray-900 dark:text-white" style={{ fontSize: '16px', fontWeight: 600 }}>Risk Checklist</h1>
            <p className="text-[11px] text-gray-400">Confidential • IP, Compliance & Competitive</p>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 py-6 max-w-2xl mx-auto">
        {/* Title block */}
        <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900 dark:text-white" style={{ fontSize: '22px', fontWeight: 700 }}>Risk-Mitigation Checklist</h1>
              <p className="text-sm text-gray-500">IP protection • Compliance • Competitive differentiation</p>
            </div>
          </div>
          <div className={`rounded-xl p-3 ${isDark ? 'bg-red-900/20 border border-red-900/30' : 'bg-red-50 border border-red-100'}`}>
            <p className={`text-xs ${isDark ? 'text-red-400' : 'text-red-600'}`} style={{ fontWeight: 600 }}>
              🔒 Review before every external communication and at weekly review meetings.
            </p>
          </div>
        </div>

        {/* A. IP Protection */}
        <Section title="A. Intellectual Property Protection">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <P>7 risks related to protecting RideChecka's proprietary methods and data.</P>
          </div>

          <RiskRow id="A1" risk="Partner copies our aggregation model after learning approach" mitigation="Teaser-only disclosure — share concept + mutual benefits only. Withhold architecture, algorithms, and pipeline details until NDA is signed." />
          <RiskRow id="A2" risk="Shared demo materials leak to competitors" mitigation="Watermark all decks with recipient name + date. Use view-only links (no downloads). Track access via DocSend or Pitch." />
          <RiskRow id="A3" risk="Verbal disclosure of proprietary details on calls" mitigation='Prepare a "safe to share / requires NDA" cheat sheet for every call participant. Rehearse before first calls.' />
          <RiskRow id="A4" risk="NDA not signed before deep technical discussion" mitigation="Hard gate: No API specs, revenue models, or user data shared until mutual NDA is fully executed by both parties." />
          <RiskRow id="A5" risk="Employee or contractor leaks outreach strategy" mitigation="All strategic docs marked CONFIDENTIAL. Access limited to core team. Stored in access-controlled folder." />
          <RiskRow id="A6" risk="Email templates / data points forwarded to competitors" mitigation='Include only aggregate, non-sensitive data in emails (e.g., "50K monthly searches"). Specific data only on NDA-protected calls.' />
          <RiskRow id="A7" risk="Partner claims RideChecka idea as their own" mitigation="Document all prior art: Git commit history (timestamped), app store listing date, domain registration, Wayback Machine snapshots." />
        </Section>

        {/* B. Legal & Compliance */}
        <Section title="B. Legal & Compliance">
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-4 h-4 text-purple-500" />
            <P>7 risks related to data protection, trademark use, and contractual matters.</P>
          </div>

          <RiskRow id="B1" risk="NDPR (Nigeria Data Protection Regulation) violation" mitigation="Never share user-level data. All outreach data is anonymised and aggregated (route-level). Include NDPR compliance statement in NDA." />
          <RiskRow id="B2" risk="Anti-spam / email compliance" mitigation="Include physical address + unsubscribe in all emails (CAN-SPAM). Limit to business contacts. Use verified opt-in where possible." />
          <RiskRow id="B3" risk="Unauthorised use of partner trademarks" mitigation={'Use partner names only in factual context ("Compare Uber, Bolt..."). No logos without permission. Add trademark attribution.'} />
          <RiskRow id="B4" risk="Revenue-share terms not legally binding" mitigation="All commercial terms formalised via MoU or contract reviewed by counsel — never rely on email agreements alone." />
          <RiskRow id="B5" risk="Scraping partner data without authorisation" mitigation="Phase 2: Always seek written API/data-access agreement. No unauthorised scraping. Document authorisation chain." />
          <RiskRow id="B6" risk="Terms conflict between partners (exclusivity)" mitigation="Avoid exclusivity clauses. If insisted, limit to 6 months max and route-specific. Never grant platform-wide exclusivity." />
          <RiskRow id="B7" risk="Liability for incorrect fare estimates" mitigation={'Include clear disclaimer: "Prices are estimates. Actual fares may vary." Ensure partners acknowledge estimate nature in MoU.'} />
        </Section>

        {/* C. Competitive Differentiation */}
        <Section title="C. Competitive Differentiation">
          <div className="flex items-center gap-2 mb-3">
            <Swords className="w-4 h-4 text-amber-500" />
            <P>6 risks related to market positioning and competitive threats.</P>
          </div>

          <RiskRow id="C1" risk="Partner builds their own comparison feature" mitigation="Speed advantage — already live with 16 services. Offer data depth they can't replicate quickly. Include non-compete clause in MoU." />
          <RiskRow id="C2" risk="Competitor approaches same partners first" mitigation="First-mover advantage — execute quickly. Offer better terms to early partners. Sign MoUs with 60-day integration priority." />
          <RiskRow id="C3" risk="Partners favour direct acquisition over aggregator" mitigation="Frame RideChecka as incremental (additive channel, not replacement). Show data on users who discover services via comparison." />
          <RiskRow id="C4" risk="Large tech company enters Nigerian ride comparison" mitigation="Deepen partner relationships early. Focus on local expertise, Nigerian language support (Yoruba, Hausa, Igbo), and community trust as moats." />
          <RiskRow id="C5" risk="Partners demand unsustainable revenue share" mitigation="Set walk-away thresholds before negotiations (e.g., max 8% commission). Document BATNA for each partner." />
          <RiskRow id="C6" risk="Outreach fatigue — partners contacted by many startups" mitigation="Differentiate with data-led outreach — lead with specific route metrics for their city, not generic pitch." />
        </Section>

        {/* D. Operational */}
        <Section title="D. Operational">
          <div className="flex items-center gap-2 mb-3">
            <Settings className="w-4 h-4 text-cyan-500" />
            <P>5 risks related to campaign execution and team processes.</P>
          </div>

          <RiskRow id="D1" risk="Email deliverability issues (spam folder)" mitigation="Warm up sending domain 2 weeks before campaign. Use dedicated subdomain (partners@ridechecka.com). Verify SPF/DKIM/DMARC." />
          <RiskRow id="D2" risk="CRM data goes stale" mitigation="Mandatory 4-hour logging SLA. Weekly CRM hygiene check at review meeting. Auto-flag stale records." />
          <RiskRow id="D3" risk="Key contact leaves partner company" mitigation="Track 2 contacts per company minimum (primary + backup). Monitor LinkedIn for job changes. Update CRM within 48 hours." />
          <RiskRow id="D4" risk="Team bandwidth insufficient for meetings" mitigation="Pre-allocate 10 hrs/week for partnership meetings. If pipeline exceeds capacity, prioritise Tier 1 and hire support." />
          <RiskRow id="D5" risk="Legal review delays NDA/MoU process" mitigation="Prepare template NDA and MoU in advance. Have counsel pre-approve standard terms. Only escalate non-standard clauses." />
        </Section>

        {/* Pre-Outreach Checklist */}
        <Section title="Pre-Outreach Checklist">
          <P>Run before each outreach batch:</P>
          <div className={`rounded-xl p-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <ChecklistItem text="Email sending domain warmed up and authenticated (SPF/DKIM/DMARC)" />
            <ChecklistItem text="All contact emails verified (NeverBounce or ZeroBounce)" />
            <ChecklistItem text="CRM sheet set up with this batch's contacts" />
            <ChecklistItem text="Email templates personalised with company/city-specific data" />
            <ChecklistItem text="Calendly booking link tested and working" />
            <ChecklistItem text='"Safe to share" cheat sheet printed/bookmarked for calls' />
            <ChecklistItem text="NDA template reviewed by counsel and ready to send" />
            <ChecklistItem text="Watermarked demo deck prepared (if needed)" />
            <ChecklistItem text="Slack/notification alerts configured for replies and bookings" />
            <ChecklistItem text="Weekly review meeting scheduled (recurring)" />
          </div>
        </Section>

        {/* Pre-Call Checklist */}
        <Section title="Pre-Call Checklist">
          <P>Run before each discovery call:</P>
          <div className={`rounded-xl p-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <ChecklistItem text="Research partner's latest news, fleet expansion, funding" />
            <ChecklistItem text="Identify specific route data relevant to their cities" />
            <ChecklistItem text="Confirm NDA-lite disclaimer in calendar invitation" />
            <ChecklistItem text="Prepare screen-share demo showing their service in RideChecka" />
            <ChecklistItem text='Review "safe to share / requires NDA" boundaries' />
            <ChecklistItem text="Prepare 3 questions to ask them (show genuine interest)" />
            <ChecklistItem text="Test video/audio 5 minutes before call" />
            <ChecklistItem text="Have CRM open to log notes in real-time" />
          </div>
        </Section>

        {/* Footer */}
        <div className={`text-center py-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <p className="text-[10px] text-gray-400 dark:text-gray-600">
            CONFIDENTIAL — RideChecka Internal Document • Risk Checklist v1.0 • February 2026
          </p>
        </div>
      </motion.div>
    </div>
  );
}
