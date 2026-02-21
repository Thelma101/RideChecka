// Fare report service — crowdsourced fare calibration
// Users report actual fares after booking via RideChecka.
// These reports improve price estimate accuracy over time.

import type { FareReport, PriceEstimate, Location } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';

// ── Local storage fallback when Supabase is offline ─────────────
const STORAGE_KEY = 'ridechecka_fare_reports';

function getLocalReports(): FareReport[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalReport(report: FareReport): void {
  const reports = getLocalReports();
  reports.push(report);
  // Keep at most 200 local reports
  if (reports.length > 200) reports.splice(0, reports.length - 200);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

// ── Submit a fare report ────────────────────────────────────────
export async function submitFareReport(
  estimate: PriceEstimate,
  pickup: Location,
  destination: Location,
  actualFare: number,
  note?: string,
): Promise<{ success: boolean; error?: string }> {
  const report: FareReport = {
    serviceId: estimate.serviceId.split('-')[0], // Use base service ID for grouping
    pickupLat: pickup.lat,
    pickupLng: pickup.lng,
    destLat: destination.lat,
    destLng: destination.lng,
    distanceKm: 0, // Computed from coordinates in getAverageActualFare
    actualFare,
    estimatedFare: estimate.price,
    note,
    timestamp: Date.now(),
  };

  // Always save locally first
  saveLocalReport(report);

  // Try to persist to Supabase
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from('fare_reports').insert({
        service_id: report.serviceId,
        pickup_lat: report.pickupLat,
        pickup_lng: report.pickupLng,
        dest_lat: report.destLat,
        dest_lng: report.destLng,
        actual_fare: report.actualFare,
        estimated_fare: report.estimatedFare,
        note: report.note || null,
      });

      if (error) {
        return { success: true }; // Supabase insert failed — still saved locally
      }

      return { success: true };
    } catch {
      return { success: true }; // Local save succeeded
    }
  }

  return { success: true }; // Offline — local only
}

// ── Fetch report count for a service on similar routes ──────────
export async function getReportCount(
  serviceId: string,
  pickupLat: number,
  pickupLng: number,
  destLat: number,
  destLng: number,
  radiusKm: number = 2,
): Promise<number> {
  // Count local reports within radius
  const localReports = getLocalReports().filter((r) => {
    if (r.serviceId !== serviceId) return false;
    const dPickup = haversine(r.pickupLat, r.pickupLng, pickupLat, pickupLng);
    const dDest = haversine(r.destLat, r.destLng, destLat, destLng);
    return dPickup <= radiusKm && dDest <= radiusKm;
  });

  let remoteCount = 0;

  if (isSupabaseConfigured() && supabase) {
    try {
      // Use a bounding-box query as a rough filter (PostGIS would be better)
      const latDelta = radiusKm / 111;
      const lngDelta = radiusKm / (111 * Math.cos((pickupLat * Math.PI) / 180));

      const { count } = await supabase
        .from('fare_reports')
        .select('id', { count: 'exact', head: true })
        .eq('service_id', serviceId)
        .gte('pickup_lat', pickupLat - latDelta)
        .lte('pickup_lat', pickupLat + latDelta)
        .gte('pickup_lng', pickupLng - lngDelta)
        .lte('pickup_lng', pickupLng + lngDelta);

      remoteCount = count || 0;
    } catch {
      // Supabase offline
    }
  }

  return localReports.length + remoteCount;
}

// ── Get average actual fare for calibration ─────────────────────
export async function getAverageActualFare(
  serviceId: string,
  pickupLat: number,
  pickupLng: number,
  destLat: number,
  destLng: number,
  radiusKm: number = 2,
): Promise<{ average: number; count: number } | null> {
  const localReports = getLocalReports().filter((r) => {
    if (r.serviceId !== serviceId) return false;
    const dPickup = haversine(r.pickupLat, r.pickupLng, pickupLat, pickupLng);
    const dDest = haversine(r.destLat, r.destLng, destLat, destLng);
    return dPickup <= radiusKm && dDest <= radiusKm;
  });

  const fares = localReports.map((r) => r.actualFare);

  if (isSupabaseConfigured() && supabase) {
    try {
      const latDelta = radiusKm / 111;
      const lngDelta = radiusKm / (111 * Math.cos((pickupLat * Math.PI) / 180));

      const { data } = await supabase
        .from('fare_reports')
        .select('actual_fare')
        .eq('service_id', serviceId)
        .gte('pickup_lat', pickupLat - latDelta)
        .lte('pickup_lat', pickupLat + latDelta)
        .gte('pickup_lng', pickupLng - lngDelta)
        .lte('pickup_lng', pickupLng + lngDelta)
        .gte('dest_lat', destLat - latDelta)
        .lte('dest_lat', destLat + latDelta)
        .order('created_at', { ascending: false })
        .limit(50);

      if (data) {
        fares.push(...data.map((d: { actual_fare: number }) => d.actual_fare));
      }
    } catch {
      // Supabase offline
    }
  }

  if (fares.length === 0) return null;

  const average = Math.round(fares.reduce((a, b) => a + b, 0) / fares.length);
  return { average, count: fares.length };
}

// ── Haversine helper (km) ───────────────────────────────────────
function haversine(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
