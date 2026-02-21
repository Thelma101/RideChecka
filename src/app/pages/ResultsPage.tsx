// Results page — clean responsive design with sharing and URL persistence
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { PriceCard } from '../components/PriceCard';
import { FareReportDialog } from '../components/FareReportDialog';
import { DataTransparencyBanner } from '../components/DataTransparency';
import { CompareServices } from '../components/CompareServices';
import { PullToRefresh } from '../components/PullToRefresh';
import { SearchFilter } from '../components/SearchFilter';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { PriceEstimate, Location } from '../types';
import { fetchPriceEstimates, RouteInfo } from '../services/rideApi';
import { saveSearchToHistory, saveFavorite, isFavorite, cacheRoute, getCachedRoute } from '../services/storage';
import { t } from '../utils/i18n';
import { getLanguage } from '../services/storage';
import { ArrowLeft, RefreshCw, Heart, TrendingDown, Clock, WifiOff, SlidersHorizontal, ListFilter, Share2, Copy, Mail, MessageCircle, BarChart3, ArrowRightLeft } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';

export function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // URL-persisted: read from location.state first, fall back to URL params
  const stateData = location.state as { pickup?: Location; destination?: Location } | undefined;

  const pickup = useMemo<Location | undefined>(() => {
    if (stateData?.pickup) return stateData.pickup;
    const pa = searchParams.get('pa');
    const plat = searchParams.get('plat');
    const plng = searchParams.get('plng');
    if (pa && plat && plng) return { address: pa, lat: parseFloat(plat), lng: parseFloat(plng) };
    return undefined;
  }, [stateData, searchParams]);

  const destination = useMemo<Location | undefined>(() => {
    if (stateData?.destination) return stateData.destination;
    const da = searchParams.get('da');
    const dlat = searchParams.get('dlat');
    const dlng = searchParams.get('dlng');
    if (da && dlat && dlng) return { address: da, lat: parseFloat(dlat), lng: parseFloat(dlng) };
    return undefined;
  }, [stateData, searchParams]);

  const [estimates, setEstimates] = useState<PriceEstimate[]>([]);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [filteredEstimates, setFilteredEstimates] = useState<PriceEstimate[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price' | 'time'>('price');
  const [showFavoriteDialog, setShowFavoriteDialog] = useState(false);
  const [favoriteName, setFavoriteName] = useState('');
  const [isOffline, setIsOffline] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [reportingEstimate, setReportingEstimate] = useState<PriceEstimate | null>(null);
  const [showCompare, setShowCompare] = useState(false);
  const lang = getLanguage();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    if (!pickup || !destination) {
      navigate('/');
      return;
    }

    loadPrices();
  }, [pickup, destination, navigate]);

  const loadPrices = useCallback(async () => {
    if (!pickup || !destination) return;

    setLoading(true);
    setError(null);
    setIsOffline(false);
    setFilteredEstimates(null);

    try {
      const cached = getCachedRoute(pickup.address, destination.address);
      if (cached) {
        setEstimates(cached.estimates);
        setIsOffline(true);
      }

      const { estimates: data, routeInfo: info } = await fetchPriceEstimates(pickup, destination);
      setEstimates(data);
      setRouteInfo(info);
      setIsOffline(false);

      const search = saveSearchToHistory({
        pickup,
        destination,
        timestamp: Date.now(),
        estimates: data,
      });
      cacheRoute(search);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prices');

      const cached = getCachedRoute(pickup.address, destination.address);
      if (cached) {
        setEstimates(cached.estimates);
        setIsOffline(true);
        toast.error('Showing cached results');
      } else {
        toast.error(t('errorFetchingPrices', lang));
      }
    } finally {
      setLoading(false);
    }
  }, [pickup, destination, lang]);

  const handleRefresh = useCallback(async () => {
    await loadPrices();
  }, [loadPrices]);

  const handleSaveFavorite = () => {
    if (!favoriteName.trim()) {
      toast.error('Please enter a name for this route');
      return;
    }

    if (navigator.vibrate) navigator.vibrate(10);

    saveFavorite({
      name: favoriteName,
      pickup: pickup!,
      destination: destination!,
    });

    toast.success(t('saved', lang));
    setShowFavoriteDialog(false);
    setFavoriteName('');
  };

  const displayEstimates = filteredEstimates || estimates;

  const sortedEstimates = [...displayEstimates].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    }
    const parseTime = (time: string) => {
      const match = time.match(/(\d+)/);
      return match ? parseInt(match[1]) : 0;
    };
    return parseTime(a.estimatedTime) - parseTime(b.estimatedTime);
  });

  const cheapestPrice = estimates.length > 0 ? Math.min(...estimates.map(e => e.price)) : 0;

  const fastestTime = useMemo(() => {
    if (estimates.length === 0) return null;
    const parseTime = (time: string) => {
      const match = time.match(/(\d+)/);
      return match ? parseInt(match[1]) : 999;
    };
    return estimates.reduce((fastest, e) => (
      parseTime(e.estimatedTime) < parseTime(fastest.estimatedTime) ? e : fastest
    ), estimates[0]);
  }, [estimates]);

  // Find the single fastest service — when tied, pick the cheapest among them
  const fastestServiceId = useMemo(() => {
    if (estimates.length === 0) return null;
    const parseTime = (time: string) => {
      const match = time.match(/(\d+)/);
      return match ? parseInt(match[1]) : 999;
    };
    const minTime = Math.min(...estimates.map(e => parseTime(e.estimatedTime)));
    const tied = estimates.filter(e => parseTime(e.estimatedTime) === minTime);
    // Among tied services, pick the cheapest one's base service ID
    const winner = tied.reduce((best, e) => (e.price < best.price ? e : best), tied[0]);
    return winner.serviceId.split('-')[0];
  }, [estimates]);

  const isFav = pickup && destination && isFavorite(pickup.address, destination.address);
  const isFiltered = filteredEstimates !== null;

  // WhatsApp share handler
  const handleWhatsAppShare = useCallback(() => {
    if (!pickup || !destination || estimates.length === 0) return;
    const cheapest = estimates.reduce((min, e) => e.price < min.price ? e : min, estimates[0]);
    const top5 = [...estimates].sort((a, b) => a.price - b.price).slice(0, 5);
    const lines = top5.map((e, i) => `${i + 1}. ${e.serviceName} — ₦${e.price.toLocaleString()} (${e.estimatedTime})`);
    const msg = [
      `🚗 *RideChecka Price Comparison*`,
      ``,
      `📍 *From:* ${pickup.address}`,
      `📍 *To:* ${destination.address}`,
      ``,
      `💰 *Cheapest:* ${cheapest.serviceName} at ₦${cheapest.price.toLocaleString()}`,
      ``,
      `*Top ${top5.length} estimates:*`,
      ...lines,
      ``,
      `Compare yourself: ${window.location.origin}/results?pa=${encodeURIComponent(pickup.address)}&plat=${pickup.lat}&plng=${pickup.lng}&da=${encodeURIComponent(destination.address)}&dlat=${destination.lat}&dlng=${destination.lng}`,
    ].join('\n');
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    setShowShareMenu(false);
  }, [pickup, destination, estimates]);

  // Share URL
  const shareUrl = useMemo(() => {
    if (!pickup || !destination) return '';
    return `${window.location.origin}/results?pa=${encodeURIComponent(pickup.address)}&plat=${pickup.lat}&plng=${pickup.lng}&da=${encodeURIComponent(destination.address)}&dlat=${destination.lat}&dlng=${destination.lng}`;
  }, [pickup, destination]);

  // Copy link handler
  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      toast.success('Link copied!');
    }
    setShowShareMenu(false);
  }, [shareUrl]);

  // Email share handler
  const handleEmailShare = useCallback(() => {
    if (!pickup || !destination || estimates.length === 0) return;
    const cheapest = estimates.reduce((min, e) => e.price < min.price ? e : min, estimates[0]);
    const subject = `RideChecka: ${pickup.address} → ${destination.address}`;
    const body = [
      `Check out these ride prices from RideChecka:`,
      ``,
      `From: ${pickup.address}`,
      `To: ${destination.address}`,
      ``,
      `Cheapest: ${cheapest.serviceName} at ₦${cheapest.price.toLocaleString()}`,
      ``,
      `Compare prices: ${shareUrl}`,
    ].join('\n');
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setShowShareMenu(false);
  }, [pickup, destination, estimates, shareUrl]);

  // Additional metrics
  const averagePrice = useMemo(() => {
    if (estimates.length === 0) return 0;
    return Math.round(estimates.reduce((sum, e) => sum + e.price, 0) / estimates.length);
  }, [estimates]);

  const bestValue = useMemo(() => {
    if (estimates.length === 0) return null;
    // Best value = lowest price/time ratio
    return estimates.reduce((best, e) => {
      const time = parseInt(e.estimatedTime.match(/(\d+)/)?.[1] || '999');
      const ratio = e.price / Math.max(time, 1);
      const bestTime = parseInt(best.estimatedTime.match(/(\d+)/)?.[1] || '999');
      const bestRatio = best.price / Math.max(bestTime, 1);
      return ratio < bestRatio ? e : best;
    }, estimates[0]);
  }, [estimates]);

  if (!pickup || !destination) return null;

  return (
    <div className={`min-h-full flex flex-col ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b sticky top-0 z-20 ${
        isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => navigate('/')}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className={`truncate ${isDark ? 'text-gray-100' : 'text-gray-900'}`} style={{ fontSize: '16px', fontWeight: 600 }}>
                {t('priceRange', lang)}
              </h1>
            </div>
            <button
              onClick={() => setShowCompare(true)}
              disabled={estimates.length < 2}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
              title="Compare two services"
            >
              <ArrowRightLeft className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
            <button
              onClick={() => setShowFilters(true)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors relative ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <ListFilter className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              {isFiltered && (
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-black" />
              )}
            </button>
            <button
              onClick={loadPrices}
              disabled={loading}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''} ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
            <button
              onClick={() => setShowFavoriteDialog(true)}
              disabled={!!isFav}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
            {/* Share Menu */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                disabled={estimates.length === 0}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 ${
                  isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                <Share2 className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className={`absolute right-0 top-11 z-50 rounded-xl shadow-xl border overflow-hidden min-w-[180px] ${
                    isDark ? 'bg-gray-900 border-gray-700 shadow-black/50' : 'bg-white border-gray-200'
                  }`}
                >
                  <button
                    onClick={handleWhatsAppShare}
                    className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 transition-colors ${
                      isDark ? 'hover:bg-gray-800 text-gray-200' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 text-green-500" />
                    WhatsApp
                  </button>
                  <button
                    onClick={handleEmailShare}
                    className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 transition-colors ${
                      isDark ? 'hover:bg-gray-800 text-gray-200' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <Mail className="w-4 h-4 text-blue-500" />
                    Email
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 transition-colors ${
                      isDark ? 'hover:bg-gray-800 text-gray-200' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <Copy className="w-4 h-4 text-purple-500" />
                    Copy Link
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Route summary */}
          <div className={`rounded-lg px-3 py-2 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="truncate flex-1">{pickup.address}</span>
            </div>
            <div className={`flex items-center gap-2 text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="truncate flex-1">{destination.address}</span>
            </div>
          </div>

          {/* Offline indicator */}
          {isOffline && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="flex items-center gap-2 mt-2 text-xs text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 px-3 py-2 rounded-lg"
            >
              <WifiOff className="w-3.5 h-3.5" />
              <span>Offline mode — cached data</span>
            </motion.div>
          )}

          {/* Active filter indicator */}
          {isFiltered && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="flex items-center justify-between mt-2"
            >
              <span className={`text-xs ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                {filteredEstimates.length} of {estimates.length} results
              </span>
              <button
                onClick={() => setFilteredEstimates(null)}
                className="text-xs text-red-500 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded-full"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Content with pull-to-refresh */}
      <PullToRefresh onRefresh={handleRefresh} className="flex-1">
        <div className="px-4 py-4 pb-6">
          {loading && estimates.length === 0 ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className={`p-4 rounded-xl border-0 animate-pulse ${isDark ? 'bg-gray-900' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`} />
                    <div className="flex-1 space-y-2">
                      <div className={`h-4 rounded-lg w-24 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`} />
                      <div className={`h-3 rounded-lg w-16 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`} />
                    </div>
                    <div className={`h-6 rounded-lg w-20 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`} />
                  </div>
                </Card>
              ))}
            </div>
          ) : error && estimates.length === 0 ? (
            <Card className={`p-8 text-center rounded-2xl border-0 ${isDark ? 'bg-gray-900' : ''}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDark ? 'bg-red-900/30' : 'bg-red-50'}`}>
                <span className="text-3xl">😟</span>
              </div>
              <p className="text-red-600 dark:text-red-400 text-sm mb-4">{error}</p>
              <Button onClick={loadPrices} className="bg-green-600 hover:bg-green-700">
                {t('tryAgain', lang)}
              </Button>
            </Card>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <Card className={`p-3.5 rounded-lg border ${
                  isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                }`}>
                  <div className={`flex items-center gap-1.5 mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium">{t('cheapest', lang)}</span>
                  </div>
                  <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ₦{cheapestPrice.toLocaleString()}
                  </p>
                </Card>
                <Card className={`p-3.5 rounded-lg border ${
                  isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                }`}>
                  <div className={`flex items-center gap-1.5 mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium">{t('fastest', lang)}</span>
                  </div>
                  <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {fastestTime?.estimatedTime}
                  </p>
                </Card>
                <Card className={`p-3.5 rounded-lg border ${
                  isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                }`}>
                  <div className={`flex items-center gap-1.5 mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium">Average</span>
                  </div>
                  <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ₦{averagePrice.toLocaleString()}
                  </p>
                </Card>
                <Card className={`p-3.5 rounded-lg border ${
                  isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                }`}>
                  <div className={`flex items-center gap-1.5 mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span className="text-[11px] font-medium">Best Value</span>
                  </div>
                  <p className={`text-sm font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {bestValue?.serviceName}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    ₦{bestValue?.price.toLocaleString()}
                  </p>
                </Card>
              </div>

              {/* Sort bar */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {sortedEstimates.length} results
                </span>
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className={`w-3.5 h-3.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <Select value={sortBy} onValueChange={(value: 'price' | 'time') => setSortBy(value)}>
                    <SelectTrigger className={`w-[130px] h-8 text-xs rounded-lg ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200'}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price">Sort by Price</SelectItem>
                      <SelectItem value="time">Sort by Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Route distance & travel time */}
              {routeInfo && (
                <div className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs ${
                  isDark ? 'bg-gray-900 border border-gray-800' : 'bg-gray-50 border border-gray-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-green-500' : 'bg-green-500'}`} />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'} style={{ fontWeight: 500 }}>
                        {routeInfo.distanceKm.toFixed(1)} km
                      </span>
                    </div>
                    <span className={isDark ? 'text-gray-600' : 'text-gray-300'}>·</span>
                    <div className="flex items-center gap-1">
                      <Clock className={`w-3 h-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        ~{routeInfo.travelMinutes} min drive
                      </span>
                    </div>
                  </div>
                  {isOffline && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                    }`}>Cached</span>
                  )}
                </div>
              )}

              {/* Price cards — responsive grid */}
              <DataTransparencyBanner
                serviceCount={sortedEstimates.length}
                avgConfidence={
                  sortedEstimates.length
                    ? Math.round(sortedEstimates.reduce((s, e) => s + e.confidence, 0) / sortedEstimates.length)
                    : 0
                }
                totalReports={sortedEstimates.reduce((s, e) => s + e.reportCount, 0)}
                isOnline={!isOffline}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {(() => {
                  // Group sorted estimates by base service (e.g. uber, bolt)
                  const grouped: { key: string; estimates: PriceEstimate[] }[] = [];
                  const seen = new Set<string>();
                  for (const est of sortedEstimates) {
                    const base = est.serviceId.split('-')[0];
                    if (!seen.has(base)) {
                      seen.add(base);
                      grouped.push({ key: base, estimates: sortedEstimates.filter(e => e.serviceId.split('-')[0] === base) });
                    }
                  }
                  // Sort groups by their cheapest tier
                  grouped.sort((a, b) => Math.min(...a.estimates.map(e => e.price)) - Math.min(...b.estimates.map(e => e.price)));

                  return grouped.map((group, index) => {
                    const groupCheapest = Math.min(...group.estimates.map(e => e.price));
                    return (
                      <motion.div
                        key={group.key}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + index * 0.04 }}
                      >
                        <PriceCard
                          estimates={group.estimates}
                          isCheapest={groupCheapest === cheapestPrice}
                          isFastest={group.key === fastestServiceId}
                          onReportFare={(est) => setReportingEstimate(est)}
                        />
                      </motion.div>
                    );
                  });
                })()}
              </div>
            </>
          )}
        </div>
      </PullToRefresh>

      {/* Search Filter Drawer */}
      <SearchFilter
        estimates={estimates}
        onFilter={(filtered) => setFilteredEstimates(filtered)}
        open={showFilters}
        onOpenChange={setShowFilters}
      />

      {/* Save Favorite Dialog */}
      <Dialog open={showFavoriteDialog} onOpenChange={setShowFavoriteDialog}>
        <DialogContent className="max-w-[calc(100%-2rem)] rounded-2xl">
          <DialogHeader>
            <DialogTitle>{t('addToFavorites', lang)}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="favorite-name" className="mb-2 block text-sm">
              Route Name
            </Label>
            <Input
              id="favorite-name"
              value={favoriteName}
              onChange={(e) => setFavoriteName(e.target.value)}
              placeholder="e.g., Home to Work"
              className="rounded-xl"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowFavoriteDialog(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button onClick={handleSaveFavorite} className="bg-green-600 hover:bg-green-700 rounded-xl">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Fare Report Dialog */}
      {reportingEstimate && pickup && destination && (
        <FareReportDialog
          estimate={reportingEstimate}
          pickup={pickup}
          destination={destination}
          onClose={() => setReportingEstimate(null)}
        />
      )}

      {/* Compare Services Drawer */}
      <CompareServices
        estimates={estimates}
        open={showCompare}
        onOpenChange={setShowCompare}
      />
    </div>
  );
}