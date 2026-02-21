// Ride-hailing price comparison API — realistic fare-model pricing + Nominatim geocoding
import { PriceEstimate, Location } from '../types';
import {
  FARE_MODELS,
  calculateSurge,
  getCityAdjustment,
  type FareModel,
  type VehicleCategory,
} from './fareModels';
import { supabase, isSupabaseConfigured } from './supabase';
import { getAverageActualFare, getReportCount } from './fareReports';

// ── Helpers ─────────────────────────────────────────────────────
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Haversine distance in km */
function calculateDistance(a: Location, b: Location): number {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/** Travel time multiplier by service type — bikes weave through traffic, buses stop */
const SERVICE_TYPE_SPEED: Record<string, number> = {
  bike: 0.70,  // 30% faster than cars
  car: 1.0,    // baseline
  bus: 1.30,   // 30% slower (stops, fixed routes)
};

/** Estimated travel time given distance and service type */
function calculateEstimatedTime(
  distanceKm: number,
  serviceType: 'car' | 'bike' | 'bus' = 'car',
): { text: string; minutes: number } {
  const avgSpeed = distanceKm > 15 ? 35 : 25; // km/h
  const baseMinutes = Math.max(5, Math.ceil((distanceKm / avgSpeed) * 60));
  const multiplier = SERVICE_TYPE_SPEED[serviceType] ?? 1.0;
  const minutes = Math.max(3, Math.round(baseMinutes * multiplier));
  if (minutes < 60) return { text: `${minutes} min`, minutes };
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return { text: `${hrs}h ${mins}m`, minutes };
}

/** Best-guess city from an address string */
function detectCity(address: string): string {
  const lower = (address || '').toLowerCase();
  const cities = [
    'lagos',
    'abuja',
    'port harcourt',
    'ibadan',
    'kano',
    'enugu',
    'benin city',
    'calabar',
    'kaduna',
    'owerri',
  ];
  return cities.find((c) => lower.includes(c)) || 'lagos';
}

// ── Price calculation per service + vehicle category ────────────
function calculateServicePrice(
  model: FareModel,
  vehicle: VehicleCategory,
  distanceKm: number,
  travelMinutes: number,
  cityMultiplier: number,
): {
  price: number;
  priceLow: number;
  priceHigh: number;
  vehicleType: string;
  surge: number | undefined;
  discount: number | undefined;
  confidence: number;
  source: 'model' | 'api' | 'crowdsourced' | 'hybrid';
} {

  // Core fare
  let price =
    model.baseFare +
    model.perKm * distanceKm +
    model.perMin * travelMinutes +
    model.bookingFee;

  // Apply vehicle multiplier
  price *= vehicle.multiplier;

  // City adjustment
  price *= cityMultiplier;

  // Bid-based services (inDriver) — slightly wider variance
  if (model.isBidBased) {
    price *= 0.85 + Math.random() * 0.25;
  }

  // Surge
  const surgeInfo = calculateSurge(model.serviceId);
  if (surgeInfo.multiplier > 1) {
    price *= surgeInfo.multiplier;
  }

  // Floor
  price = Math.max(price, model.minFare);

  // Round to nearest ₦50
  price = Math.round(price / 50) * 50;

  // Calculate price range using margin of error
  const margin = model.marginOfError ?? 0.15;
  let priceLow = Math.round(price * (1 - margin) / 50) * 50;
  let priceHigh = Math.round(price * (1 + margin) / 50) * 50;
  priceLow = Math.max(priceLow, model.minFare);
  priceHigh = Math.max(priceHigh, price); // high is always >= mid

  // Base confidence from model
  let confidence = model.baseConfidence ?? 50;

  // Reduce confidence for longer distances (models are less reliable)
  if (distanceKm > 30) confidence = Math.max(20, confidence - 15);
  else if (distanceKm > 15) confidence = Math.max(25, confidence - 8);

  // Reduce confidence during surge
  if (surgeInfo.multiplier > 1) confidence = Math.max(15, confidence - 10);

  // Occasional discount
  let discount: number | undefined;
  const discountSeed = model.name.length + new Date().getMinutes();
  if (discountSeed % 10 === 0) {
    discount = Math.round(price * (0.1 + (discountSeed % 5) / 50));
  }

  return {
    price,
    priceLow,
    priceHigh,
    vehicleType: vehicle.type,
    surge: surgeInfo.multiplier > 1 ? surgeInfo.multiplier : undefined,
    discount,
    confidence,
    source: 'model',
  };
}

/** Route metadata returned alongside estimates */
export interface RouteInfo {
  distanceKm: number;
  estimatedTime: string;
  travelMinutes: number;
}

// ── Main pricing endpoint ───────────────────────────────────────
export async function fetchPriceEstimates(
  pickup: Location,
  destination: Location,
): Promise<{ estimates: PriceEstimate[]; routeInfo: RouteInfo }> {
  // Haversine gives straight-line distance; Lagos roads add ~35% on top
  const haversineKm = calculateDistance(pickup, destination);
  const distanceKm = Math.round(haversineKm * 1.35 * 100) / 100;
  // Use car baseline for the route-level ETA
  const { text: estimatedTime, minutes: travelMinutes } =
    calculateEstimatedTime(distanceKm, 'car');

  const city = detectCity(pickup.address) || detectCity(destination.address);
  const cityMultiplier = getCityAdjustment(city);

  // If Supabase is live, try fetching remote fare overrides
  let remoteFareOverrides: Record<string, Partial<FareModel>> | null = null;
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data } = await supabase
        .from('fare_overrides')
        .select(
          'service_id, base_fare, per_km, per_min, min_fare, booking_fee',
        )
        .limit(50);
      if (data && data.length) {
        remoteFareOverrides = {};
        for (const row of data) {
          remoteFareOverrides[row.service_id] = {
            baseFare: row.base_fare ?? undefined,
            perKm: row.per_km ?? undefined,
            perMin: row.per_min ?? undefined,
            minFare: row.min_fare ?? undefined,
            bookingFee: row.booking_fee ?? undefined,
          };
        }
      }
    } catch {
      // Supabase offline — fall through to local models
    }
  }

  // Small artificial delay so UI shows the loading state naturally
  await delay(150 + Math.random() * 250);

  const estimates: PriceEstimate[] = FARE_MODELS.flatMap((model) => {
    const hasRemoteOverride = !!remoteFareOverrides?.[model.serviceId];
    const m = hasRemoteOverride
      ? ({ ...model, ...remoteFareOverrides![model.serviceId] } as FareModel)
      : model;

    // Per-service travel time based on service type (bike/car/bus)
    const serviceEta = calculateEstimatedTime(distanceKm, m.serviceType);

    return m.vehicleTypes.map((vehicle) => {
      const { price, priceLow, priceHigh, vehicleType, surge, discount, confidence, source } =
        calculateServicePrice(m, vehicle, distanceKm, serviceEta.minutes, cityMultiplier);

      // Create a unique id: e.g. "uber-uberx", "uber-uber_comfort"
      const vehicleSlug = vehicle.type.toLowerCase().replace(/\s+/g, '_');
      const uniqueId = `${model.serviceId}-${vehicleSlug}`;

      return {
        serviceId: uniqueId,
        serviceName: model.name,
        logo: model.logo,
        color: model.color,
        price,
        priceLow,
        priceHigh,
        currency: 'NGN',
        estimatedTime: serviceEta.text,
        vehicleType,
        surge,
        features: model.features,
        discount,
        confidence,
        source: hasRemoteOverride ? ('hybrid' as const) : source,
        reportCount: 0,
        lastCalibrated: model.lastCalibrated,
        deepLink: model.deepLink
          ? model.deepLink
              .replace('{plat}', String(pickup.lat))
              .replace('{plng}', String(pickup.lng))
              .replace('{dlat}', String(destination.lat))
              .replace('{dlng}', String(destination.lng))
          : undefined,
        webUrl: model.webUrl || undefined,
        playStore: model.playStore
          ? `https://play.google.com/store/apps/details?id=${model.playStore}`
          : undefined,
        appStore: model.appStore
          ? `https://apps.apple.com/app/${model.appStore}`
          : undefined,
      };
    });
  });

  // ── Phase 3: Community report calibration ──────────────────────
  // Blend community-reported fares into model estimates:
  //   - If ≥3 reports exist within 2 km, weight community avg at 40%
  //   - If 1-2 reports, weight at 20%
  //   - Boost confidence score based on report count
  const calibrationPromises = estimates.map(async (est) => {
    try {
      const baseId = est.serviceId.split('-')[0];
      const [avgResult, count] = await Promise.all([
        getAverageActualFare(baseId, pickup.lat, pickup.lng, destination.lat, destination.lng, 2),
        getReportCount(baseId, pickup.lat, pickup.lng, destination.lat, destination.lng, 2),
      ]);

      est.reportCount = count;

      if (avgResult && avgResult.count >= 1) {
        const communityAvg = avgResult.average;
        // Weight: 40% community if ≥3 reports, 20% if 1-2
        const communityWeight = avgResult.count >= 3 ? 0.40 : 0.20;
        const modelWeight = 1 - communityWeight;

        est.price = Math.round(est.price * modelWeight + communityAvg * communityWeight);
        est.priceLow = Math.round(est.priceLow * modelWeight + (communityAvg * 0.85) * communityWeight);
        est.priceHigh = Math.round(est.priceHigh * modelWeight + (communityAvg * 1.15) * communityWeight);

        // Confidence boost: more reports = higher confidence (up to +20)
        const boost = Math.min(20, avgResult.count * 4);
        est.confidence = Math.min(95, est.confidence + boost);
        est.source = avgResult.count >= 3 ? 'crowdsourced' : 'hybrid';
      }
    } catch {
      // Report lookup failed — use model estimate as-is
    }
  });
  await Promise.all(calibrationPromises);

  // Persist the search to Supabase (fire & forget)
  if (isSupabaseConfigured() && supabase) {
    supabase
      .from('searches')
      .insert({
        pickup_address: pickup.address,
        pickup_lat: pickup.lat,
        pickup_lng: pickup.lng,
        dest_address: destination.address,
        dest_lat: destination.lat,
        dest_lng: destination.lng,
        distance_km: Math.round(distanceKm * 100) / 100,
        cheapest_service: estimates[0]?.serviceId?.split('-')[0],
        cheapest_price: estimates[0]?.price,
      })
      .then(() => {});
  }

  // Sort cheapest first
  return {
    estimates: estimates.sort((a, b) => a.price - b.price),
    routeInfo: { distanceKm, estimatedTime, travelMinutes },
  };
}

// ── Geocoding (unchanged — Nominatim + fallback) ────────────────
const FALLBACK_LOCATIONS: Location[] = [
  { address: 'Lagos Island, Lagos', lat: 6.4541, lng: 3.3947 },
  { address: 'Victoria Island, Lagos', lat: 6.4281, lng: 3.4219 },
  { address: 'Lekki Phase 1, Lagos', lat: 6.4474, lng: 3.4746 },
  { address: 'Ikeja, Lagos', lat: 6.5964, lng: 3.3469 },
  { address: 'Surulere, Lagos', lat: 6.4969, lng: 3.3539 },
  { address: 'Yaba, Lagos', lat: 6.5158, lng: 3.3711 },
  { address: 'Ikoyi, Lagos', lat: 6.4546, lng: 3.4325 },
  { address: 'Ajah, Lagos', lat: 6.4673, lng: 3.5716 },
  { address: 'Wuse 2, Abuja', lat: 9.0579, lng: 7.4951 },
  { address: 'Maitama, Abuja', lat: 9.082, lng: 7.4951 },
];

export async function searchLocations(query: string): Promise<Location[]> {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    const url =
      `https://nominatim.openstreetmap.org/search?` +
      `format=json&q=${encodeURIComponent(query)}&countrycodes=ng&limit=6&addressdetails=1`;

    const res = await fetch(url, {
      headers: { 'Accept-Language': 'en' },
    });

    if (!res.ok) throw new Error('Nominatim request failed');

    const data = await res.json();

    if (data.length === 0) {
      const lowerQuery = query.toLowerCase();
      return FALLBACK_LOCATIONS.filter((loc) =>
        loc.address.toLowerCase().includes(lowerQuery),
      ).slice(0, 5);
    }

    // Extract leading house number from user query (e.g. "15 kunle ogunba")
    const houseNumMatch = query.match(/^(\d+[a-zA-Z]?)\s+/);
    const userHouseNum = houseNumMatch ? houseNumMatch[1] : null;

    return data.map((item: any) => {
      const a = item.address || {};
      const parts: string[] = [];

      const houseNum = a.house_number || userHouseNum;
      if (houseNum) parts.push(houseNum);

      if (a.road) parts.push(a.road);
      else if (a.pedestrian) parts.push(a.pedestrian);

      const area = a.neighbourhood || a.city_district || a.suburb;
      if (area) parts.push(area);

      const city = a.city || a.town || a.state;
      if (city) parts.push(city);

      const address =
        parts.length >= 2
          ? parts.join(', ')
          : item.display_name
              .replace(', Nigeria', '')
              .split(',')
              .slice(0, 3)
              .join(',')
              .trim();

      return {
        address,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
      };
    });
  } catch {
    const lowerQuery = query.toLowerCase();
    return FALLBACK_LOCATIONS.filter((loc) =>
      loc.address.toLowerCase().includes(lowerQuery),
    ).slice(0, 5);
  }
}

// ── Reverse geocode (current location) ──────────────────────────
export async function getCurrentLocation(): Promise<Location> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            { headers: { 'Accept-Language': 'en' } },
          );
          if (res.ok) {
            const data = await res.json();
            const a = data.address || {};
            const parts: string[] = [];
            if (a.house_number) parts.push(a.house_number);
            if (a.road) parts.push(a.road);
            else if (a.pedestrian) parts.push(a.pedestrian);
            const area = a.neighbourhood || a.city_district || a.suburb;
            if (area) parts.push(area);
            const city = a.city || a.town || a.state;
            if (city) parts.push(city);
            const address =
              parts.length >= 2
                ? parts.join(', ')
                : data.display_name
                    ?.replace(', Nigeria', '')
                    .split(',')
                    .slice(0, 4)
                    .join(',')
                    .trim() ||
                  `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            resolve({ address, lat: latitude, lng: longitude });
          } else {
            resolve({
              address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
              lat: latitude,
              lng: longitude,
            });
          }
        } catch {
          resolve({
            address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            lat: latitude,
            lng: longitude,
          });
        }
      },
      (err) => {
        reject(
          new Error(
            err.code === 1
              ? 'Location permission denied. Please enable GPS.'
              : 'Unable to get current location.',
          ),
        );
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  });
}

// ── Geocoding cross-validation ──────────────────────────────────
// Deep links pass lat/lng coordinates, which are identical across all apps.
// However, displayed address text may differ (Nominatim ≠ Google Maps).
// This function cross-checks our Nominatim reverse-geocode against
// a secondary source (OpenStreetMap Photon) for confidence.

/**
 * Cross-validate an address by reverse-geocoding the same lat/lng via
 * a secondary geocoder (Photon). Returns the secondary address or null.
 */
export async function crossValidateAddress(
  lat: number,
  lng: number,
): Promise<string | null> {
  try {
    const url = `https://photon.komoot.io/reverse?lat=${lat}&lon=${lng}&limit=1&lang=en`;
    const res = await fetch(url);
    if (!res.ok) return null;

    const data = await res.json();
    const feature = data?.features?.[0]?.properties;
    if (!feature) return null;

    // Build a clean address from Photon result
    const parts: string[] = [];
    if (feature.housenumber) parts.push(feature.housenumber);
    if (feature.street) parts.push(feature.street);
    if (feature.district || feature.locality) {
      parts.push(feature.district || feature.locality);
    }
    if (feature.city || feature.state) {
      parts.push(feature.city || feature.state);
    }

    return parts.length >= 2 ? parts.join(', ') : feature.name || null;
  } catch {
    return null;
  }
}

/**
 * Returns an address integrity note if the two geocoders disagree significantly.
 * Used to warn users that the ride-hailing app may show a slightly different address.
 */
export function getAddressIntegrityNote(
  primaryAddress: string,
  crossValidatedAddress: string | null,
): string | null {
  if (!crossValidatedAddress) return null;

  // Normalize for comparison
  const normalize = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();

  const a = normalize(primaryAddress);
  const b = normalize(crossValidatedAddress);

  // If they share a significant word (road/area name), they're close enough
  const wordsA = new Set(a.split(' ').filter((w) => w.length > 3));
  const wordsB = new Set(b.split(' ').filter((w) => w.length > 3));
  const overlap = [...wordsA].filter((w) => wordsB.has(w));

  if (overlap.length >= 1) return null; // Close enough

  return `The ride app may show this location as "${crossValidatedAddress}". The map coordinates are the same — only the displayed name may differ.`;
}
