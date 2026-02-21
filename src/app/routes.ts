// React Router configuration
import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ResultsPage } from './pages/ResultsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { HistoryPage } from './pages/HistoryPage';
import { ProfilePage } from './pages/ProfilePage';
import { DocsPage } from './pages/DocsPage';
import { BrandPage } from './pages/docs/BrandPage';
import { AboutPage } from './pages/docs/AboutPage';

// Internal (secret) docs — not linked from public UI
import { InternalDocsPage } from './pages/docs/_internal/InternalDocsPage';
import { PRDPage } from './pages/docs/_internal/PRDPage';
import { PitchDeckPage } from './pages/docs/_internal/PitchDeckPage';
import { TechnicalPage } from './pages/docs/_internal/TechnicalPage';
import { MarketingPage } from './pages/docs/_internal/MarketingPage';
import { LiveMetricsPage } from './pages/docs/_internal/LiveMetricsPage';
import { RoadmapPage } from './pages/docs/_internal/RoadmapPage';
import { OutreachPlanPage } from './pages/docs/_internal/OutreachPlanPage';
import { CRMTemplatePage } from './pages/docs/_internal/CRMTemplatePage';
import { RiskChecklistPage } from './pages/docs/_internal/RiskChecklistPage';
import { FareAnalysisPage } from './pages/docs/_internal/FareAnalysisPage';
import { TractionStrategyPage } from './pages/docs/_internal/TractionStrategyPage';
import { MetricsDashboardPage } from './pages/docs/_internal/MetricsDashboardPage';
import { DataFrameworkPage } from './pages/docs/_internal/DataFrameworkPage';
import { GrowthPlanPage } from './pages/docs/_internal/GrowthPlanPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: 'results',
        Component: ResultsPage,
      },
      {
        path: 'favorites',
        Component: FavoritesPage,
      },
      {
        path: 'history',
        Component: HistoryPage,
      },
      {
        path: 'profile',
        Component: ProfilePage,
      },
      {
        path: 'docs',
        Component: DocsPage,
      },
      {
        path: 'docs/about',
        Component: AboutPage,
      },
      {
        path: 'docs/brand',
        Component: BrandPage,
      },
      // Secret internal docs — only accessible via direct URL
      {
        path: '_rc-admin/docs',
        Component: InternalDocsPage,
      },
      {
        path: '_rc-admin/docs/prd',
        Component: PRDPage,
      },
      {
        path: '_rc-admin/docs/pitch',
        Component: PitchDeckPage,
      },
      {
        path: '_rc-admin/docs/technical',
        Component: TechnicalPage,
      },
      {
        path: '_rc-admin/docs/marketing',
        Component: MarketingPage,
      },
      {
        path: '_rc-admin/docs/metrics',
        Component: LiveMetricsPage,
      },
      {
        path: '_rc-admin/docs/roadmap',
        Component: RoadmapPage,
      },
      {
        path: '_rc-admin/docs/outreach',
        Component: OutreachPlanPage,
      },
      {
        path: '_rc-admin/docs/crm',
        Component: CRMTemplatePage,
      },
      {
        path: '_rc-admin/docs/risk',
        Component: RiskChecklistPage,
      },
      {
        path: '_rc-admin/docs/fare-analysis',
        Component: FareAnalysisPage,
      },
      {
        path: '_rc-admin/docs/traction',
        Component: TractionStrategyPage,
      },
      {
        path: '_rc-admin/docs/kpi-dashboard',
        Component: MetricsDashboardPage,
      },
      {
        path: '_rc-admin/docs/data-framework',
        Component: DataFrameworkPage,
      },
      {
        path: '_rc-admin/docs/growth-plan',
        Component: GrowthPlanPage,
      },
    ],
  },
]);