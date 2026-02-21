// Realistic Nigerian ride-hailing fare models (2025-2026)
// Rates updated for post-fuel-subsidy + naira devaluation inflation
// Sources: publicly advertised rates, user reports, in-app screenshots
//
// Each service has a base fare structure. Final price is:
//   price = baseFare + (perKm × distance) + (perMin × estimatedMinutes)
//   price = max(price, minFare)
//   price *= surgeFactor (time-of-day / demand)
//   price += booking fee (if any)
//
// All amounts in NGN (Nigerian Naira).

export interface FareModel {
  serviceId: string;
  name: string;
  logo: string;
  color: string;
  isLocal: boolean;
  /** one-time charge when ride starts */
  baseFare: number;
  /** charge per kilometre */
  perKm: number;
  /** charge per minute of travel */
  perMin: number;
  /** minimum fare (floor) */
  minFare: number;
  /** fixed booking / platform fee */
  bookingFee: number;
  /** vehicle categories offered */
  vehicleTypes: VehicleCategory[];
  /** typical features */
  features: string[];
  /** deep-link template (use {plat},{plng},{dlat},{dlng}) */
  deepLink: string;
  webUrl: string;
  playStore: string;
  appStore: string;
  /** cities where the service operates */
  cities: string[];
  /** whether the service uses bidding (inDriver-style) */
  isBidBased?: boolean;
  /**
   * Margin of error as a fraction (0.0 – 1.0).
   * e.g. 0.15 means the real fare could be ±15 % of the estimate.
   * Bid-based services and those with no user reports get a wider margin.
   */
  marginOfError: number;
  /** ISO date of when we last verified/updated the fare rates */
  lastCalibrated: string;
  /** Base confidence score (0–100) before crowdsource boost */
  baseConfidence: number;
  /** Service transport type — used for travel time estimation */
  serviceType: 'car' | 'bike' | 'bus';
}

export interface VehicleCategory {
  type: string;
  /** multiplier applied on top of the base fare model */
  multiplier: number;
}

// ── Fare models ─────────────────────────────────────────────────
export const FARE_MODELS: FareModel[] = [
  {
    serviceId: 'uber',
    name: 'Uber',
    logo: '🚗',
    color: '#000000',
    isLocal: false,
    serviceType: 'car',
    baseFare: 1000,
    perKm: 280,
    perMin: 50,
    minFare: 1500,
    bookingFee: 200,
    vehicleTypes: [
      { type: 'UberX', multiplier: 1.0 },
      { type: 'Uber Priority', multiplier: 1.15 },
      { type: 'Uber Select', multiplier: 1.35 },
      { type: 'UberXL', multiplier: 1.55 },
    ],
    features: ['AC', 'Card Payment', 'Split Fare', 'Safety features'],
    deepLink:
      'uber://?action=setPickup&pickup[latitude]={plat}&pickup[longitude]={plng}&dropoff[latitude]={dlat}&dropoff[longitude]={dlng}',
    webUrl: 'https://m.uber.com/looking',
    playStore: 'com.ubercab',
    appStore: 'id368677368',
    cities: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Benin City'],
    marginOfError: 0.15,
    lastCalibrated: '2026-02-21',
    baseConfidence: 65,
  },
  {
    serviceId: 'bolt',
    name: 'Bolt',
    logo: '⚡',
    color: '#34D186',
    isLocal: false,
    serviceType: 'car',
    baseFare: 800,
    perKm: 220,
    perMin: 35,
    minFare: 1200,
    bookingFee: 150,
    vehicleTypes: [
      { type: 'Bolt Basic', multiplier: 0.55 },
      { type: 'Bolt', multiplier: 1.0 },
      { type: 'Bolt Comfort', multiplier: 1.3 },
      { type: 'Bolt XL', multiplier: 1.5 },
    ],
    features: ['AC', 'Card Payment', 'Split Fare', 'In-app tipping'],
    deepLink:
      'bolt://ride?pickup_lat={plat}&pickup_lng={plng}&dest_lat={dlat}&dest_lng={dlng}',
    webUrl: 'https://bolt.eu',
    playStore: 'ee.mtakso.client',
    appStore: 'id675033630',
    cities: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Benin City', 'Kano', 'Enugu'],
    marginOfError: 0.15,
    lastCalibrated: '2026-02-21',
    baseConfidence: 68,
  },
  {
    serviceId: 'indriver',
    name: 'inDriver',
    logo: '🚕',
    color: '#FF6B35',
    isLocal: false,
    serviceType: 'car',
    baseFare: 0,
    perKm: 200,
    perMin: 28,
    minFare: 1000,
    bookingFee: 0,
    isBidBased: true,
    vehicleTypes: [
      { type: 'Economy', multiplier: 1.0 },
      { type: 'Comfort', multiplier: 1.25 },
    ],
    features: ['Negotiate price', 'Cash payment', 'Choose driver'],
    deepLink: 'indriver://ride',
    webUrl: 'https://indriver.com',
    playStore: 'sinet.startup.inDriver',
    appStore: 'id1050765564',
    cities: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano'],
    marginOfError: 0.30,
    lastCalibrated: '2026-02-21',
    baseConfidence: 35,
  },
  {
    serviceId: 'yango',
    name: 'Yango',
    logo: '🚖',
    color: '#FC3F1D',
    isLocal: false,
    serviceType: 'car',
    baseFare: 700,
    perKm: 210,
    perMin: 32,
    minFare: 1100,
    bookingFee: 100,
    vehicleTypes: [
      { type: 'Economy', multiplier: 1.0 },
      { type: 'Comfort', multiplier: 1.3 },
    ],
    features: ['AC', 'Card Payment', 'Fixed price'],
    deepLink: 'yandextaxi://route?end-lat={dlat}&end-lon={dlng}',
    webUrl: 'https://yango.com',
    playStore: 'com.yandex.yango',
    appStore: 'id1437682498',
    cities: ['Lagos', 'Abuja'],
    marginOfError: 0.18,
    lastCalibrated: '2026-02-21',
    baseConfidence: 58,
  },
  {
    serviceId: 'lyft',
    name: 'Lyft',
    logo: '🚙',
    color: '#FF00BF',
    isLocal: false,
    serviceType: 'car',
    baseFare: 1100,
    perKm: 300,
    perMin: 55,
    minFare: 1600,
    bookingFee: 200,
    vehicleTypes: [
      { type: 'Lyft', multiplier: 1.0 },
      { type: 'Lyft XL', multiplier: 1.5 },
    ],
    features: ['AC', 'Card Payment', 'In-app tipping'],
    deepLink:
      'lyft://ridetype?id=lyft&pickup[latitude]={plat}&pickup[longitude]={plng}&destination[latitude]={dlat}&destination[longitude]={dlng}',
    webUrl: 'https://www.lyft.com',
    playStore: 'me.lyft.android',
    appStore: 'id529379082',
    cities: ['Lagos'],
    marginOfError: 0.20,
    lastCalibrated: '2026-02-21',
    baseConfidence: 45,
  },
  {
    serviceId: 'gokada',
    name: 'Gokada',
    logo: '🏍️',
    color: '#00C853',
    isLocal: true,
    serviceType: 'bike',
    baseFare: 400,
    perKm: 140,
    perMin: 18,
    minFare: 800,
    bookingFee: 100,
    vehicleTypes: [
      { type: 'Bike', multiplier: 1.0 },
    ],
    features: ['Helmet provided', 'Fast in traffic', 'Cash/Card'],
    deepLink: '',
    webUrl: 'https://gokada.ng',
    playStore: 'com.gokada.android',
    appStore: '',
    cities: ['Lagos'],
    marginOfError: 0.22,
    lastCalibrated: '2026-02-21',
    baseConfidence: 42,
  },
  {
    serviceId: 'rida',
    name: 'Rida',
    logo: '🛵',
    color: '#FF5722',
    isLocal: true,
    serviceType: 'car',
    baseFare: 550,
    perKm: 165,
    perMin: 25,
    minFare: 900,
    bookingFee: 0,
    vehicleTypes: [
      { type: 'Economy', multiplier: 1.0 },
      { type: 'Comfort', multiplier: 1.2 },
    ],
    features: ['Cash payment', 'AC'],
    deepLink: '',
    webUrl: 'https://rfrfrida.com',
    playStore: 'com.rfrfrida.rider',
    appStore: '',
    cities: ['Lagos', 'Abuja'],
    marginOfError: 0.28,
    lastCalibrated: '2026-02-21',
    baseConfidence: 35,
  },
  {
    serviceId: 'oride',
    name: 'ORide',
    logo: '🏍️',
    color: '#FFA726',
    isLocal: true,
    serviceType: 'bike',
    baseFare: 300,
    perKm: 120,
    perMin: 16,
    minFare: 600,
    bookingFee: 0,
    vehicleTypes: [
      { type: 'Bike', multiplier: 1.0 },
    ],
    features: ['Helmet provided', 'Cheap rides', 'Cash'],
    deepLink: '',
    webUrl: 'https://oride.ng',
    playStore: 'com.oride.ng',
    appStore: '',
    cities: ['Lagos', 'Ibadan'],
    marginOfError: 0.28,
    lastCalibrated: '2026-02-21',
    baseConfidence: 30,
  },
  {
    serviceId: 'max',
    name: 'MAX',
    logo: '🛵',
    color: '#1976D2',
    isLocal: true,
    serviceType: 'bike',
    baseFare: 500,
    perKm: 150,
    perMin: 20,
    minFare: 750,
    bookingFee: 100,
    vehicleTypes: [
      { type: 'Bike', multiplier: 1.0 },
      { type: 'Tricycle', multiplier: 1.3 },
    ],
    features: ['Helmet provided', 'GPS tracked', 'Trained drivers'],
    deepLink: '',
    webUrl: 'https://www.max.ng',
    playStore: 'ng.max.rider',
    appStore: 'id1504977744',
    cities: ['Lagos', 'Abuja', 'Ibadan'],
    marginOfError: 0.20,
    lastCalibrated: '2026-02-21',
    baseConfidence: 45,
  },
  {
    serviceId: 'safeboda',
    name: 'SafeBoda',
    logo: '🏍️',
    color: '#E91E63',
    isLocal: true,
    serviceType: 'bike',
    baseFare: 300,
    perKm: 110,
    perMin: 15,
    minFare: 600,
    bookingFee: 0,
    vehicleTypes: [
      { type: 'Boda', multiplier: 1.0 },
    ],
    features: ['Helmet provided', 'Background-checked drivers', 'Cheap'],
    deepLink: '',
    webUrl: 'https://safeboda.com',
    playStore: 'com.safeboda',
    appStore: 'id1047498482',
    cities: ['Lagos', 'Ibadan'],
    marginOfError: 0.25,
    lastCalibrated: '2026-02-21',
    baseConfidence: 35,
  },
  {
    serviceId: 'taxify',
    name: 'Taxify',
    logo: '🚗',
    color: '#9C27B0',
    isLocal: false,
    serviceType: 'car',
    baseFare: 800,
    perKm: 220,
    perMin: 35,
    minFare: 1200,
    bookingFee: 150,
    vehicleTypes: [
      { type: 'Economy', multiplier: 1.0 },
      { type: 'Comfort', multiplier: 1.3 },
    ],
    features: ['AC', 'Card Payment', 'Split Fare'],
    deepLink: '',
    webUrl: 'https://bolt.eu',
    playStore: 'ee.mtakso.client',
    appStore: 'id675033630',
    cities: ['Lagos', 'Abuja', 'Port Harcourt'],
    marginOfError: 0.15,
    lastCalibrated: '2026-02-21',
    baseConfidence: 60,
  },
  {
    serviceId: 'lagride',
    name: 'LagRide',
    logo: '🚗',
    color: '#00BCD4',
    isLocal: true,
    serviceType: 'car',
    baseFare: 850,
    perKm: 200,
    perMin: 30,
    minFare: 1100,
    bookingFee: 0,
    vehicleTypes: [
      { type: 'Sedan', multiplier: 1.0 },
    ],
    features: ['AC', 'Government regulated', 'Metered'],
    deepLink: '',
    webUrl: 'https://lagride.ng',
    playStore: 'ng.gov.lagride',
    appStore: '',
    cities: ['Lagos'],
    marginOfError: 0.18,
    lastCalibrated: '2026-02-21',
    baseConfidence: 55,
  },
  {
    serviceId: 'shuttlers',
    name: 'Shuttlers',
    logo: '🚌',
    color: '#3F51B5',
    isLocal: true,
    serviceType: 'bus',
    baseFare: 1200,
    perKm: 70,
    perMin: 10,
    minFare: 1800,
    bookingFee: 0,
    vehicleTypes: [
      { type: 'Bus (shared)', multiplier: 1.0 },
    ],
    features: ['AC Bus', 'WiFi', 'Seat reservation', 'Scheduled routes'],
    deepLink: '',
    webUrl: 'https://shuttlers.ng',
    playStore: 'ng.shuttlers.commute',
    appStore: 'id1505605498',
    cities: ['Lagos', 'Abuja'],
    marginOfError: 0.22,
    lastCalibrated: '2026-02-21',
    baseConfidence: 42,
  },
  {
    serviceId: 'treepz',
    name: 'Treepz',
    logo: '🚐',
    color: '#00897B',
    isLocal: true,
    serviceType: 'bus',
    baseFare: 2000,
    perKm: 55,
    perMin: 8,
    minFare: 2500,
    bookingFee: 200,
    vehicleTypes: [
      { type: 'Shuttle (shared)', multiplier: 1.0 },
      { type: 'Charter', multiplier: 2.5 },
    ],
    features: ['AC', 'Intercity routes', 'Seat reservation', 'Luggage space'],
    deepLink: '',
    webUrl: 'https://treepz.com',
    playStore: 'com.treepz.app',
    appStore: 'id1524533498',
    cities: ['Lagos', 'Abuja', 'Ibadan', 'Enugu', 'Port Harcourt'],
    marginOfError: 0.25,
    lastCalibrated: '2026-02-21',
    baseConfidence: 38,
  },
  {
    serviceId: 'moove',
    name: 'Moove',
    logo: '🚘',
    color: '#FF7043',
    isLocal: true,
    serviceType: 'car',
    baseFare: 750,
    perKm: 195,
    perMin: 30,
    minFare: 1100,
    bookingFee: 100,
    vehicleTypes: [
      { type: 'Economy', multiplier: 1.0 },
      { type: 'Comfort', multiplier: 1.25 },
    ],
    features: ['AC', 'New vehicles', 'Card Payment'],
    deepLink: '',
    webUrl: 'https://moove.africa',
    playStore: 'africa.moove.driver',
    appStore: '',
    cities: ['Lagos', 'Abuja'],
    marginOfError: 0.22,
    lastCalibrated: '2026-02-21',
    baseConfidence: 40,
  },
  {
    serviceId: 'littlecab',
    name: 'Little Cab',
    logo: '🚕',
    color: '#4CAF50',
    isLocal: false,
    serviceType: 'car',
    baseFare: 650,
    perKm: 200,
    perMin: 32,
    minFare: 1000,
    bookingFee: 100,
    vehicleTypes: [
      { type: 'Economy', multiplier: 1.0 },
      { type: 'Business', multiplier: 1.4 },
    ],
    features: ['AC', 'Card Payment', 'Corporate accounts'],
    deepLink: '',
    webUrl: 'https://littlecab.com',
    playStore: 'com.littlecab.rider',
    appStore: '',
    cities: ['Lagos', 'Abuja'],
    marginOfError: 0.25,
    lastCalibrated: '2026-02-21',
    baseConfidence: 35,
  },
];

// ── Surge calculation (time-of-day / day-of-week) ─────────────
export interface SurgeInfo {
  multiplier: number;
  reason: string | null;
}

/**
 * Calculates a realistic surge multiplier based on the current time.
 * Each service gets a slightly different surge to simulate independent demand.
 */
export function calculateSurge(serviceId: string): SurgeInfo {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0 = Sunday
  const isWeekend = day === 0 || day === 6;

  // Seed a deterministic-ish per-service jitter so services don't all surge identically
  let seed = 0;
  for (let i = 0; i < serviceId.length; i++) seed += serviceId.charCodeAt(i);
  const jitter = 0.9 + ((seed % 20) / 100); // 0.90 – 1.09

  let multiplier = 1.0;
  let reason: string | null = null;

  // Morning rush: 7 AM – 9 AM weekdays
  if (!isWeekend && hour >= 7 && hour < 9) {
    multiplier = 1.2 + ((seed % 10) / 25); // 1.20 – 1.56
    reason = 'Morning rush hour';
  }
  // Evening rush: 5 PM – 8 PM weekdays
  else if (!isWeekend && hour >= 17 && hour < 20) {
    multiplier = 1.3 + ((seed % 10) / 20); // 1.30 – 1.75
    reason = 'Evening rush hour';
  }
  // Late night: 11 PM – 5 AM
  else if (hour >= 23 || hour < 5) {
    multiplier = 1.2 + ((seed % 10) / 30); // 1.20 – 1.53
    reason = 'Late-night surcharge';
  }
  // Weekend evening
  else if (isWeekend && hour >= 18 && hour < 23) {
    multiplier = 1.15 + ((seed % 10) / 30);
    reason = 'Weekend evening demand';
  }

  multiplier = Math.round(multiplier * jitter * 100) / 100;

  // Cap at 2.5×
  if (multiplier > 2.5) multiplier = 2.5;
  // Floor at 1.0
  if (multiplier < 1.0) multiplier = 1.0;

  return { multiplier: multiplier === 1 ? 1 : multiplier, reason };
}

// ── City-specific price adjustments ─────────────────────────────
const CITY_ADJUSTMENTS: Record<string, number> = {
  'lagos': 1.0,
  'abuja': 1.05,
  'port harcourt': 0.92,
  'ibadan': 0.85,
  'kano': 0.80,
  'enugu': 0.88,
  'benin city': 0.87,
  'calabar': 0.83,
  'kaduna': 0.82,
  'owerri': 0.84,
};

/** Returns a multiplier for the given city (defaults to 1.0) */
export function getCityAdjustment(cityOrState: string): number {
  const lower = (cityOrState || '').toLowerCase();
  for (const [city, adj] of Object.entries(CITY_ADJUSTMENTS)) {
    if (lower.includes(city)) return adj;
  }
  return 0.90; // default for smaller cities
}
