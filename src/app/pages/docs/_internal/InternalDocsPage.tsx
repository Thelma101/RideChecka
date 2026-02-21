// Internal Documentation Hub — Secret route for owner access only
// This page is NOT linked from any public UI. Access via /_rc-admin/docs
import { useNavigate } from 'react-router';
import { Card } from '../../../components/ui/card';
import {
  ArrowLeft, FileText, Presentation, Code2, Megaphone,
  Activity, Map, ChevronRight, ShieldAlert, Handshake, Database, ShieldCheck,
  Car, Users, BarChart3, Layers, Rocket,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../../contexts/ThemeContext';

const internalDocs = [
  {
    id: 'prd',
    title: 'Product Requirements Document',
    subtitle: 'PRD v2.0 — Full product spec',
    icon: FileText,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
    description: 'KPIs, feature matrix, user stories, data models, non-functional requirements.',
  },
  {
    id: 'pitch',
    title: 'Investor Pitch Deck',
    subtitle: 'Seed round — $500K',
    icon: Presentation,
    color: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400',
    description: 'Problem/solution, market opportunity, business model, financials, the ask.',
  },
  {
    id: 'technical',
    title: 'Technical Architecture',
    subtitle: 'System design v2.0',
    icon: Code2,
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400',
    description: 'Tech stack, architecture diagram, routing, state management, services layer.',
  },
  {
    id: 'marketing',
    title: 'Go-To-Market Strategy',
    subtitle: 'Marketing & growth plan',
    icon: Megaphone,
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400',
    description: 'Audience segments, launch phases, social strategy, budgets, partnerships.',
  },
  {
    id: 'metrics',
    title: 'Live Metrics Strategy',
    subtitle: 'Real-time accuracy & reliability',
    icon: Activity,
    color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-400',
    description: 'Data pipeline architecture, validation framework, monitoring, SLOs.',
  },
  {
    id: 'roadmap',
    title: 'Development Roadmap',
    subtitle: '8-week sprint plan',
    icon: Map,
    color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400',
    description: 'Concept to production: infrastructure, features, innovation, integrations.',
  },
  {
    id: 'outreach',
    title: 'Partner Outreach Plan',
    subtitle: 'Strategic email campaign v1.0',
    icon: Handshake,
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
    description: 'Email templates, contact sequence, NDA strategy, audience segmentation, metrics.',
  },
  {
    id: 'crm',
    title: 'CRM Tracking Template',
    subtitle: 'Pipeline & touchpoint tracker',
    icon: Database,
    color: 'bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-900/40 dark:text-fuchsia-400',
    description: '4-sheet CRM structure, pipeline stages, meeting logs, objection tracking.',
  },
  {
    id: 'risk',
    title: 'Risk-Mitigation Checklist',
    subtitle: 'IP, compliance & competitive',
    icon: ShieldCheck,
    color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400',
    description: '22-item checklist: IP protection, legal compliance, competitive differentiation.',
  },
  {
    id: 'fare-analysis',
    title: 'Fare Calculation Analysis',
    subtitle: 'Industry vs. RideChecka model',
    icon: Car,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
    description: 'Bolt/Uber/inDriver fare formulas, surge algorithms, gap analysis, accuracy roadmap.',
  },
  {
    id: 'traction',
    title: 'User Acquisition Strategy',
    subtitle: 'Pre-API traction playbook',
    icon: Users,
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
    description: 'Viral referrals, campus ambassadors, corporate partnerships, gamification, waitlist.',
  },
  {
    id: 'kpi-dashboard',
    title: 'KPI Metrics Dashboard',
    subtitle: 'Bolt API partnership proof',
    icon: BarChart3,
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400',
    description: 'DAU/MAU, retention, deep-link taps, savings metrics, pitch deck format.',
  },
  {
    id: 'data-framework',
    title: 'Data Collection Framework',
    subtitle: 'User behavior analytics',
    icon: Layers,
    color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-400',
    description: 'Event tracking schema, comparison patterns, route intelligence, price sensitivity.',
  },
  {
    id: 'growth-plan',
    title: 'Phased Growth Plan',
    subtitle: '0 → 150K users in 6 months',
    icon: Rocket,
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400',
    description: 'Phase 1–3 milestones, weekly targets, budget, contingency plans, success criteria.',
  },
];

export function InternalDocsPage() {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`min-h-full ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-gradient-to-br from-red-900 via-red-800 to-gray-900 text-white px-5 pt-14 pb-8 safe-area-top relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full" />
        <div className="absolute top-20 -left-6 w-20 h-20 bg-white/5 rounded-full" />
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate('/')}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 active:bg-white/20 transition-all active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-red-300">Back to Home</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <span className="text-[10px] uppercase tracking-wider text-red-400 font-semibold">Confidential — Internal Only</span>
          </div>
          <h1 className="text-2xl mb-1 tracking-tight" style={{ fontWeight: 700 }}>
            Internal Documents
          </h1>
          <p className="text-red-200/70 text-sm">
            Business strategy, architecture, and planning documents. Not for public distribution.
          </p>
        </motion.div>
      </div>

      {/* Document cards */}
      <div className="px-4 -mt-4 relative z-10 pb-6">
        <div className="space-y-3">
          {internalDocs.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.06 }}
            >
              <Card
                className={`p-4 rounded-xl border-0 shadow-sm cursor-pointer active:scale-[0.99] transition-all ${isDark ? 'bg-gray-900 shadow-black/20' : ''}`}
                onClick={() => navigate(`/_rc-admin/docs/${doc.id}`)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${doc.color}`}>
                    <doc.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '15px', fontWeight: 600 }}>
                      {doc.title}
                    </h3>
                    <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{doc.subtitle}</p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{doc.description}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 flex-shrink-0 mt-1 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer notice */}
        <div className="mt-6 text-center">
          <p className="text-[10px] text-gray-400 dark:text-gray-600">
            These documents are not discoverable from the app. Bookmark this page for quick access.
          </p>
        </div>
      </div>
    </div>
  );
}
