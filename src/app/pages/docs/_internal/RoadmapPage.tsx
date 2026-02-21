// Development Roadmap — RideChecka Concept-to-Production Plan
import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';

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

function Code({ children }: { children: string }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-4 overflow-x-auto">
      <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre">{children}</pre>
    </div>
  );
}

function UL({ items }: { items: string[] }) {
  return (
    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5 ml-4 mb-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-indigo-500 mt-1 flex-shrink-0">•</span>
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

interface PhaseCardProps {
  phase: string;
  title: string;
  weeks: string;
  color: string;
  items: { name: string; desc: string; tech: string }[];
}

function PhaseCard({ phase, title, weeks, color, items }: PhaseCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border mb-3 overflow-hidden ${open ? 'border-gray-200 dark:border-gray-700' : 'border-gray-100 dark:border-gray-800'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 text-left active:bg-gray-50 dark:active:bg-gray-900 transition-colors"
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
          <span className="text-white text-xs" style={{ fontWeight: 700 }}>{phase}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-gray-900 dark:text-white text-sm" style={{ fontWeight: 600 }}>{title}</p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">{weeks} — {items.length} deliverables</p>
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
            <div className="px-4 pb-4 space-y-3 border-t border-gray-100 dark:border-gray-800 pt-3">
              {items.map((item, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                  <div className="flex items-start gap-2 mb-1">
                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5" style={{ fontWeight: 600 }}>{i + 1}.</span>
                    <div>
                      <p className="text-xs text-gray-900 dark:text-white" style={{ fontWeight: 600 }}>{item.name}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{item.desc}</p>
                      <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                        {item.tech.split(', ').map((t, j) => (
                          <span key={j} className="text-[9px] px-1.5 py-0.5 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function RoadmapPage() {
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
            <h1 className="text-gray-900 dark:text-white" style={{ fontSize: '16px', fontWeight: 600 }}>Development Roadmap</h1>
            <p className="text-[11px] text-gray-400">Concept to Production — 8-Week Sprint Plan</p>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 py-6 max-w-2xl mx-auto">
        {/* Title block */}
        <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">???</span>
            </div>
            <div>
              <h1 className="text-gray-900 dark:text-white" style={{ fontSize: '22px', fontWeight: 700 }}>Development Roadmap</h1>
              <p className="text-sm text-gray-500">8-Week Sprint Plan — Concept to Production</p>
            </div>
          </div>
          {/* Timeline visual */}
          <div className="flex items-center gap-1 mb-4">
            {[
              { label: 'P1', color: 'bg-blue-500', weeks: 'Wk 1-2' },
              { label: 'P2', color: 'bg-green-600', weeks: 'Wk 3-4' },
              { label: 'P3', color: 'bg-purple-500', weeks: 'Wk 5-6' },
              { label: 'P4', color: 'bg-amber-500', weeks: 'Wk 7-8' },
            ].map((p, i) => (
              <div key={i} className="flex-1">
                <div className={`h-2 rounded-full ${p.color} ${i === 0 ? 'rounded-l-full' : ''} ${i === 3 ? 'rounded-r-full' : ''}`} />
                <p className="text-[9px] text-gray-400 dark:text-gray-500 mt-1 text-center">{p.weeks}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Phase 1 */}
        <Section title="Phase 1 — Core Infrastructure (Weeks 1–2)">
          <P>
            Establish the production-grade foundation: containerized microservices, CI/CD, data stores, cloud deployment, and authentication. Every subsequent phase builds on this infrastructure.
          </P>
          <PhaseCard
            phase="P1"
            title="Core Infrastructure"
            weeks="Weeks 1–2"
            color="bg-blue-600"
            items={[
              {
                name: 'Microservices Architecture',
                desc: 'Docker-containerized services: API Gateway, Price Aggregator, User Service, Notification Service, Analytics Service. Docker Compose for local dev, Kubernetes manifests for staging/production.',
                tech: 'Docker, Kubernetes, Helm, Istio service mesh',
              },
              {
                name: 'CI/CD Pipeline',
                desc: 'GitHub Actions workflow: lint ? unit test ? build ? integration test ? security scan ? staging deploy ? smoke test ? production deploy (manual gate). Branch protection, PR reviews, semantic versioning.',
                tech: 'GitHub Actions, Docker Hub, ArgoCD, SonarQube',
              },
              {
                name: 'Database & Caching Layer',
                desc: 'PostgreSQL 16 for relational data (users, favorites, history, prices). Redis 7 for caching (hot price data, sessions, rate limiting). Automated backups, point-in-time recovery, connection pooling via PgBouncer.',
                tech: 'PostgreSQL 16, Redis 7, PgBouncer, Flyway migrations',
              },
              {
                name: 'Cloud Deployment with Auto-Scaling',
                desc: 'AWS EKS or GCP GKE cluster with Horizontal Pod Autoscaler. Min 2 replicas per service, max 20. Scale triggers: CPU > 70%, memory > 80%, request latency > 500ms. Multi-AZ for high availability.',
                tech: 'AWS EKS / GCP GKE, Terraform, HPA, ALB/Ingress',
              },
              {
                name: 'JWT Authentication System',
                desc: 'JWT-based auth with access tokens (15min TTL) and refresh tokens (7-day TTL, rotated on use). Refresh token stored in HttpOnly Secure cookie. Token blacklist in Redis for instant revocation. Future: Supabase Auth integration.',
                tech: 'JWT, bcrypt, Redis token store, CORS, CSRF protection',
              },
            ]}
          />
        </Section>

        {/* Phase 2 */}
        <Section title="Phase 2 — Essential Features (Weeks 3–4)">
          <P>
            Build the differentiating features that transform Ridechecka from a price comparison tool into a comprehensive ride intelligence platform.
          </P>
          <PhaseCard
            phase="P2"
            title="Essential Features"
            weeks="Weeks 3–4"
            color="bg-green-600"
            items={[
              {
                name: 'Real-Time Ride Tracking',
                desc: 'WebSocket server (Socket.io / native WS) for live location updates. Client subscribes to ride channel after booking redirect. Server pushes GPS coordinates at 1Hz. Graceful degradation to polling on poor connections. Show live driver location on map component.',
                tech: 'WebSockets, Socket.io, Redis Pub/Sub, Mapbox GL JS',
              },
              {
                name: 'Dynamic Pricing Engine',
                desc: 'ML-based pricing prediction combining: (1) time-of-day patterns, (2) real-time weather data (OpenWeatherMap API), (3) traffic conditions (Google Maps Traffic API), (4) demand heatmaps from historical data, (5) event calendar (holidays, festivals). XGBoost model trained on 90-day price history per route. Inference via Supabase Edge Function or AWS Lambda.',
                tech: 'XGBoost, scikit-learn, OpenWeatherMap, Google Traffic API, MLflow',
              },
              {
                name: 'Multi-Modal Transport Integration',
                desc: 'Expand beyond cars and bikes: electric scooters (e.g., future Nigerian scooter-share), BRT/bus rapid transit (Lagos BRT fare estimation), ferry services (Lagos waterways), and keke napep (three-wheelers). Unified PriceEstimate interface with transport_mode field. Filter UI expanded with new vehicle icons.',
                tech: 'Lagos BRT API, transport mode enum, unified adapter pattern',
              },
              {
                name: 'Advanced Search Filters',
                desc: 'Extend existing SearchFilter component with: wheelchair-accessible vehicle toggle, eco-friendly/EV preference, driver gender preference (safety), child seat requirement, luggage capacity slider, ride-sharing (pool) toggle. Filters persist in localStorage. Server-side filtering when API supports it.',
                tech: 'React state, localStorage, shadcn/ui Switch/Slider',
              },
              {
                name: 'In-App Encrypted Communication',
                desc: 'End-to-end encrypted messaging between rider and driver after booking redirect. Signal Protocol for E2E encryption. Messages stored client-side only (zero-knowledge server). Auto-delete after ride completion. Push notification for new messages.',
                tech: 'Signal Protocol, WebSocket, Web Push API, IndexedDB',
              },
            ]}
          />
        </Section>

        {/* Phase 3 */}
        <Section title="Phase 3 — Innovation Features (Weeks 5–6)">
          <P>
            Leapfrog competitors with predictive intelligence, sustainability features, and next-generation UX that no ride-hailing aggregator in Africa has attempted.
          </P>
          <PhaseCard
            phase="P3"
            title="Innovation Features"
            weeks="Weeks 5–6"
            color="bg-purple-600"
            items={[
              {
                name: 'Predictive Analytics Engine',
                desc: 'ETA predictions using historical traffic patterns, time-of-day, weather, and road conditions. LSTM neural network trained on 6 months of ride data. Predict: (1) best time to book in next 2 hours, (2) expected price range for upcoming week, (3) surge probability by hour. Results shown as "Price Forecast" chart on route detail page.',
                tech: 'LSTM/TensorFlow.js, historical data pipeline, Recharts',
              },
              {
                name: 'Carbon Footprint Tracker',
                desc: 'Calculate CO2 emissions per trip based on: vehicle type, distance, fuel type (petrol/diesel/electric), occupancy, and traffic conditions. Aggregate monthly/yearly emissions in analytics dashboard. Compare "your ride" vs. "public transit" vs. "walking" emissions. Partner with carbon offset providers (e.g., Pachama) for optional offset purchases. Green badge for eco-conscious riders.',
                tech: 'CO2 emission factors database, IPCC methodology, offset API',
              },
              {
                name: 'Group Ride Coordination',
                desc: 'Multi-rider coordination for shared trips: (1) Create group ride with shareable invite link, (2) Each member sees their pickup ETA, (3) Synchronized pickup sequence optimization (TSP solver), (4) Split payment via Paystack/Flutterwave, (5) Real-time group chat during coordination. Support for corporate group rides with expense allocation.',
                tech: 'WebSocket rooms, Paystack API, TSP optimization, invite links',
              },
              {
                name: 'AR Navigation for Pickup',
                desc: 'Augmented Reality overlay on phone camera to guide riders to exact pickup location. Uses WebXR API with GPS + compass for positioning. Driver sees AR arrow pointing to rider. Rider sees AR marker showing driver approach direction. Fallback to 2D map for unsupported devices. Reduces "wrong pickup" incidents by estimated 60%.',
                tech: 'WebXR API, DeviceOrientation API, Three.js, GPS',
              },
              {
                name: 'Voice Command Booking',
                desc: 'Hands-free ride comparison using Web Speech API. Commands: "Compare rides from Lekki to Victoria Island", "Show cheapest ride", "Book with Bolt", "Save this route". Natural language processing via Wit.ai or OpenAI Whisper for Nigerian-accented English. Yoruba/Hausa voice support in Phase 2. Accessibility: core feature for visually impaired users.',
                tech: 'Web Speech API, Wit.ai / Whisper, NLP intent parsing',
              },
            ]}
          />
        </Section>

        {/* Phase 4 */}
        <Section title="Phase 4 — Integration Strategy (Weeks 7–8)">
          <P>
            Open Ridechecka as a platform: deep links for app-to-app transitions, public APIs for partners, SDKs for developers, and enterprise solutions.
          </P>
          <PhaseCard
            phase="P4"
            title="Integration & Platform"
            weeks="Weeks 7–8"
            color="bg-amber-600"
            items={[
              {
                name: 'Deep Link Implementation',
                desc: 'Universal Links (iOS) and App Links (Android) for seamless app-to-app transitions. Custom URL scheme: ridechecka://compare?pickup=Lekki&dest=VI. Web fallback for non-installed users. QR code generation for shareable ride comparisons. Branch.io or Firebase Dynamic Links for deferred deep linking (install ? open to correct page).',
                tech: 'Universal Links, App Links, Custom URL schemes, Branch.io',
              },
              {
                name: 'API Gateway & Developer Portal',
                desc: 'Public REST API (v1) and GraphQL endpoint for third-party integration. Endpoints: GET /prices, GET /services, GET /routes, POST /compare. Rate limiting: 100 req/min (free tier), 10,000 req/min (premium). OAuth 2.0 client credentials for API access. Developer portal with interactive docs (Swagger UI), API key management, usage analytics, and billing.',
                tech: 'Kong/AWS API Gateway, GraphQL (Apollo), Swagger/OpenAPI 3.0',
              },
              {
                name: 'SDK Creation',
                desc: 'Integration SDKs for popular platforms: (1) JavaScript/TypeScript SDK (npm package), (2) Python SDK (pip package), (3) React Native module, (4) Flutter plugin, (5) REST client generator (OpenAPI codegen). Each SDK includes: authentication handling, request/response typing, error handling, retry logic, and comprehensive test coverage.',
                tech: 'TypeScript, Python, React Native, Flutter, OpenAPI codegen',
              },
              {
                name: 'White-Label Solutions',
                desc: 'Customizable ride comparison modules for partner companies: (1) Embeddable widget (iframe or Web Component) with partner branding, (2) Custom color themes and logo placement, (3) API-only integration for full UI control, (4) Multi-tenant architecture with per-partner analytics. Target partners: corporate travel platforms, hotel booking sites, airline apps.',
                tech: 'Web Components, CSS custom properties, multi-tenant DB, iframe embed',
              },
              {
                name: 'Single Sign-On (SSO)',
                desc: 'OAuth 2.0 / OIDC integration with major platforms: Google, Facebook, Apple Sign In, Microsoft (corporate), and Supabase Auth as the identity provider. SAML 2.0 support for enterprise partners. User account linking: merge existing local account with SSO identity. Session management with cross-device sync via Supabase Realtime.',
                tech: 'OAuth 2.0, OIDC, SAML 2.0, Supabase Auth, PKCE flow',
              },
            ]}
          />
        </Section>

        {/* Brilliant Enhancement Ideas */}
        <Section title="5. Brilliant Enhancement Ideas">
          <P>Post-launch innovations to cement Ridechecka as the dominant ride intelligence platform in Africa:</P>

          <div className="space-y-3 mb-4">
            {[
              {
                icon: '??',
                title: 'Blockchain Fare Transparency',
                desc: 'Record anonymized fare calculations on a public ledger so riders can independently verify price fairness. Smart contracts enforce transparent commission structures with driver partners. Polygon L2 for low gas fees. Token-gated premium features.',
                tags: ['Polygon', 'Solidity', 'Ethers.js', 'IPFS'],
              },
              {
                icon: '??',
                title: 'Gamification & Loyalty System',
                desc: 'Points for every comparison (10pts), booking redirect (50pts), review (25pts), referral (500pts). Achievement badges: "First Ride", "Savings Guru (?10K saved)", "Polyglot (used 3 languages)", "Night Owl (10 late-night searches)". Monthly leaderboards per city. Redeemable rewards: premium subscription, partner discounts.',
                tags: ['Points engine', 'Achievement system', 'Leaderboard API', 'Referral tracking'],
              },
              {
                icon: '??',
                title: 'Emergency Response System',
                desc: 'One-tap SOS button accessible from any screen. Triggers: (1) share live GPS with 3 emergency contacts via SMS, (2) silent alert to Ridechecka safety team, (3) auto-record audio (with consent), (4) display nearest police station/hospital. Integration with Nigerian Emergency numbers (112, 199). Fake call feature for uncomfortable situations.',
                tags: ['SMS API', 'Geolocation', 'MediaRecorder API', 'Emergency contacts'],
              },
              {
                icon: '?',
                title: 'Comprehensive Accessibility Suite',
                desc: 'Wheelchair-accessible vehicle filtering with real-time availability indicators. Screen reader optimization with ARIA live regions for price updates. High-contrast mode with 7:1 contrast ratio. Text-to-speech for price comparisons. Hearing-impaired support: visual alerts instead of audio, text-based driver communication. Physical disability adaptations: larger touch targets (56px), simplified one-hand mode.',
                tags: ['WCAG 2.1 AAA', 'ARIA', 'TTS', 'One-hand mode'],
              },
              {
                icon: '??',
                title: 'Subscription Models',
                desc: 'Monthly passes with discounted rates: (1) Commuter Pass (?5K/mo): 20% off all affiliate commissions passed to rider, (2) Premium Pass (?10K/mo): price alerts, advanced analytics, zero ads, priority support, expense export, (3) Corporate Pass (custom): team management, centralized billing, compliance reporting. Annual discount: 2 months free. Family plan: up to 5 members.',
                tags: ['Paystack recurring', 'Subscription tiers', 'Team management', 'Billing API'],
              },
            ].map((idea, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{idea.icon}</span>
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white mb-1" style={{ fontWeight: 600 }}>{idea.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-2">{idea.desc}</p>
                    <div className="flex flex-wrap gap-1">
                      {idea.tags.map((tag, j) => (
                        <span key={j} className="text-[9px] px-1.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* App Linking Technical Implementation */}
        <Section title="6. Technical Implementation — App Linking">
          <P>Detailed implementation strategy for seamless inter-app transitions and partner integrations:</P>

          <div className="mb-5">
            <h3 className="text-gray-800 dark:text-gray-200 mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>6.1 Universal & App Links</h3>
            <Code>{`// Android: App Links (Digital Asset Links)
// /.well-known/assetlinks.json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.ridechecka.app",
    "sha256_cert_fingerprints": ["AA:BB:CC:..."]
  }
}]

// iOS: Universal Links (apple-app-site-association)
// /.well-known/apple-app-site-association
{
  "applinks": {
    "apps": [],
    "details": [{
      "appID": "TEAMID.com.ridechecka.app",
      "paths": ["/compare/*", "/ride/*", "/share/*"]
    }]
  }
}`}</Code>
          </div>

          <div className="mb-5">
            <h3 className="text-gray-800 dark:text-gray-200 mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>6.2 Custom URL Schemes</h3>
            <Code>{`// Ridechecka Custom URL Schemes
ridechecka://compare?pickup=Lekki+Phase+1&dest=Victoria+Island
ridechecka://book?service=bolt&route_id=abc123
ridechecka://share?comparison_id=xyz789
ridechecka://favorites
ridechecka://history
ridechecka://settings?section=language

// Web Fallback Handler (React Router)
// Parses deep link params ? navigates to correct page
function DeepLinkHandler() {
  const [params] = useSearchParams();
  const pickup = params.get('pickup');
  const dest = params.get('dest');
  // Navigate to results with pre-filled locations
}`}</Code>
          </div>

          <div className="mb-5">
            <h3 className="text-gray-800 dark:text-gray-200 mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>6.3 Partner API Endpoints</h3>
            <Table
              headers={['Endpoint', 'Method', 'Description', 'Auth']}
              rows={[
                ['/api/v1/compare', 'POST', 'Submit pickup/destination, receive price comparison from all services', 'API Key'],
                ['/api/v1/prices/{route_id}', 'GET', 'Retrieve cached prices for a specific route', 'API Key'],
                ['/api/v1/services', 'GET', 'List all supported ride-hailing services and their status', 'Public'],
                ['/api/v1/services/{id}/redirect', 'POST', 'Generate deep link redirect to specific service booking', 'API Key'],
                ['/api/v1/routes/popular', 'GET', 'Top 50 most searched routes with average prices', 'API Key'],
                ['/api/v1/webhooks', 'POST', 'Register webhook for price change notifications on routes', 'OAuth 2.0'],
                ['/api/v1/analytics/savings', 'GET', 'User savings analytics (requires user consent)', 'OAuth 2.0'],
              ]}
            />
          </div>

          <div className="mb-5">
            <h3 className="text-gray-800 dark:text-gray-200 mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>6.4 Webhook System</h3>
            <Code>{`// Webhook Registration
POST /api/v1/webhooks
{
  "url": "https://partner.com/webhooks/ridechecka",
  "events": ["price.updated", "surge.started", "surge.ended", "service.down"],
  "routes": ["lekki-vi", "ikeja-airport"],
  "secret": "whsec_...",    // HMAC signing secret
  "retry_policy": {
    "max_retries": 5,
    "backoff": "exponential", // 1s, 2s, 4s, 8s, 16s
    "timeout_ms": 5000
  }
}

// Webhook Payload
POST https://partner.com/webhooks/ridechecka
Headers:
  X-Ridechecka-Signature: sha256=abc123...
  X-Ridechecka-Event: price.updated
  X-Ridechecka-Delivery: evt_123456
Body:
{
  "event": "price.updated",
  "timestamp": "2026-02-20T14:30:00Z",
  "data": {
    "route_id": "lekki-vi",
    "service": "bolt",
    "old_price": 2500,
    "new_price": 2100,
    "change_pct": -16.0,
    "currency": "NGN"
  }
}`}</Code>
          </div>

          <div className="mb-5">
            <h3 className="text-gray-800 dark:text-gray-200 mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>6.5 SDK Usage Example</h3>
            <Code>{`// JavaScript/TypeScript SDK
import { Ridechecka } from '@ridechecka/sdk';

const rc = new Ridechecka({
  apiKey: 'rck_live_...',
  environment: 'production',
});

// Compare prices
const comparison = await rc.compare({
  pickup: { address: 'Lekki Phase 1, Lagos' },
  destination: { address: 'Victoria Island, Lagos' },
  filters: {
    vehicleTypes: ['economy', 'standard'],
    maxPrice: 5000,
    features: ['ac', 'card_payment'],
  },
});

console.log(comparison.cheapest); // { service: 'bolt', price: 1800 }
console.log(comparison.fastest);  // { service: 'uber', eta: '8 min' }

// Subscribe to price changes
rc.subscribe('lekki-vi', (event) => {
  console.log(\`\${event.service} price: ?\${event.price}\`);
});`}</Code>
          </div>
        </Section>

        {/* QA Requirements */}
        <Section title="7. Quality Assurance Requirements">
          <P>Production readiness gates — all must pass before launch:</P>

          <Table
            headers={['Requirement', 'Target', 'Verification Method', 'Status']}
            rows={[
              ['Code Coverage', '= 95%', 'Istanbul/NYC with Jest; enforced in CI pipeline', '?? Pending'],
              ['OWASP Top 10', 'Pass all checks', 'ZAP automated scan + manual penetration test', '?? Pending'],
              ['Concurrent Users', '100,000 without degradation', 'k6 load test: 100K VUs, 30min sustained', '?? Pending'],
              ['Uptime SLA', '99.9% (43.8 min/month max downtime)', 'Multi-AZ deployment, auto-failover, health checks', '?? Pending'],
              ['Penetration Testing', 'Zero critical/high findings', 'Third-party security audit (HackerOne/Cobalt)', '?? Pending'],
              ['Accessibility Audit', 'WCAG 2.1 Level AA', 'axe-core automated + manual screen reader testing', '? Partial'],
              ['Performance Budget', 'LCP = 2.5s, FID = 100ms, CLS = 0.1', 'Lighthouse CI in GitHub Actions', '? On track'],
              ['Data Privacy', 'NDPR compliance (Nigerian Data Protection)', 'Privacy impact assessment + legal review', '?? Pending'],
              ['API Rate Limiting', 'Enforced per tier, no bypass', 'Automated abuse testing with 10x rate limit', '?? Pending'],
              ['Disaster Recovery', 'RPO < 1hr, RTO < 30min', 'DR drill: simulate full region failure', '?? Pending'],
            ]}
          />

          <div className="mb-5">
            <h3 className="text-gray-800 dark:text-gray-200 mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>7.1 Test Pyramid</h3>
            <Code>{`Test Distribution (Target: 95% coverage)
+-------------------------------------+
¦         E2E Tests (5%)              ¦  Cypress / Playwright
¦    Full user journeys: compare,     ¦  10 critical flows
¦    save favorite, view history      ¦  Run: nightly
+-------------------------------------¦
¦       Integration Tests (25%)       ¦  Jest + Supertest
¦  API endpoints, DB queries,         ¦  150+ tests
¦  Kafka pipelines, Redis caching     ¦  Run: every PR
+-------------------------------------¦
¦         Unit Tests (70%)            ¦  Jest + React Testing Library
¦  Components, hooks, utils,          ¦  500+ tests
¦  services, validators, models       ¦  Run: every commit
+-------------------------------------+

Additional:
+-- Contract Tests: Pact for API consumer/provider
+-- Visual Regression: Percy / Chromatic
+-- Security Scans: Snyk (dependencies), ZAP (DAST)
+-- Performance: k6 benchmarks with regression detection`}</Code>
          </div>
        </Section>

        {/* Sprint Summary */}
        <Section title="8. Sprint Summary & Milestones">
          <Table
            headers={['Week', 'Focus', 'Key Milestone', 'Demo Deliverable']}
            rows={[
              ['1', 'Docker + CI/CD', 'All services containerized, pipeline green', 'Auto-deploy on merge to main'],
              ['2', 'Database + Auth', 'PostgreSQL + Redis live, JWT auth working', 'Login flow end-to-end'],
              ['3', 'WebSocket + Pricing ML', 'Live tracking prototype, price prediction model v1', 'Real-time price updates'],
              ['4', 'Multi-modal + Filters', 'BRT/ferry/keke support, advanced filter drawer', 'Filter by accessibility options'],
              ['5', 'Predictive + Carbon', 'Price forecast chart, CO2 tracker', 'Show "best time to book"'],
              ['6', 'Group Rides + Voice', 'Invite-link groups, voice commands', 'Voice: "Compare Lekki to VI"'],
              ['7', 'API Gateway + Deep Links', 'Developer portal live, deep links working', 'Partner API demo'],
              ['8', 'QA + Launch Prep', '95% coverage, pen test complete, DR drill passed', 'Production-ready build'],
            ]}
          />
        </Section>

        {/* Team Allocation */}
        <Section title="9. Team Allocation">
          <Table
            headers={['Role', 'Count', 'Phase Focus']}
            rows={[
              ['Backend Engineer (Senior)', '2', 'P1: Infrastructure, P2: Pricing engine, P4: API Gateway'],
              ['Frontend Engineer (Senior)', '1', 'P2: WebSocket UI, P3: AR/Voice, P4: Dev portal'],
              ['Full-Stack Engineer', '2', 'P2: Filters/multi-modal, P3: Group rides, P4: SDK'],
              ['ML Engineer', '1', 'P2: Pricing model, P3: Predictive analytics, P4: Anomaly detection'],
              ['DevOps/SRE', '1', 'P1: CI/CD/K8s, P4: Load testing, monitoring, DR'],
              ['QA Engineer', '1', 'P1-P4: Test automation, security testing, accessibility audit'],
              ['Product Manager', '1', 'All phases: Sprint planning, stakeholder demos, user research'],
              ['Designer (UI/UX)', '1', 'P2-P3: AR mockups, voice UI, accessibility patterns'],
            ]}
          />
        </Section>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-600">Ridechecka Development Roadmap v1.0 — Confidential</p>
          <p className="text-[10px] text-gray-300 dark:text-gray-700 mt-1">Last updated: February 20, 2026 — Use Ctrl/Cmd+P to print or save as PDF</p>
        </div>
      </motion.div>
    </div>
  );
}
