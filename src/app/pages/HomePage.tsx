// Home page — modern borderless design
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LocationInput } from '../components/LocationInput';
import { Button } from '../components/ui/button';
import { Location } from '../types';
import { t } from '../utils/i18n';
import { getLanguage, getFavorites, getSearchHistory } from '../services/storage';
import { MapPin, ArrowRight, Star, ArrowDownUp, Clock, Zap, Shield, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';

export function HomePage() {
  const [pickup, setPickup] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const navigate = useNavigate();
  const lang = getLanguage();
  const favorites = getFavorites().slice(0, 3);
  const recentSearches = getSearchHistory().slice(0, 3);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const handleComparePrices = () => {
    if (!pickup || !destination) {
      toast.error('Please select both pickup and destination locations');
      return;
    }

    if (pickup.address === destination.address) {
      toast.error('Pickup and destination must be different');
      return;
    }

    const params = new URLSearchParams({
      pa: pickup.address,
      plat: String(pickup.lat),
      plng: String(pickup.lng),
      da: destination.address,
      dlat: String(destination.lat),
      dlng: String(destination.lng),
    });
    navigate(`/results?${params.toString()}`, { state: { pickup, destination } });
  };

  const handleSwapLocations = () => {
    const temp = pickup;
    setPickup(destination);
    setDestination(temp);
  };

  const handleSelectFavorite = (favorite: typeof favorites[0]) => {
    setPickup(favorite.pickup);
    setDestination(favorite.destination);
    toast.success('Favorite route loaded');
  };

  const handleSelectRecent = (search: typeof recentSearches[0]) => {
    setPickup(search.pickup);
    setDestination(search.destination);
  };

  return (
    <div className={`min-h-full ${isDark ? 'bg-gray-950' : 'bg-white'}`}>
      {/* Hero + Form — single seamless section */}
      <div className="px-6 pt-14 pb-10 md:pt-12 md:pb-8 max-w-2xl">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <span className={`text-[11px] font-semibold tracking-wide uppercase ${
              isDark ? 'text-green-400' : 'text-green-600'
            }`}>
              16 services
            </span>
            <span className={`w-1 h-1 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} />
            <span className={`text-[11px] tracking-wide uppercase ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}>
              Nigeria-wide
            </span>
          </div>
          <h1 className={`text-3xl md:text-[40px] tracking-tight leading-[1.1] ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 800, letterSpacing: '-0.025em' }}>
            Find the cheapest<br />ride, instantly.
          </h1>
          <p className={`text-[15px] mt-4 leading-relaxed max-w-md ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Compare Uber, Bolt, inDriver & 13 more services in one search.
          </p>
        </motion.div>

        {/* Location inputs — borderless */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-10 space-y-1"
        >
          <LocationInput
            label={t('pickupLocation', lang)}
            value={pickup}
            onChange={setPickup}
            placeholder="Enter pickup address (e.g. 15 Akin Adesola Street)"
            showCurrentLocation
            mapType="pickup"
          />

          <div className="flex justify-center py-1">
            <button
              onClick={handleSwapLocations}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <ArrowDownUp className={`w-3.5 h-3.5 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
            </button>
          </div>

          <LocationInput
            label={t('destination', lang)}
            value={destination}
            onChange={setDestination}
            placeholder="Enter destination address"
            mapType="destination"
          />

          <Button
            onClick={handleComparePrices}
            disabled={!pickup || !destination}
            className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-30 text-white py-6 rounded-xl transition-all mt-5 font-semibold"
            style={{ fontSize: '15px' }}
          >
            {t('comparePrices', lang)}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        {/* Value props — minimal inline row */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex items-center gap-6 mt-8 flex-wrap"
        >
          {[
            { icon: TrendingDown, label: 'Save up to 40%' },
            { icon: Zap, label: 'Instant results' },
            { icon: Shield, label: 'Always free' },
          ].map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex items-center gap-2">
              <Icon className={`w-3.5 h-3.5 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && favorites.length === 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <h2 className={`text-[11px] font-semibold tracking-wide uppercase mb-4 ${
              isDark ? 'text-gray-600' : 'text-gray-300'
            }`}>
              Recent
            </h2>
            <div className="space-y-1">
              {recentSearches.map((search, index) => (
                <motion.div
                  key={search.id}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.35 + index * 0.06 }}
                >
                  <button
                    className={`w-full text-left py-3 px-1 flex items-center gap-3 transition-colors rounded-lg ${
                      isDark ? 'hover:bg-gray-900' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleSelectRecent(search)}
                  >
                    <Clock className={`w-3.5 h-3.5 flex-shrink-0 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} />
                    <span className={`text-sm truncate flex-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {search.pickup.address.split(',')[0]} → {search.destination.address.split(',')[0]}
                    </span>
                    <ArrowRight className={`w-3 h-3 flex-shrink-0 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Favorites */}
        {favorites.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <h2 className={`text-[11px] font-semibold tracking-wide uppercase mb-4 ${
              isDark ? 'text-gray-600' : 'text-gray-300'
            }`}>
              {t('favorites', lang)}
            </h2>
            <div className="space-y-1">
              {favorites.map((favorite, index) => (
                <motion.div
                  key={favorite.id}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.35 + index * 0.06 }}
                >
                  <button
                    className={`w-full text-left py-3 px-1 flex items-center gap-3 transition-colors rounded-lg ${
                      isDark ? 'hover:bg-gray-900' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleSelectFavorite(favorite)}
                  >
                    <MapPin className={`w-3.5 h-3.5 flex-shrink-0 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontWeight: 500 }}>
                        {favorite.name}
                      </p>
                      <p className={`text-xs truncate ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                        {favorite.pickup.address.split(',')[0]} → {favorite.destination.address.split(',')[0]}
                      </p>
                    </div>
                    <ArrowRight className={`w-3 h-3 flex-shrink-0 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-[11px] mt-10 pb-4 ${isDark ? 'text-gray-700' : 'text-gray-300'}`}
        >
          Prices are estimates. Actual fares may vary by demand & time.
        </motion.p>
      </div>
    </div>
  );
}
