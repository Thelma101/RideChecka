// History page — mobile native with dark mode, analytics, and grouped sections
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { TrendChart } from '../components/TrendChart';
import { AnalyticsDashboard } from '../components/AnalyticsDashboard';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '../components/ui/drawer';
import { getSearchHistory, getPriceHistory, clearSearchHistory } from '../services/storage';
import { RouteSearch } from '../types';
import { t } from '../utils/i18n';
import { getLanguage } from '../services/storage';
import { History, MapPin, TrendingUp, Trash2, ArrowRight, Clock, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';

export function HistoryPage() {
  const [history, setHistory] = useState<RouteSearch[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<RouteSearch | null>(null);
  const [showTrends, setShowTrends] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const navigate = useNavigate();
  const lang = getLanguage();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    setHistory(getSearchHistory());
  };

  const handleClearHistory = () => {
    if (navigator.vibrate) navigator.vibrate(15);
    clearSearchHistory();
    setHistory([]);
    toast.success('History cleared');
  };

  const handleViewTrends = (search: RouteSearch) => {
    const routeHistory = getPriceHistory(
      search.pickup.address,
      search.destination.address
    );
    if (routeHistory.length < 2) {
      toast.error('Not enough data to show trends');
      return;
    }
    if (navigator.vibrate) navigator.vibrate(5);
    setSelectedRoute(search);
    setShowTrends(true);
  };

  const handleViewPrices = (search: RouteSearch) => {
    if (navigator.vibrate) navigator.vibrate(5);
    navigate('/results', {
      state: {
        pickup: search.pickup,
        destination: search.destination,
      },
    });
  };

  const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);
  const paginatedHistory = history.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const groupedHistory = paginatedHistory.reduce((acc, search) => {
    const date = format(new Date(search.timestamp), 'MMMM dd, yyyy');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(search);
    return acc;
  }, {} as Record<string, RouteSearch[]>);

  return (
    <div className={`min-h-full ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b px-5 pt-14 pb-5 ${
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isDark ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <History className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            </div>
            <div>
              <h1 className={`${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '22px', fontWeight: 700 }}>
                {t('history', lang)}
              </h1>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                {history.length} {history.length === 1 ? 'search' : 'searches'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <>
                <button
                  onClick={() => setShowAnalytics(true)}
                  className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg active:scale-95 transition-all ${
                    isDark
                      ? 'text-gray-300 bg-gray-800 hover:bg-gray-700'
                      : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <BarChart3 className="w-3 h-3" />
                  {t('analytics', lang)}
                </button>
                <button
                  onClick={handleClearHistory}
                  className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg active:scale-95 transition-all ${
                    isDark
                      ? 'text-gray-400 bg-gray-800 hover:bg-gray-700'
                      : 'text-gray-500 bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <Trash2 className="w-3 h-3" />
                  Clear
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 pb-6">
        {history.length === 0 ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Card className={`p-8 text-center rounded-2xl border-0 shadow-sm ${isDark ? 'bg-gray-900 shadow-black/20' : ''}`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isDark ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <Clock className={`w-10 h-10 ${isDark ? 'text-gray-600' : 'text-gray-200'}`} />
              </div>
              <h2 className={`mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '17px', fontWeight: 600 }}>
                {t('noHistory', lang)}
              </h2>
              <p className={`text-sm mb-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Your search history will appear here
              </p>
              <Button
                onClick={() => navigate('/')}
                className="bg-green-600 hover:bg-green-700 rounded-xl active:scale-[0.98] transition-all"
              >
                {t('searchRoutes', lang)}
              </Button>
            </Card>
          </motion.div>
        ) : (
          <div className="space-y-5">
            {Object.entries(groupedHistory).map(([date, searches], groupIndex) => (
              <div key={date}>
                <div className="flex items-center gap-2 mb-2.5 px-1">
                  <div className={`h-px flex-1 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
                  <span className={`text-[11px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`} style={{ fontWeight: 500 }}>
                    {date}
                  </span>
                  <div className={`h-px flex-1 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
                </div>
                <div className="space-y-2.5">
                  {searches.map((search, index) => {
                    const cheapestPrice = Math.min(...search.estimates.map(e => e.price));
                    const routeHistoryCount = getPriceHistory(
                      search.pickup.address,
                      search.destination.address
                    ).length;

                    return (
                      <motion.div
                        key={search.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (groupIndex * 0.1) + (index * 0.04) }}
                      >
                        <Card className={`p-4 rounded-xl border-0 shadow-sm active:scale-[0.99] transition-all ${
                          isDark ? 'bg-gray-900 shadow-black/20' : ''
                        }`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              isDark ? 'bg-green-900/40' : 'bg-green-50'
                            }`}>
                              <MapPin className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="space-y-1 mb-3">
                                <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                                  <span className="truncate">{search.pickup.address}</span>
                                </div>
                                <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                                  <span className="truncate">{search.destination.address}</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <span className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Cheapest</span>
                                  <p className={`${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '18px', fontWeight: 700 }}>
                                    ₦{cheapestPrice.toLocaleString()}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <span className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Time</span>
                                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {format(new Date(search.timestamp), 'h:mm a')}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleViewPrices(search)}
                                  className="bg-green-600 hover:bg-green-700 rounded-lg active:scale-[0.97] transition-all h-8"
                                >
                                  View Prices
                                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                                </Button>
                                {routeHistoryCount >= 2 && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleViewTrends(search)}
                                    className={`rounded-lg active:scale-[0.97] transition-all h-8 ${
                                      isDark ? 'border-gray-700' : ''
                                    }`}
                                  >
                                    <TrendingUp className="w-3.5 h-3.5 mr-1" />
                                    Trends
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {history.length > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-center gap-3 mt-6 mb-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page <= 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className={`h-8 rounded-lg ${isDark ? 'border-gray-700 disabled:opacity-30' : 'disabled:opacity-30'}`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Prev
            </Button>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {page} / {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              disabled={page >= totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className={`h-8 rounded-lg ${isDark ? 'border-gray-700 disabled:opacity-30' : 'disabled:opacity-30'}`}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* Price Trends Drawer */}
      <Drawer open={showTrends} onOpenChange={setShowTrends}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t('priceTrends', lang)}</DrawerTitle>
          </DrawerHeader>
          {selectedRoute && (
            <div className="px-4 pb-8">
              <div className={`mb-4 p-3 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className={`flex items-center gap-2 text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="truncate">{selectedRoute.pickup.address}</span>
                </div>
                <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span className="truncate">{selectedRoute.destination.address}</span>
                </div>
              </div>
              <TrendChart
                searches={getPriceHistory(
                  selectedRoute.pickup.address,
                  selectedRoute.destination.address
                )}
              />
            </div>
          )}
        </DrawerContent>
      </Drawer>

      {/* Analytics Dashboard */}
      <AnalyticsDashboard
        open={showAnalytics}
        onOpenChange={setShowAnalytics}
      />
    </div>
  );
}
