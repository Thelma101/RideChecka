// Interactive Map Picker — Full-screen Leaflet + OpenStreetMap overlay
// Tap-to-select, reverse geocoding (Nominatim), GPS, dark tiles, search bar
import { useState, useEffect, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { X, Search, Navigation, Loader2 } from 'lucide-react';
import { Location } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons for Leaflet in bundled environments
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom green marker for pickup
const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Custom red marker for destination
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Light tiles (OpenStreetMap default)
const LIGHT_TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// Dark tiles (CartoDB dark)
const DARK_TILE = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

const LAGOS_CENTER: [number, number] = [6.5244, 3.3792];

// Reverse geocode via Nominatim (free, no API key)
async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1&countrycodes=ng`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const data = await res.json();
    return data.display_name?.split(',').slice(0, 3).join(',').trim() || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  } catch {
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  }
}

// Forward geocode / search via Nominatim (Nigeria-filtered)
async function forwardGeocode(query: string): Promise<Array<{ address: string; lat: number; lng: number }>> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&countrycodes=ng&limit=5`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const data = await res.json();
    return data.map((item: any) => ({
      address: item.display_name?.split(',').slice(0, 3).join(',').trim() || item.display_name,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
    }));
  } catch {
    return [];
  }
}

// Sub-component: click handler
function MapClickHandler({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// Sub-component: fly to a position
function FlyTo({ position }: { position: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 16, { duration: 0.8 });
    }
  }, [position, map]);
  return null;
}

interface MapPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (location: Location) => void;
  type: 'pickup' | 'destination';
}

export function MapPicker({ open, onClose, onSelect, type }: MapPickerProps) {
  const [marker, setMarker] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ address: string; lat: number; lng: number }>>([]);
  const [searching, setSearching] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const searchTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const icon = type === 'pickup' ? greenIcon : redIcon;
  const tileUrl = isDark ? DARK_TILE : LIGHT_TILE;

  const handleMapClick = useCallback(async (lat: number, lng: number) => {
    setMarker([lat, lng]);
    setLoading(true);
    const addr = await reverseGeocode(lat, lng);
    setAddress(addr);
    setLoading(false);
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }
    searchTimeout.current = setTimeout(async () => {
      setSearching(true);
      const results = await forwardGeocode(query);
      setSearchResults(results);
      setSearching(false);
    }, 400);
  }, []);

  const handleSelectSearchResult = useCallback(async (result: { address: string; lat: number; lng: number }) => {
    setMarker([result.lat, result.lng]);
    setAddress(result.address);
    setSearchResults([]);
    setSearchQuery(result.address);
  }, []);

  const handleUseGPS = useCallback(async () => {
    if (!navigator.geolocation) return;
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setMarker([lat, lng]);
        const addr = await reverseGeocode(lat, lng);
        setAddress(addr);
        setGpsLoading(false);
      },
      () => {
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const handleConfirm = () => {
    if (!marker || !address) return;
    onSelect({ address, lat: marker[0], lng: marker[1] });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: isDark ? '#111' : '#fff' }}>
      {/* Header */}
      <div className={`relative z-30 px-4 py-3 border-b ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-2">
          <button onClick={onClose} className={`w-9 h-9 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <X className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
          </button>
          <h2 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Select {type === 'pickup' ? 'Pickup' : 'Destination'} on Map
          </h2>
          <button
            onClick={handleUseGPS}
            disabled={gpsLoading}
            className={`ml-auto w-9 h-9 rounded-full flex items-center justify-center ${isDark ? 'bg-green-900/40' : 'bg-green-50'}`}
          >
            {gpsLoading ? (
              <Loader2 className={`w-4 h-4 animate-spin ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            ) : (
              <Navigation className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            )}
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search address in Nigeria..."
            className={`w-full pl-10 pr-4 h-10 rounded-xl text-sm border ${
              isDark
                ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500'
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'
            }`}
          />
          {searching && <Loader2 className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />}
        </div>

        {/* Search results dropdown */}
        {searchResults.length > 0 && (
          <div className={`absolute left-4 right-4 mt-1 border rounded-xl shadow-xl max-h-48 overflow-y-auto z-40 ${
            isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            {searchResults.map((r, i) => (
              <button
                key={i}
                onClick={() => handleSelectSearchResult(r)}
                className={`w-full text-left px-4 py-3 text-sm border-b last:border-b-0 ${
                  isDark ? 'text-gray-200 border-gray-800 active:bg-gray-800' : 'text-gray-700 border-gray-100 active:bg-gray-50'
                }`}
              >
                {r.address}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map */}
      <div className="flex-1 relative z-10">
        <MapContainer
          center={LAGOS_CENTER}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
            url={tileUrl}
          />
          <MapClickHandler onSelect={handleMapClick} />
          <FlyTo position={marker} />
          {marker && <Marker position={marker} icon={icon} />}
        </MapContainer>
      </div>

      {/* Bottom confirm bar */}
      <div className={`relative z-30 px-4 py-4 border-t ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        {address ? (
          <p className={`text-xs mb-2 truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {loading ? 'Loading address...' : address}
          </p>
        ) : (
          <p className={`text-xs mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Tap on the map to select a location</p>
        )}
        <button
          onClick={handleConfirm}
          disabled={!marker || loading}
          className="w-full py-3 rounded-xl text-white text-sm font-semibold bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:opacity-40 transition-all"
        >
          Confirm {type === 'pickup' ? 'Pickup' : 'Destination'}
        </button>
      </div>
    </div>
  );
}
