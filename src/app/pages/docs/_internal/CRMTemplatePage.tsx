// CRM Tracking Template — Confidential Internal Document
import { ArrowLeft, Database, Table2, BarChart3, Zap, GitBranch } from 'lucide-react';
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

/* ── Main Component ─────────────────────────────────────────────── */

export function CRMTemplatePage() {
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
            <h1 className="text-gray-900 dark:text-white" style={{ fontSize: '16px', fontWeight: 600 }}>CRM Template</h1>
            <p className="text-[11px] text-gray-400">Confidential • Partner Tracking</p>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 py-6 max-w-2xl mx-auto">
        {/* Title block */}
        <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center">
              <Database className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900 dark:text-white" style={{ fontSize: '22px', fontWeight: 700 }}>CRM Tracking Template</h1>
              <p className="text-sm text-gray-500">Pipeline • Touchpoints • Meetings • Objections</p>
            </div>
          </div>
          <div className={`rounded-xl p-3 ${isDark ? 'bg-red-900/20 border border-red-900/30' : 'bg-red-50 border border-red-100'}`}>
            <p className={`text-xs ${isDark ? 'text-red-400' : 'text-red-600'}`} style={{ fontWeight: 600 }}>
              🔒 CONFIDENTIAL — Replicate in Google Sheets, Notion, or Airtable. Do not share externally.
            </p>
          </div>
        </div>

        {/* Sheet 1: Contact Pipeline */}
        <Section title="Sheet 1: Contact Pipeline">
          <div className="flex items-center gap-2 mb-3">
            <Table2 className="w-4 h-4 text-blue-500" />
            <P>Core contact database with company info, segmentation, and ownership.</P>
          </div>
          <Table
            headers={['#', 'Column', 'Type', 'Notes']}
            rows={[
              ['1', 'Company', 'Text', 'Company name'],
              ['2', 'Tier', 'Dropdown', '1 — Digital-First | 2 — Emerging | 3 — Interstate/Airlines'],
              ['3', 'Contact Name', 'Text', 'Primary decision-maker'],
              ['4', 'Title', 'Text', 'Job title'],
              ['5', 'Email', 'Email', 'Verified primary email'],
              ['6', 'Email Verified', 'Checkbox', 'NeverBounce / ZeroBounce'],
              ['7', 'Phone', 'Phone', 'Direct line or mobile'],
              ['8', 'LinkedIn URL', 'URL', 'Profile link'],
              ['9', 'City / Region', 'Text', 'Operating cities'],
              ['10', 'Fleet Size', 'Number', 'Estimated active vehicles'],
              ['11', 'Digital Maturity', 'Dropdown', 'High (API) | Med (website/app) | Low (manual)'],
              ['12', 'Status', 'Dropdown', 'See Pipeline Stages'],
              ['13', 'Sequence Owner', 'Text', 'Team member assigned'],
            ]}
          />
        </Section>

        {/* Sheet 2: Touchpoint Log */}
        <Section title="Sheet 2: Touchpoint Log">
          <Table
            headers={['#', 'Column', 'Type', 'Notes']}
            rows={[
              ['1', 'Company', 'Linked', 'From Sheet 1'],
              ['2', 'Date', 'Date', 'Date of touchpoint'],
              ['3', 'Channel', 'Dropdown', 'Email | LinkedIn | Phone | In-Person | WhatsApp | Referral'],
              ['4', 'Sequence Step', 'Dropdown', 'Day 0 | Day 5 | Day 10 | Day 18 | Ad-hoc'],
              ['5', 'Template Used', 'Dropdown', 'A | B | C | D | E | Custom'],
              ['6', 'Subject Line', 'Text', 'Exact subject used'],
              ['7', 'Opened', 'Checkbox', 'Email was opened'],
              ['8', 'Opened Count', 'Number', 'Times opened'],
              ['9', 'Clicked (Calendly)', 'Checkbox', 'Clicked booking link'],
              ['10', 'Replied', 'Checkbox', 'Any reply received'],
              ['11', 'Reply Sentiment', 'Dropdown', 'Positive | Neutral | Negative | Referral | OOO | Bounce'],
              ['12', 'Reply Summary', 'Long text', 'Key points from response'],
              ['13', 'Next Action', 'Text', 'Specific follow-up task'],
              ['14', 'Next Action Date', 'Date', 'Deadline'],
            ]}
          />
        </Section>

        {/* Sheet 3: Meetings */}
        <Section title="Sheet 3: Meetings">
          <Table
            headers={['#', 'Column', 'Type', 'Notes']}
            rows={[
              ['1', 'Company', 'Linked', 'From Sheet 1'],
              ['2', 'Contact', 'Text', 'Who attended'],
              ['3', 'RideChecka Attendees', 'Text', 'Our team'],
              ['4', 'Date / Time', 'Datetime', '—'],
              ['5', 'Duration (min)', 'Number', '—'],
              ['6', 'Meeting Type', 'Dropdown', 'Discovery | Demo | Technical | Terms | Executive'],
              ['7', 'NDA Status', 'Dropdown', 'Not Discussed | Lite Acknowledged | Sent | Signed'],
              ['8', 'Key Takeaways', 'Long text', 'Main discussion points'],
              ['9', 'Objections Raised', 'Multi-select', 'No API | Not interested | Timing | Competitor | Approval | Privacy | Exclusivity'],
              ['10', 'Interest Level', 'Dropdown', 'Hot | Warm | Cool | Cold'],
              ['11', 'Next Steps', 'Text', 'Agreed follow-up actions'],
              ['12', 'Escalate to Exec', 'Checkbox', 'Needs CEO involvement'],
            ]}
          />
        </Section>

        {/* Sheet 4: Objection Tracker */}
        <Section title="Sheet 4: Objection Tracker">
          <Table
            headers={['#', 'Column', 'Type', 'Notes']}
            rows={[
              ['1', 'Objection', 'Text', 'Verbatim or paraphrased'],
              ['2', 'Category', 'Dropdown', 'Technical | Business | Timing | Trust/IP | Competitive | Internal Politics'],
              ['3', 'Frequency', 'Number', 'How many contacts raised this'],
              ['4', 'Current Response', 'Long text', 'Our counter-argument'],
              ['5', 'Effective?', 'Dropdown', 'Yes | Partially | No | Untested'],
              ['6', 'Updated Response', 'Long text', 'Refined counter'],
              ['7', 'Last Updated', 'Date', '—'],
            ]}
          />
        </Section>

        {/* Pipeline Stages */}
        <Section title="Pipeline Stages">
          <div className="flex items-center gap-2 mb-3">
            <GitBranch className="w-4 h-4 text-indigo-500" />
            <P>Status progression for every contact:</P>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { label: 'NEW', color: 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300' },
              { label: 'CONTACTED', color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400' },
              { label: 'FOLLOW-UP', color: 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-400' },
              { label: 'REPLIED', color: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400' },
              { label: 'MEETING BOOKED', color: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400' },
              { label: 'MEETING DONE', color: 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400' },
              { label: 'NDA SIGNED', color: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400' },
              { label: 'MOU DRAFT', color: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400' },
              { label: 'MOU SIGNED', color: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-400' },
              { label: 'INTEGRATION', color: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400' },
              { label: 'LIVE', color: 'bg-green-200 dark:bg-green-800/50 text-green-800 dark:text-green-300' },
              { label: 'NURTURE', color: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400' },
              { label: 'DEAD', color: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400' },
            ].map((stage) => (
              <span key={stage.label} className={`text-[10px] px-2.5 py-1 rounded-full ${stage.color}`} style={{ fontWeight: 600 }}>
                {stage.label}
              </span>
            ))}
          </div>
        </Section>

        {/* Dashboard Metrics */}
        <Section title="Dashboard Metrics">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-4 h-4 text-green-500" />
            <P>Build a summary tab tracking these KPIs:</P>
          </div>
          <Table
            headers={['Metric', 'Formula', 'Target']}
            rows={[
              ['Total Contacts', 'COUNTA(Company)', '—'],
              ['Emails Sent', 'COUNTIF(Status, <>NEW)', '—'],
              ['Open Rate', 'Opens / Sent', '≥ 25%'],
              ['Reply Rate', 'Replies / Sent', '≥ 8%'],
              ['Meetings Booked', 'COUNTIF(Status, MEETING BOOKED)', '≥ 3 per 50'],
              ['NDAs Signed', 'COUNTIF(NDA, Signed)', '—'],
              ['MoUs Signed', 'COUNTIF(MoU, Signed)', '—'],
              ['Avg Days to Reply', 'AVG(Reply Date - Day 0)', '—'],
              ['Top Objection', 'MODE(Objection Category)', '—'],
            ]}
          />
        </Section>

        {/* Automations */}
        <Section title="Automation Suggestions">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-amber-500" />
            <P>Recommended workflow automations:</P>
          </div>
          <Table
            headers={['Trigger', 'Action', 'Tool']}
            rows={[
              ['Day 0 + 5 days + no reply', 'Queue Follow-Up email', 'Instantly / Lemlist'],
              ['Day 10 + no reply', 'Alert: send LinkedIn message', 'Slack notification'],
              ['Day 18 + no reply', 'Send Final Courtesy email', 'Instantly / Lemlist'],
              ['Day 25 + no reply', 'Move to NURTURE status', 'Sheets script / Zapier'],
              ['Reply received', 'Slack alert to owner', 'Email webhook → Slack'],
              ['Meeting booked', 'Create event + send NDA-lite', 'Calendly → Zapier'],
              ['Lead marked HOT', 'Alert CEO channel', 'CRM automation'],
              ['Stale 14+ days', 'Weekly digest of stale leads', 'Google Apps Script'],
            ]}
          />
        </Section>

        {/* CRM Rules */}
        <Section title="CRM Rules">
          <UL items={[
            'Every interaction logged within 4 hours',
            'Objection tags mandatory on negative/neutral replies',
            'Weekly snapshot exported every Friday for review meeting',
            'Stale leads (14+ days, no reply) auto-flagged for review',
            'Hot leads (replied positive / meeting booked) escalated within 24 hours',
            'Duplicate batches per outreach wave (e.g., "Batch 1 — March 2026")',
            'Archive completed batches quarterly',
          ]} />
        </Section>

        {/* Footer */}
        <div className={`text-center py-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <p className="text-[10px] text-gray-400 dark:text-gray-600">
            CONFIDENTIAL — RideChecka Internal Document • CRM Template v1.0
          </p>
        </div>
      </motion.div>
    </div>
  );
}
