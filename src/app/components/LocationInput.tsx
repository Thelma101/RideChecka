// Location input — mobile optimized with dark mode, map picker, larger touch targets
import { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Search, Map } from 'lucide-react';
import { Location } from '../types';
import { searchLocations, getCurrentLocation } from '../services/rideApi';
import { Input } from './ui/input';
import { MapPicker } from './MapPicker';
import { t } from '../utils/i18n';
import { getLanguage } from '../services/storage';
import { toast } from 'sonner';
import { useTheme } from '../contexts/ThemeContext';

interface LocationInputProps {
  label: string;
  value: Location | null;
  onChange: (location: Location) => void;
  placeholder?: string;
  showCurrentLocation?: boolean;
  mapType?: 'pickup' | 'destination';
}

export function LocationInput({
  label,
  value,
  onChange,
  placeholder,
  showCurrentLocation = false,
  mapType = 'pickup',
}: LocationInputProps) {
  const [query, setQuery] = useState(value?.address || '');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lang = getLanguage();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    if (value) {
      setQuery(value.address);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const results = await searchLocations(query);
        setSuggestions(results);
      } catch (error) {
        // Silently handle suggestion fetch errors
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelectSuggestion = (location: Location) => {
    if (navigator.vibrate) navigator.vibrate(5);
    setQuery(location.address);
    onChange(location);
    setIsOpen(false);
    setSuggestions([]);
  };

  const handleUseCurrentLocation = async () => {
    if (navigator.vibrate) navigator.vibrate(10);
    setIsLoading(true);
    try {
      const location = await getCurrentLocation();
      setQuery(location.address);
      onChange(location);
      toast.success(t('saved', lang));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to get location');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <label className={`block text-xs mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontWeight: 500 }}>
        {label}
      </label>
      <div className="relative">
        <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-300'}`}>
          <Search className="w-4 h-4" />
        </div>
        <Input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`pl-10 pr-12 h-12 rounded-xl transition-colors ${
            isDark
              ? 'bg-gray-800 border-gray-700 focus:bg-gray-750 text-white placeholder:text-gray-500'
              : 'bg-gray-50 border-gray-100 focus:bg-white'
          }`}
        />
        {showCurrentLocation && (
          <button
            type="button"
            className={`absolute right-11 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isDark
                ? 'bg-green-900/40 active:bg-green-900/60'
                : 'bg-green-50 active:bg-green-100'
            }`}
            onClick={handleUseCurrentLocation}
            disabled={isLoading}
          >
            <Navigation className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'} ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        )}
        {/* Map picker button */}
        <button
          type="button"
          className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isDark
              ? 'bg-blue-900/40 active:bg-blue-900/60'
              : 'bg-blue-50 active:bg-blue-100'
          }`}
          onClick={() => setShowMap(true)}
        >
          <Map className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
        </button>
      </div>

      {/* Suggestions dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className={`absolute z-20 w-full mt-1.5 border rounded-xl shadow-xl max-h-60 overflow-y-auto ${
          isDark
            ? 'bg-gray-900 border-gray-700 shadow-black/40'
            : 'bg-white border-gray-100'
        }`}>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              className={`w-full px-4 py-3.5 text-left flex items-start gap-3 last:border-b-0 transition-colors ${
                isDark
                  ? 'active:bg-green-900/30 border-b border-gray-800'
                  : 'active:bg-green-50 border-b border-gray-50'
              }`}
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                isDark ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <MapPin className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
              </div>
              <span className={`text-sm pt-1 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{suggestion.address}</span>
            </button>
          ))}
        </div>
      )}

      {/* Map Picker Overlay */}
      <MapPicker
        open={showMap}
        onClose={() => setShowMap(false)}
        onSelect={(loc) => {
          setQuery(loc.address);
          onChange(loc);
        }}
        type={mapType}
      />
    </div>
  );
}
