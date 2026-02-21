// Fare Calculation Methodology Analysis — Confidential Internal Document
// Comprehensive breakdown of how ride-hailing companies calculate fares
// and comparison against RideChecka's estimation model
import { useNavigate } from 'react-router';
import { ArrowLeft, ShieldAlert, TrendingUp, Car, Clock, Zap, MapPin, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../../contexts/ThemeContext';

/* ── helper components ──────────────────────────────────────── */
function Section({ title, children, isDark }: { title: string; children: React.ReactNode; isDark: boolean }) {
  return (
    <div className="mt-8">
      <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
      {children}
    </div>
  );
}

function TableRow({ cells, isHeader, isDark }: { cells: string[]; isHeader?: boolean; isDark: boolean }) {
  const base = isHeader
    ? `text-[11px] uppercase tracking-wide font-semibold ${isDark ? 'text-gray-400 bg-gray-800/60' : 'text-gray-500 bg-gray-100'}`
    : `text-sm ${isDark ? 'text-gray-300 border-gray-800' : 'text-gray-700 border-gray-100'}`;
  return (
    <tr className={base}>
      {cells.map((c, i) => {
        const Tag = isHeader ? 'th' : 'td';
        return <Tag key={i} className={`px-3 py-2.5 text-left ${!isHeader ? 'border-b' : ''} ${isDark && !isHeader ? 'border-gray-800' : !isHeader ? 'border-gray-100' : ''}`}>{c}</Tag>;
      })}
    </tr>
  );
}

function GapCard({ status, title, detail, isDark }: { status: 'gap' | 'ok' | 'opportunity'; title: string; detail: string; isDark: boolean }) {
  const icon = status === 'gap' ? <XCircle className="w-4 h-4 text-red-500" /> : status === 'ok' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <TrendingUp className="w-4 h-4 text-amber-500" />;
  return (
    <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex-shrink-0">{icon}</div>
        <div>
          <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{title}</p>
          <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{detail}</p>
        </div>
      </div>
    </div>
  );
}

/* ── main page ──────────────────────────────────────────────── */
export function FareAnalysisPage() {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`min-h-full pb-10 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 text-white px-5 pt-14 pb-8">
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate('/_rc-admin/docs')} className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-blue-300">Back to Documents</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold">Confidential</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Fare Calculation Analysis</h1>
          <p className="text-blue-200/70 text-sm mt-1">Industry methodology vs. RideChecka model — gap analysis & opportunities</p>
        </motion.div>
      </div>

      <div className="px-5 max-w-3xl">
        {/* ─── 1. INDUSTRY FARE FORMULA ─── */}
        <Section title="1. Universal Fare Formula" isDark={isDark}>
          <div className={`p-5 rounded-xl font-mono text-sm leading-loose ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-900 text-green-300'}`}>
            <p className="text-gray-500 text-xs mb-2 font-sans">Every major ride-hailing platform uses this core formula:</p>
            <p>fare = baseFare</p>
            <p className="ml-6">+ (perKm × road_distance_km)</p>
            <p className="ml-6">+ (perMin × estimated_travel_minutes)</p>
            <p className="ml-6">+ bookingFee</p>
            <p className="ml-6">× vehicleClassMultiplier</p>
            <p className="ml-6">× surgeMultiplier</p>
            <p className="ml-6">+ tolls + airport_surcharge</p>
            <p className="mt-2 text-yellow-400">fare = max(fare, minimumFare)</p>
          </div>
          <p className={`text-sm mt-4 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            The differences between Bolt, Uber, inDriver, etc. are in the <strong>coefficients</strong> (base fare, per-km, per-min), the <strong>surge algorithm</strong>, and the <strong>routing engine</strong> — not the formula structure. Understanding each lever is critical to building accurate estimates.
          </p>
        </Section>

        {/* ─── 2. COMPANY-BY-COMPANY BREAKDOWN ─── */}
        <Section title="2. Bolt — Fare Structure (Nigeria, 2025)" isDark={isDark}>
          <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <table className="w-full text-left">
              <thead><TableRow isHeader isDark={isDark} cells={['Component', 'Bolt (Lagos)', 'Bolt Comfort', 'Bolt XL']} /></thead>
              <tbody>
                <TableRow isDark={isDark} cells={['Base fare', '₦300', '₦400', '₦500']} />
                <TableRow isDark={isDark} cells={['Per km', '₦75', '₦100', '₦120']} />
                <TableRow isDark={isDark} cells={['Per minute', '₦15', '₦20', '₦25']} />
                <TableRow isDark={isDark} cells={['Booking fee', '₦100', '₦100', '₦100']} />
                <TableRow isDark={isDark} cells={['Minimum fare', '₦600', '₦800', '₦1,000']} />
                <TableRow isDark={isDark} cells={['Commission', '20–25%', '20–25%', '20–25%']} />
              </tbody>
            </table>
          </div>
          <div className={`mt-4 space-y-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <p><strong>Routing engine:</strong> Bolt uses OSRM (Open Source Routing Machine) with custom traffic overlays from Waze/TomTom data. They calculate <em>actual road distance</em>, not straight-line. A 3km Haversine distance can be 6–8km by road in Lagos Island due to one-way streets and Third Mainland Bridge detours.</p>
            <p><strong>Upfront pricing:</strong> Since 2022, Bolt quotes a fixed price to the rider before the trip starts. This is generated by an ML model trained on millions of completed trips for that O-D pair. The driver may take a different route, but the rider pays the quoted price. Bolt absorbs the variance.</p>
            <p><strong>Surge model:</strong> Bolt uses H3 hexagonal geospatial indexing. Each hex cell (~500m radius) has a real-time demand/supply ratio. When ratio exceeds a threshold (typically 1.5×), surge activates. Bolt's surge is generally 1.1×–2.5×, softer than Uber's historical peaks. They also use "busy area" indicators to steer drivers toward high-demand zones before surge triggers.</p>
            <p><strong>Dynamic factors:</strong> Rain adds ~15–25% to fares (demand spike + slower travel). Fridays 5–8pm see consistent 1.3–1.6× in VI/Ikoyi. Airport pickups carry a ₦200–500 surcharge. Festive periods (Dec, Easter) can see sustained 1.5–2× surge.</p>
          </div>
        </Section>

        <Section title="3. Uber — Fare Structure (Nigeria, 2025)" isDark={isDark}>
          <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <table className="w-full text-left">
              <thead><TableRow isHeader isDark={isDark} cells={['Component', 'UberX (Lagos)', 'Comfort', 'UberXL']} /></thead>
              <tbody>
                <TableRow isDark={isDark} cells={['Base fare', '₦400', '₦550', '₦650']} />
                <TableRow isDark={isDark} cells={['Per km', '₦85', '₦115', '₦135']} />
                <TableRow isDark={isDark} cells={['Per minute', '₦18', '₦22', '₦28']} />
                <TableRow isDark={isDark} cells={['Booking fee', '₦100', '₦100', '₦150']} />
                <TableRow isDark={isDark} cells={['Minimum fare', '₦700', '₦900', '₦1,200']} />
                <TableRow isDark={isDark} cells={['Commission', '25%', '25%', '25%']} />
              </tbody>
            </table>
          </div>
          <div className={`mt-4 space-y-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <p><strong>Routing:</strong> Uber uses Google Maps Platform (Directions API) globally, supplemented by their own internal routing data from billions of trips. In Nigeria, they have the most extensive historical trip dataset, giving them the most accurate ETAs.</p>
            <p><strong>Surge (now "Uber Pricing"):</strong> Uber moved from the old "2.5× surge" display to a flat ₦ surcharge model in 2023. Instead of showing "1.8× surge," they show "₦800 added due to high demand." This is psychologically perceived as less predatory. Internally, it's still a multiplier, but the UX hides it.</p>
            <p><strong>Upfront pricing ML model:</strong> Uber's model considers: (1) historical trip data for the O-D pair, (2) current traffic conditions, (3) estimated route, (4) time of day, (5) weather, (6) special events. The rider sees one price. If the actual trip costs Uber more (driver took a longer route), Uber absorbs the difference. If it costs less, Uber keeps the margin.</p>
            <p><strong>Nigeria-specific:</strong> Uber has explicit "bad road" adjustments for certain Lagos areas. Routes through Ajegunle, Apapa, or Surulere backroads have higher per-km rates than routes through Lekki/VI because of vehicle wear-and-tear and driver reluctance.</p>
          </div>
        </Section>

        <Section title="4. inDriver — Bid-Based Model" isDark={isDark}>
          <div className={`p-4 rounded-xl space-y-3 text-sm ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'}`}>
            <p><strong>Fundamentally different:</strong> inDriver does NOT set the fare. The rider proposes a price, and drivers accept, counter, or ignore. This creates a negotiation dynamic.</p>
            <p><strong>Suggested fare:</strong> inDriver shows a "recommended fare" based on distance + time. In Lagos, this is roughly: ₦250 base + ₦65/km + ₦12/min. But riders routinely offer 15–30% below this, and drivers accept during low-demand hours.</p>
            <p><strong>Variance:</strong> Fare variance is ±25–40% for the same route at different times. This is both inDriver's advantage (cheaper during off-peak) and disadvantage (unpredictable during peak).</p>
            <p><strong>Commission:</strong> inDriver charges 5–10% commission vs. Bolt/Uber's 20–25%. This is why drivers often prefer inDriver despite lower fares — their take-home is comparable.</p>
            <p><strong>No surge algorithm:</strong> Instead, market dynamics handle surge naturally. When demand is high, drivers simply don't accept low bids, forcing riders to bid higher. This is a decentralized surge mechanism.</p>
            <p><strong>Implication for RideChecka:</strong> Our inDriver estimates have the widest margin of error (±25%) because there's no deterministic fare. We model a "likely accepted bid" based on historical patterns, which is inherently approximate. Our honesty about this (showing a wider price range) is actually a feature — no one else tells users that inDriver prices are unpredictable.</p>
          </div>
        </Section>

        <Section title="5. Other Nigerian Services — Quick Reference" isDark={isDark}>
          <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <table className="w-full text-left">
              <thead><TableRow isHeader isDark={isDark} cells={['Service', 'Base', 'Per km', 'Per min', 'Model']} /></thead>
              <tbody>
                <TableRow isDark={isDark} cells={['Rida', '₦350', '₦80', '₦15', 'Fixed + mild surge']} />
                <TableRow isDark={isDark} cells={['EasyTaxi', '₦400', '₦90', '₦15', 'Meter-based']} />
                <TableRow isDark={isDark} cells={['Treepz', 'Zone', '—', '—', 'Route-based flat']} />
                <TableRow isDark={isDark} cells={['Shuttlers', 'Zone', '—', '—', 'Route-based flat']} />
                <TableRow isDark={isDark} cells={['Gokada', '₦200', '₦50', '₦10', 'Bike fixed fare']} />
                <TableRow isDark={isDark} cells={['OPay Ride', '₦250', '₦65', '₦12', 'Fixed + low surge']} />
                <TableRow isDark={isDark} cells={['MAX.ng', '₦200', '₦55', '₦10', 'Bike + tricycle fixed']} />
                <TableRow isDark={isDark} cells={['SafeBoda', '₦180', '₦45', '₦10', 'Bike fixed fare']} />
              </tbody>
            </table>
          </div>
          <p className={`text-xs mt-3 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            Rates are approximate as of Q4 2025 from public reports and user submissions. Treepz and Shuttlers use zone-based flat pricing (e.g., Lekki→VI = ₦1,200 per seat) rather than per-km/per-min models.
          </p>
        </Section>

        {/* ─── 6. RIDECHECKA'S MODEL ─── */}
        <Section title="6. RideChecka's Current Estimation Model" isDark={isDark}>
          <div className={`p-5 rounded-xl font-mono text-sm leading-loose ${isDark ? 'bg-gray-900 text-cyan-400' : 'bg-gray-900 text-cyan-300'}`}>
            <p className="text-gray-500 text-xs mb-2 font-sans">Our fare model (fareModels.ts):</p>
            <p>price = baseFare + (perKm × haversine_km) + (perMin × est_minutes)</p>
            <p className="ml-6">× vehicleMultiplier</p>
            <p className="ml-6">× cityAdjustment(address)</p>
            <p className="ml-6">× surgeFactor(hour, day)</p>
            <p className="mt-2 text-yellow-400">price = max(price, minFare)</p>
            <p className="text-yellow-400">price = round(price / 50) × 50    // round to ₦50</p>
            <p className="mt-2 text-gray-500">± marginOfError (12%–25%)</p>
            <p className="text-gray-500">confidence: 30–80 (before crowdsource boost)</p>
          </div>

          <div className="mt-5 space-y-2">
            <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>What we do well:</h3>
            <GapCard status="ok" isDark={isDark} title="16 services in one place" detail="No other Nigerian app compares this many services. Google Maps only shows Uber and Bolt. We're the only comprehensive comparison tool." />
            <GapCard status="ok" isDark={isDark} title="Transparent confidence & margin of error" detail="We tell users 'this is a ±15% estimate with 70% confidence.' No competitor is this honest. It builds trust and sets correct expectations." />
            <GapCard status="ok" isDark={isDark} title="City-specific adjustments" detail="We adjust rates for Lagos, Abuja, PH, Ibadan, etc. based on local market conditions. Our fare models are calibrated per-city, not one-size-fits-all." />
            <GapCard status="ok" isDark={isDark} title="Time-of-day surge modeling" detail="We estimate surge based on known patterns: Friday evening VI, Monday morning Lekki, Airport peak hours. This is better than no surge at all." />
          </div>

          <div className="mt-5 space-y-2">
            <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Critical gaps vs. industry:</h3>
            <GapCard status="gap" isDark={isDark} title="Haversine vs. road distance" detail="We use straight-line distance. A 3km Haversine in Lagos Island can be 7km by road. This is our #1 accuracy limiter. Fix: integrate OSRM or GraphHopper free-tier API for road-distance routing. Cost: ~$0 (self-hosted OSRM with Nigerian OSM data) or $50/mo (GraphHopper)." />
            <GapCard status="gap" isDark={isDark} title="No real-time driver supply data" detail="We model surge probabilistically (time-of-day + day-of-week). We have zero real-time supply signals. Our surge is a 'best guess,' not a live signal. Fix: This requires API partnerships (Phase 3 objective) or crowdsourced user reports." />
            <GapCard status="gap" isDark={isDark} title="No traffic-aware ETA" detail="We estimate travel time from distance and average speed (25 km/h city, 35 km/h highway). Lagos traffic can double travel time — and per-minute charges make this a major fare variable. Fix: Use a free traffic API or at minimum, adjust speed estimates by time-of-day." />
            <GapCard status="gap" isDark={isDark} title="Static rate calibration" detail="Our rates are manually calibrated from public reports. They can become stale if Bolt raises rates 10% and we don't update for weeks. Fix: Build a user fare-reporting pipeline (crowdsource) and auto-adjust rates based on incoming data." />
          </div>

          <div className="mt-5 space-y-2">
            <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Optimization opportunities:</h3>
            <GapCard status="opportunity" isDark={isDark} title="OSRM integration (zero cost)" detail="Self-host OSRM with Nigerian OpenStreetMap data. This gives us real road distance and realistic ETAs. Would improve accuracy by an estimated 20–35% for inner-city trips where road-to-Haversine ratio is highest." />
            <GapCard status="opportunity" isDark={isDark} title="Crowdsourced fare calibration" detail="Add a 'Report your actual fare' feature post-deep-link. If 5% of users report, we get ~200 data points/week at 4,000 weekly users. ML model can auto-adjust coefficients per service/city/route. This creates a moat no competitor can easily replicate." />
            <GapCard status="opportunity" isDark={isDark} title="Historical O-D pair caching" detail="Cache fare estimates for popular routes (top 500 O-D pairs). When a user searches Lagos→Ikeja, show cached recent estimates alongside live calculations. This gives 'pseudo-real-time' accuracy with zero API cost." />
            <GapCard status="opportunity" isDark={isDark} title="Upfront price display advantage" detail="Even Bolt/Uber don't show their upfront price in marketing — you only see it inside the app. We can show estimated ranges BEFORE the user opens any app. That's our core UX advantage: pre-booking price intelligence." />
          </div>
        </Section>

        {/* ─── 7. ACCURACY ROADMAP ─── */}
        <Section title="7. Accuracy Improvement Roadmap" isDark={isDark}>
          <div className="space-y-4">
            {[
              { phase: 'Now', label: 'Model-based estimation', accuracy: '65–75%', detail: 'Haversine + calibrated rates + probabilistic surge. Good enough to demonstrate value and build user base. Transparent about limitations via confidence scores.', color: 'bg-yellow-500' },
              { phase: 'Month 2', label: '+ OSRM road routing', accuracy: '78–85%', detail: 'Replace Haversine with actual road distance. Self-hosted OSRM is free. Single biggest accuracy improvement available to us.', color: 'bg-blue-500' },
              { phase: 'Month 4', label: '+ Crowdsource calibration', accuracy: '82–90%', detail: 'User fare reports auto-adjust our rate coefficients. 200+ data points/week creates a self-improving model. Each report makes every future estimate more accurate.', color: 'bg-green-500' },
              { phase: 'Month 7+', label: '+ API partnerships', accuracy: '92–98%', detail: 'Real-time pricing from Bolt/Uber APIs. This is the endgame but requires traction first. With APIs, our estimates match what users see inside the app within ±3%.', color: 'bg-purple-500' },
            ].map((p, i) => (
              <motion.div key={i} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 + i * 0.08 }}
                className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-2 h-2 rounded-full ${p.color}`} />
                  <span className={`text-xs font-semibold uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{p.phase}</span>
                  <span className={`text-xs ml-auto px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>{p.accuracy} accuracy</span>
                </div>
                <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{p.label}</p>
                <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{p.detail}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ─── 8. UNIQUE VALUE PROPS ─── */}
        <Section title="8. Our Unique Value Propositions (vs. Using Bolt Directly)" isDark={isDark}>
          <div className={`p-5 rounded-xl space-y-4 text-sm ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'}`}>
            <div>
              <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>1. Pre-booking price intelligence</p>
              <p className="mt-1">Users see comparative pricing <strong>before opening any ride app</strong>. This is information that doesn't exist anywhere else. Google Maps shows 2 services. We show 16. The user walks into Bolt already knowing it's the cheapest for their route — that's informed demand, which Bolt benefits from (higher booking completion rate).</p>
            </div>
            <div>
              <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>2. Cross-platform comparison creates switching behavior</p>
              <p className="mt-1">A Bolt-only user never checks Uber. A RideChecka user checks all 16 and picks the cheapest. If Bolt is cheapest for 60% of routes, we <em>prove</em> that to users, making them more loyal to Bolt on those routes. This is data Bolt can't surface themselves (they won't show Uber's price).</p>
            </div>
            <div>
              <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>3. Demand signal aggregation</p>
              <p className="mt-1">Every search on RideChecka is a ride intent signal: origin, destination, time. Aggregated, this is a demand heatmap that's service-agnostic. Bolt can see where <em>all</em> ride demand exists, not just the trips that land in their app. That's market intelligence worth paying for.</p>
            </div>
            <div>
              <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>4. Fairness transparency builds trust ecosystem-wide</p>
              <p className="mt-1">When users see that Bolt's surge is "only 1.3×" while Uber is at "1.8×," they perceive Bolt as fairer. We create a <em>visible competitive pressure</em> that keeps all services honest. This benefits the entire ecosystem — riders, drivers, and services that price fairly.</p>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className={`text-[10px] ${isDark ? 'text-gray-700' : 'text-gray-400'}`}>
            Fare Analysis v1.0 — Last updated February 2026 — Confidential
          </p>
        </div>
      </div>
    </div>
  );
}
