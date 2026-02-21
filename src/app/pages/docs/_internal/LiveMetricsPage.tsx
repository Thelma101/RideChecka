// Live Metrics Strategy — Ensuring Real-Time Accuracy & Reliability
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
    <div className="mb-5">
      <h3 className="text-gray-800 dark:text-gray-200 mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>{title}</h3>
      {children}
    </div>
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
          <span className="text-cyan-500 mt-1 flex-shrink-0">•</span>
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

function MetricCard({ value, label, sub, color }: { value: string; label: string; sub: string; color: string }) {
  return (
    <div className={`rounded-xl p-3 border ${color}`}>
      <p className="text-gray-900 dark:text-white" style={{ fontSize: '20px', fontWeight: 700 }}>{value}</p>
      <p className="text-xs text-gray-700 dark:text-gray-300 mt-0.5" style={{ fontWeight: 600 }}>{label}</p>
      <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{sub}</p>
    </div>
  );
}

export function LiveMetricsPage() {
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
            <h1 className="text-gray-900 dark:text-white" style={{ fontSize: '16px', fontWeight: 600 }}>Live Metrics Strategy</h1>
            <p className="text-[11px] text-gray-400">Real-Time Accuracy & Reliability — v1.0</p>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 py-6 max-w-2xl mx-auto">
        {/* Title block */}
        <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-cyan-600 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">??</span>
            </div>
            <div>
              <h1 className="text-gray-900 dark:text-white" style={{ fontSize: '22px', fontWeight: 700 }}>Live Metrics Strategy</h1>
              <p className="text-sm text-gray-500">Ensuring Real-Time Accuracy & Reliability</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <MetricCard value="99.9%" label="Data Accuracy" sub="Target SLA for all live metrics" color="border-green-100 dark:border-green-700/50 bg-green-50/50 dark:bg-green-900/10" />
            <MetricCard value="=500ms" label="Max Latency" sub="End-to-end pipeline latency" color="border-blue-200 dark:border-blue-800/50 bg-blue-50/50 dark:bg-blue-900/10" />
            <MetricCard value="0" label="Data Loss" sub="Zero loss during peak loads" color="border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-900/10" />
            <MetricCard value="=30s" label="Auto-Recovery" sub="Recovery time on failure" color="border-purple-200 dark:border-purple-800/50 bg-purple-50/50 dark:bg-purple-900/10" />
          </div>
        </div>

        {/* 1. Executive Summary */}
        <Section title="1. Executive Summary">
          <P>
            This document defines the comprehensive strategy for guaranteeing real-time accuracy and reliability of live metrics within the Ridechecka platform. As a ride-price aggregator comparing 50+ services, the integrity of our pricing data is the single most critical factor for user trust and product value.
          </P>
          <P>
            The strategy encompasses five pillars: a fault-tolerant data pipeline architecture, a multi-layer validation framework, a distributed monitoring infrastructure, a rigorous testing methodology, and clearly defined success criteria with automated enforcement.
          </P>
          <div className="bg-cyan-50 dark:bg-cyan-900/15 rounded-xl p-4 mb-4 border border-cyan-100 dark:border-cyan-800/30">
            <p className="text-cyan-800 dark:text-cyan-300 text-xs" style={{ fontWeight: 600 }}>CORE PRINCIPLE</p>
            <P>Every price shown to a user must be verifiably accurate within the last 60 seconds, or clearly marked as cached/stale with a timestamp. No silent inaccuracies.</P>
          </div>
        </Section>

        {/* 2. Data Pipeline Architecture */}
        <Section title="2. Data Pipeline Architecture">
          <SubSection title="2.1 Event-Driven Streaming Architecture">
            <P>
              The data ingestion pipeline uses an event-driven architecture with Apache Kafka as the central message broker for real-time data streaming. Each ride-hailing service API integration publishes price-update events to dedicated Kafka topics, enabling decoupled, parallel processing at scale.
            </P>
            <Code>{`+-----------------------------------------------------------------+
¦                   DATA INGESTION PIPELINE                       ¦
¦                                                                 ¦
¦  +------+ +------+ +------+ +------+ +------+                 ¦
¦  ¦ Uber ¦ ¦ Bolt ¦ ¦inDrv ¦ ¦Gokada¦ ¦ MAX  ¦  ... (50+)      ¦
¦  ¦ API  ¦ ¦ API  ¦ ¦ API  ¦ ¦ API  ¦ ¦ API  ¦                 ¦
¦  +------+ +------+ +------+ +------+ +------+                 ¦
¦     ¦        ¦        ¦        ¦        ¦                       ¦
¦  +---------------------------------------------------------+   ¦
¦  ¦              ADAPTER LAYER (Edge Functions)               ¦   ¦
¦  ¦  • Rate limiting per provider  • Response normalization   ¦   ¦
¦  ¦  • Error handling & retries    • Schema transformation    ¦   ¦
¦  +---------------------------------------------------------+   ¦
¦                         ¦                                       ¦
¦  +---------------------------------------------------------+   ¦
¦  ¦           APACHE KAFKA CLUSTER (3 brokers)               ¦   ¦
¦  ¦                                                          ¦   ¦
¦  ¦  Topics:                                                 ¦   ¦
¦  ¦  +-- ridechecka.prices.raw     (partitioned by route)    ¦   ¦
¦  ¦  +-- ridechecka.prices.valid   (validated events)        ¦   ¦
¦  ¦  +-- ridechecka.prices.anomaly (flagged events)          ¦   ¦
¦  ¦  +-- ridechecka.prices.dlq     (dead-letter queue)       ¦   ¦
¦  ¦  +-- ridechecka.metrics.system (pipeline health)         ¦   ¦
¦  ¦                                                          ¦   ¦
¦  ¦  Config: replication-factor=3, min.insync.replicas=2     ¦   ¦
¦  ¦  Retention: 7 days raw, 30 days validated                ¦   ¦
¦  +---------------------------------------------------------+   ¦
¦                         ¦                                       ¦
¦  +---------------------------------------------------------+   ¦
¦  ¦         STREAM PROCESSING (Kafka Streams / Flink)        ¦   ¦
¦  ¦                                                          ¦   ¦
¦  ¦  +-- Validation Processor     ? prices.valid             ¦   ¦
¦  ¦  +-- Anomaly Detector         ? prices.anomaly           ¦   ¦
¦  ¦  +-- Aggregation Processor    ? price summaries          ¦   ¦
¦  ¦  +-- Cache Writer             ? Redis (sub-100ms reads)  ¦   ¦
¦  +---------------------------------------------------------+   ¦
¦                         ¦                                       ¦
¦  +---------------------------------------------------------+   ¦
¦  ¦ Redis    ¦  PostgreSQL           ¦  S3 (Data Lake)      ¦   ¦
¦  ¦ (Cache)  ¦  (Persistent Store)   ¦  (Historical/ML)     ¦   ¦
¦  +----------+-----------------------+----------------------+   ¦
+-----------------------------------------------------------------+`}</Code>
          </SubSection>

          <SubSection title="2.2 Exactly-Once Processing Semantics">
            <P>
              To prevent duplicate or lost events, the pipeline implements exactly-once semantics across the entire data path:
            </P>
            <Table
              headers={['Layer', 'Mechanism', 'Implementation']}
              rows={[
                ['Producer', 'Idempotent producers', 'enable.idempotence=true, max.in.flight.requests=5, acks=all'],
                ['Broker', 'Transactional messaging', 'transactional.id per adapter, isolation.level=read_committed'],
                ['Consumer', 'Exactly-once consumer', 'Consumer group offsets committed within Kafka transactions'],
                ['Database', 'Idempotent writes', 'UPSERT with event_id deduplication key, last_updated timestamp'],
                ['Cache', 'Compare-and-set', 'Redis WATCH/MULTI/EXEC for atomic cache updates with version checks'],
              ]}
            />
          </SubSection>

          <SubSection title="2.3 Failover & Redundancy">
            <UL items={[
              'Kafka cluster: 3 brokers across 2 availability zones, replication factor 3, ISR minimum 2',
              'Stream processors: Active-passive deployment with automatic leader election (< 5s failover)',
              'Redis: Sentinel-managed cluster with 1 master + 2 replicas, automatic failover < 10s',
              'PostgreSQL: Primary + streaming replica with automatic promotion via Patroni',
              'Dead-letter queue (DLQ): All failed events routed to ridechecka.prices.dlq with full context for manual replay',
              'Backpressure handling: Kafka consumer lag monitoring triggers auto-scaling of stream processors',
            ]} />
          </SubSection>

          <SubSection title="2.4 Alternative: AWS Kinesis Configuration">
            <P>For AWS-native deployments, the equivalent architecture uses Kinesis Data Streams:</P>
            <Code>{`AWS Kinesis Configuration:
+-- Kinesis Data Stream: ridechecka-prices
¦   +-- Shard count: 10 (auto-scaling 5-50)
¦   +-- Retention: 168 hours (7 days)
¦   +-- Enhanced fan-out for sub-100ms reads
+-- Kinesis Data Analytics (Flink)
¦   +-- Validation application
¦   +-- Anomaly detection application
¦   +-- Aggregation application
+-- Kinesis Data Firehose
¦   +-- S3 delivery for data lake (Parquet format)
+-- DynamoDB
¦   +-- Price cache table (on-demand capacity)
¦   +-- Event dedup table (TTL: 24 hours)
+-- EventBridge
    +-- Dead-letter routing & alerting`}</Code>
          </SubSection>
        </Section>

        {/* 3. Data Validation Framework */}
        <Section title="3. Data Validation Framework">
          <P>
            The validation framework applies four layers of checks to every incoming price event before it reaches the user-facing cache. Each layer operates independently, and events must pass all layers to be promoted to the "valid" topic.
          </P>

          <SubSection title="3.1 Layer 1 — Schema Validation">
            <P>JSON Schema validation ensures structural correctness at ingestion time. Invalid events are immediately routed to the DLQ.</P>
            <Code>{`// JSON Schema for PriceEvent
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": [
    "event_id", "service_id", "route_id",
    "pickup", "destination", "price", "currency",
    "timestamp", "vehicle_type", "estimated_time"
  ],
  "properties": {
    "event_id":     { "type": "string", "format": "uuid" },
    "service_id":   { "type": "string", "enum": [
      "uber","bolt","indriver","gokada","rida",
      "oride","max","safeboda","taxify","lagride"
    ]},
    "route_id":     { "type": "string" },
    "pickup":       { "$ref": "#/$defs/Location" },
    "destination":  { "$ref": "#/$defs/Location" },
    "price":        { "type": "number", "minimum": 0, "maximum": 1000000 },
    "currency":     { "type": "string", "const": "NGN" },
    "timestamp":    { "type": "string", "format": "date-time" },
    "vehicle_type": { "type": "string" },
    "estimated_time": { "type": "string", "pattern": "^\\d+\\s?(min|h|m)" },
    "surge":        { "type": "number", "minimum": 1.0, "maximum": 5.0 },
    "discount":     { "type": "number", "minimum": 0 },
    "features":     { "type": "array", "items": { "type": "string" } }
  },
  "$defs": {
    "Location": {
      "type": "object",
      "required": ["address", "lat", "lng"],
      "properties": {
        "address": { "type": "string", "minLength": 3 },
        "lat":     { "type": "number", "minimum": 3.0, "maximum": 14.0 },
        "lng":     { "type": "number", "minimum": 2.0, "maximum": 15.0 }
      }
    }
  }
}`}</Code>
          </SubSection>

          <SubSection title="3.2 Layer 2 — Range & Consistency Checks">
            <Table
              headers={['Field', 'Validation Rule', 'Action on Failure']}
              rows={[
                ['GPS Coordinates', 'Latitude 3.0–14.0, Longitude 2.0–15.0 (Nigeria bounding box)', 'Reject ? DLQ'],
                ['Timestamp', 'Within ±60s of server time; not in future', 'Reject ? DLQ'],
                ['Price', '?50–?500,000 range; must be positive integer or float', 'Reject ? DLQ'],
                ['Surge Multiplier', '1.0x–5.0x; must be null or within range', 'Cap at 5.0x + flag'],
                ['Discount', 'Must be = 50% of base price; non-negative', 'Cap at 50% + flag'],
                ['Estimated Time', 'Must be between 1 min and 6 hours for intra-city', 'Reject ? DLQ'],
                ['Route Distance', 'Haversine distance must be 0.1km–200km for Nigerian cities', 'Reject ? DLQ'],
                ['Service Availability', 'Service ID must be in active-services registry', 'Reject ? DLQ'],
              ]}
            />
          </SubSection>

          <SubSection title="3.3 Layer 3 — Historical Baseline Cross-Reference">
            <P>Each incoming price is compared against a rolling baseline of historical prices for the same route and service:</P>
            <UL items={[
              'Baseline window: 7-day rolling average for same route + service + time-of-day (±1 hour)',
              'Tolerance threshold: ±40% of baseline is accepted without flagging',
              'Soft flag (40%–80% deviation): Event accepted but flagged for review; user sees "Price may vary" badge',
              'Hard reject (>80% deviation): Event quarantined for manual review; fallback to cached price',
              'New route handling: No baseline available ? skip this layer; build baseline from first 10 data points',
              'Baseline storage: PostgreSQL materialized view refreshed every 15 minutes; Redis hot cache for active routes',
            ]} />
          </SubSection>

          <SubSection title="3.4 Layer 4 — Statistical Anomaly Detection">
            <P>Two complementary anomaly detection models run in parallel:</P>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-2" style={{ fontWeight: 600 }}>Model A: 3-Sigma Rule (Parametric)</p>
              <UL items={[
                'Compute µ (mean) and s (std deviation) from 30-day sliding window per route-service pair',
                'Flag any price outside µ ± 3s as a statistical outlier (99.7% confidence)',
                'Adaptive: Separate µ/s for peak hours (7–9am, 5–7pm) vs. off-peak',
                'Fast computation: Pre-computed in PostgreSQL, cached in Redis with 15-minute refresh',
              ]} />
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-2" style={{ fontWeight: 600 }}>Model B: Isolation Forest (Non-Parametric)</p>
              <UL items={[
                'Scikit-learn Isolation Forest trained on multi-dimensional feature space: [price, surge, time_of_day, day_of_week, distance, service_id_encoded]',
                'Contamination parameter: 0.02 (expect ~2% anomalies)',
                'Model retrained weekly on full historical dataset; deployed via MLflow',
                'Inference latency: < 10ms per event (model loaded in-memory on stream processor)',
                'Ensemble decision: Both models must flag an event for hard rejection; single flag = soft warning',
              ]} />
            </div>

            <SubSection title="Validation Pipeline Summary">
              <Code>{`Event Flow Through Validation Layers:

  Raw Event
      ¦
      ?
  +-----------------+
  ¦  L1: Schema      ¦---- FAIL --? DLQ (immediate)
  ¦  Validation      ¦
  +-----------------+
           ¦ PASS
           ?
  +-----------------+
  ¦  L2: Range &     ¦---- FAIL --? DLQ (with context)
  ¦  Consistency     ¦
  +-----------------+
           ¦ PASS
           ?
  +-----------------+
  ¦  L3: Historical  ¦---- SOFT FLAG --? Accept + badge
  ¦  Baseline        ¦---- HARD REJECT ? Quarantine
  +-----------------+
           ¦ PASS
           ?
  +-----------------+
  ¦  L4: Anomaly     ¦---- BOTH FLAG --? Quarantine
  ¦  Detection       ¦---- SINGLE FLAG ? Accept + warning
  +-----------------+
           ¦ PASS
           ?
  ? VALID EVENT ? Kafka prices.valid ? Redis cache ? User`}</Code>
            </SubSection>
          </SubSection>
        </Section>

        {/* 4. Monitoring Infrastructure */}
        <Section title="4. Monitoring Infrastructure">
          <SubSection title="4.1 Metrics Collection (Prometheus)">
            <P>Prometheus scrapes metrics from every component in the pipeline at 15-second intervals:</P>
            <Table
              headers={['Metric Name', 'Type', 'Description', 'Alert Threshold']}
              rows={[
                ['ridechecka_events_ingested_total', 'Counter', 'Total events received per service', 'Rate drop > 50% in 5m'],
                ['ridechecka_events_validated_total', 'Counter', 'Events passing all 4 validation layers', 'Ratio < 90% of ingested'],
                ['ridechecka_events_rejected_total', 'Counter', 'Events rejected at any layer', 'Rate spike > 20% in 5m'],
                ['ridechecka_pipeline_latency_ms', 'Histogram', 'End-to-end latency (ingest ? cache)', 'p99 > 500ms'],
                ['ridechecka_kafka_consumer_lag', 'Gauge', 'Consumer group lag per partition', 'Lag > 10,000 events'],
                ['ridechecka_cache_hit_ratio', 'Gauge', 'Redis cache hit rate', '< 85%'],
                ['ridechecka_api_response_time_ms', 'Histogram', 'External API call duration per service', 'p95 > 2000ms'],
                ['ridechecka_anomaly_score', 'Gauge', 'Average anomaly score from Isolation Forest', 'Score > 0.7 sustained 10m'],
                ['ridechecka_dlq_depth', 'Gauge', 'Events in dead-letter queue', '> 100 events'],
                ['ridechecka_service_availability', 'Gauge', 'Availability per ride-hailing service (0/1)', 'Any service down > 5m'],
              ]}
            />
          </SubSection>

          <SubSection title="4.2 Grafana Dashboards">
            <P>Four primary dashboards with configurable alert thresholds:</P>
            <Table
              headers={['Dashboard', 'Panels', 'Refresh Rate']}
              rows={[
                ['Pipeline Health', 'Throughput, latency heatmap, error rate, consumer lag, DLQ depth', '15s'],
                ['Data Quality', 'Validation pass/fail rates per layer, anomaly detections, baseline drift', '30s'],
                ['Service Status', 'Per-provider availability, response times, error rates, price freshness', '15s'],
                ['Business Metrics', 'Active users, comparisons/min, cache hit ratio, average savings, top routes', '60s'],
              ]}
            />
            <P>Alert routing: PagerDuty for P0/P1 alerts (pipeline down, data loss), Slack #ops channel for P2 (degraded performance), email digest for P3 (informational trends).</P>
          </SubSection>

          <SubSection title="4.3 Health Check Endpoints">
            <P>Every microservice exposes standardized health check endpoints:</P>
            <Code>{`GET /health         ? Overall service health
GET /health/live    ? Kubernetes liveness probe (is the process alive?)
GET /health/ready   ? Kubernetes readiness probe (can it serve traffic?)
GET /health/startup ? Startup probe (has initialization completed?)

Response format:
{
  "status": "healthy" | "degraded" | "unhealthy",
  "timestamp": "2026-02-20T14:30:00Z",
  "version": "2.0.0",
  "uptime_seconds": 86400,
  "checks": {
    "kafka_connection": { "status": "healthy", "latency_ms": 3 },
    "redis_connection": { "status": "healthy", "latency_ms": 1 },
    "postgres_connection": { "status": "healthy", "latency_ms": 5 },
    "external_apis": {
      "uber": { "status": "healthy", "last_success": "2s ago" },
      "bolt": { "status": "degraded", "last_success": "45s ago" },
      "indriver": { "status": "healthy", "last_success": "8s ago" }
    },
    "validation_pipeline": { "status": "healthy", "throughput_eps": 450 },
    "cache_freshness": { "status": "healthy", "oldest_entry_seconds": 28 }
  }
}`}</Code>
          </SubSection>

          <SubSection title="4.4 Circuit Breaker Patterns">
            <P>Circuit breakers prevent cascading failures when external services degrade:</P>
            <Table
              headers={['Component', 'Closed ? Open Trigger', 'Half-Open Test', 'Recovery']}
              rows={[
                ['External API Adapter', '5 consecutive failures or 50% error rate in 60s', '1 request every 30s', 'Close after 3 consecutive successes'],
                ['Validation Pipeline', 'Processing latency > 2s for 10 consecutive events', '1 event every 15s', 'Close after 5 events processed < 500ms'],
                ['Cache Writer', 'Redis connection timeout > 5s or 3 write failures', '1 write every 10s', 'Close after 3 successful writes'],
                ['Database Writer', 'PostgreSQL connection failure or query timeout > 10s', '1 query every 20s', 'Close after 2 successful queries'],
              ]}
            />
            <P>Fallback behavior: When a circuit is OPEN, the component uses the last known good data from Redis cache and marks prices as "cached" in the UI. User sees a subtle "Prices may be slightly stale" indicator.</P>
          </SubSection>
        </Section>

        {/* 5. Testing Requirements */}
        <Section title="5. Testing Requirements">
          <SubSection title="5.1 Load Testing">
            <P>Simulate production-scale traffic to validate pipeline capacity:</P>
            <Table
              headers={['Test Scenario', 'Configuration', 'Success Criteria']}
              rows={[
                ['Baseline Load', '1,000 events/sec sustained for 1 hour', 'p99 latency < 300ms, 0 data loss'],
                ['Peak Load', '10,000 events/sec sustained for 15 minutes', 'p99 latency < 500ms, 0 data loss'],
                ['Burst Load', '50,000 events in 10 seconds, then 0', 'All events processed within 60s, 0 data loss'],
                ['Gradual Ramp', '100 ? 10,000 events/sec over 30 minutes', 'Auto-scaling triggers correctly, no manual intervention'],
                ['Sustained Soak', '5,000 events/sec for 24 hours', 'No memory leaks, stable latency, disk usage < 80%'],
              ]}
            />
            <P>Tools: Apache JMeter for API load, custom Kafka producer for stream load, Gatling for WebSocket load testing.</P>
          </SubSection>

          <SubSection title="5.2 Chaos Engineering">
            <P>Inject failures to verify system resilience and automatic recovery:</P>
            <Table
              headers={['Experiment', 'Failure Injection', 'Expected Behavior', 'Recovery Target']}
              rows={[
                ['Kafka Broker Kill', 'Terminate 1 of 3 brokers', 'No data loss, automatic partition rebalance', '< 15s'],
                ['Redis Failover', 'Kill Redis primary', 'Sentinel promotes replica, cache writes resume', '< 10s'],
                ['PostgreSQL Failover', 'Kill primary database', 'Patroni promotes standby, zero committed data loss', '< 30s'],
                ['Network Partition', 'Isolate stream processor from Kafka', 'Consumer lag grows, auto-reconnect on healing', '< 20s'],
                ['External API Timeout', 'Inject 30s latency on Uber API', 'Circuit breaker opens, fallback to cache', '< 5s'],
                ['Disk Full', 'Fill Kafka log volume to 95%', 'Log cleanup triggers, oldest segments purged', '< 60s'],
                ['CPU Saturation', '100% CPU on validation processor', 'Auto-scaling adds new instance, lag recovers', '< 120s'],
                ['DNS Failure', 'Block DNS resolution for external APIs', 'All circuits open, cached data served', '< 10s'],
              ]}
            />
            <P>Platform: LitmusChaos (Kubernetes-native) or Gremlin for managed chaos experiments. Run weekly in staging, monthly in production (during low-traffic windows).</P>
          </SubSection>

          <SubSection title="5.3 A/B Testing for Metric Accuracy">
            <P>Compare metric accuracy between pipeline versions:</P>
            <UL items={[
              'Shadow mode: New pipeline version processes same events in parallel with production; results compared but not served to users',
              'Accuracy scoring: For each event, compute absolute percentage error vs. ground truth (manual API check every 5 minutes)',
              'Statistical significance: Chi-squared test on error distributions; require p < 0.01 before promoting new version',
              'Canary deployment: Route 5% of traffic to new pipeline; monitor error rate for 24 hours before full rollout',
              'Rollback automation: If accuracy drops > 0.1% vs. baseline, automatic rollback within 60 seconds',
            ]} />
          </SubSection>

          <SubSection title="5.4 Automated Regression Tests">
            <P>CI/CD pipeline runs the following test suite on every commit:</P>
            <Table
              headers={['Test Category', 'Count', 'Scope', 'Run Time']}
              rows={[
                ['Schema validation unit tests', '150+', 'All valid/invalid JSON permutations', '< 10s'],
                ['Range check unit tests', '80+', 'Boundary conditions for all validated fields', '< 5s'],
                ['Anomaly model accuracy tests', '50+', 'Known anomalies detected, known normals passed', '< 30s'],
                ['Integration tests (Kafka)', '30+', 'End-to-end pipeline with embedded Kafka', '< 120s'],
                ['Integration tests (Redis)', '20+', 'Cache read/write consistency', '< 15s'],
                ['Contract tests (APIs)', '50+', 'External API response schema compliance', '< 30s'],
                ['Performance benchmarks', '10+', 'Latency regression detection (± 10%)', '< 300s'],
                ['Data quality smoke tests', '5', 'Live production sample validation', '< 60s'],
              ]}
            />
          </SubSection>
        </Section>

        {/* 6. Success Criteria */}
        <Section title="6. Success Criteria & SLAs">
          <SubSection title="6.1 Service Level Objectives (SLOs)">
            <Table
              headers={['Metric', 'SLO Target', 'Measurement', 'Error Budget']}
              rows={[
                ['Data Accuracy', '99.9%', 'Percentage of prices within ±5% of ground truth', '0.1% (43.8 min/month)'],
                ['End-to-End Latency', 'p99 = 500ms', 'Time from API response to user-visible cache', '1% of requests may exceed'],
                ['Data Completeness', '100% (zero loss)', 'All ingested events reach valid or DLQ', 'Zero tolerance'],
                ['Pipeline Availability', '99.95%', 'Healthy status on /health/ready endpoint', '21.9 min/month downtime'],
                ['Recovery Time', '= 30 seconds', 'Time from failure detection to service restoration', 'Measured per incident'],
                ['Cache Freshness', '= 60 seconds', 'Maximum age of any price in the user-facing cache', '95th percentile'],
              ]}
            />
          </SubSection>

          <SubSection title="6.2 Automated SLO Enforcement">
            <UL items={[
              'SLO burn-rate alerting: Alert when error budget consumption rate predicts exhaustion within 24 hours',
              'Automatic rollback: If data accuracy drops below 99.5% for 5 consecutive minutes, roll back last deployment',
              'Traffic shedding: If latency p99 exceeds 1s, begin shedding non-critical API calls (analytics, history)',
              'Stale data marking: If cache freshness exceeds 120s for any route, UI switches to "Prices updating..." state',
              'Weekly SLO report: Auto-generated report with compliance %, budget consumed, incidents, and trend analysis',
            ]} />
          </SubSection>

          <SubSection title="6.3 Incident Response Protocol">
            <Table
              headers={['Severity', 'Definition', 'Response Time', 'Escalation']}
              rows={[
                ['P0 — Critical', 'Data loss, pipeline down, accuracy < 95%', '5 minutes', 'CTO + entire eng team'],
                ['P1 — Major', 'Degraded accuracy (95–99%), latency > 1s, one service down', '15 minutes', 'On-call engineer + team lead'],
                ['P2 — Minor', 'Elevated anomaly rate, cache freshness > 120s, DLQ growing', '1 hour', 'On-call engineer'],
                ['P3 — Informational', 'Baseline drift, model accuracy declining, capacity approaching limits', 'Next business day', 'Engineering Slack channel'],
              ]}
            />
          </SubSection>
        </Section>

        {/* 7. Implementation Timeline */}
        <Section title="7. Implementation Timeline">
          <Table
            headers={['Phase', 'Duration', 'Deliverables']}
            rows={[
              ['Phase 1: Foundation', 'Weeks 1–2', 'Kafka cluster, adapter framework for 3 services (Uber, Bolt, inDriver), L1+L2 validation, Redis cache, basic Prometheus metrics'],
              ['Phase 2: Validation', 'Weeks 3–4', 'L3 historical baseline, L4 anomaly detection (3-sigma), circuit breakers, Grafana dashboards, health check endpoints'],
              ['Phase 3: Scale', 'Weeks 5–6', 'All 10 services integrated, Isolation Forest model, load testing suite, chaos engineering experiments, auto-scaling'],
              ['Phase 4: Production', 'Weeks 7–8', 'SLO enforcement automation, A/B testing framework, incident runbooks, on-call rotation, weekly SLO reporting, documentation'],
            ]}
          />
        </Section>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-600">Ridechecka Live Metrics Strategy v1.0 — Confidential</p>
          <p className="text-[10px] text-gray-300 dark:text-gray-700 mt-1">Last updated: February 20, 2026 — Use Ctrl/Cmd+P to print or save as PDF</p>
        </div>
      </motion.div>
    </div>
  );
}
