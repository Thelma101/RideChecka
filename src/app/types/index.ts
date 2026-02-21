// Type definitions for Ridechecka

export interface Location {
  address: string;
  lat: number;
  lng: number;
  /** Optional cross-validated address from a secondary geocoder */
  verifiedAddress?: string;
}

export interface RideService {
  id: string;
  name: string;
  logo: string;
  color: string;
  isLocal: boolean;
}

export interface PriceEstimate {
  serviceId: string;
  serviceName: string;
  logo: string;
  color: string;
  price: number;
  /** Lower bound of estimated price range */
  priceLow: number;
  /** Upper bound of estimated price range */
  priceHigh: number;
  currency: string;
  estimatedTime: string;
  vehicleType: string;
  surge?: number;
  features?: string[];
  discount?: number;
  deepLink?: string;
  webUrl?: string;
  playStore?: string;
  appStore?: string;
  /** 0–100 confidence score based on how many real fare reports back this estimate */
  confidence: number;
  /** How the estimate was sourced */
  source: 'model' | 'api' | 'crowdsourced' | 'hybrid';
  /** Number of real user reports for this service on similar routes */
  reportCount: number;
  /** When the fare model was last calibrated (ISO string) */
  lastCalibrated?: string;
}

/** A user-submitted actual fare after they booked via RideChecka */
export interface FareReport {
  id?: string;
  serviceId: string;
  pickupLat: number;
  pickupLng: number;
  destLat: number;
  destLng: number;
  distanceKm: number;
  actualFare: number;
  estimatedFare: number;
  /** User's optional note */
  note?: string;
  timestamp: number;
}

export interface RouteSearch {
  id: string;
  pickup: Location;
  destination: Location;
  timestamp: number;
  estimates: PriceEstimate[];
}

export interface Favorite {
  id: string;
  name: string;
  pickup: Location;
  destination: Location;
  createdAt: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  language: string;
}

export type Language = 'en' | 'yo' | 'ha' | 'ig';

export interface Translation {
  [key: string]: {
    [key in Language]: string;
  };
}
