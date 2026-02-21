// Favorites page — mobile native with dark mode and swipe-to-delete
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { getFavorites, removeFavorite } from '../services/storage';
import { Favorite } from '../types';
import { t } from '../utils/i18n';
import { getLanguage } from '../services/storage';
import { Heart, MapPin, Trash2, ArrowRight, Route } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';

export function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const navigate = useNavigate();
  const lang = getLanguage();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    setFavorites(getFavorites());
  };

  const handleRemove = (id: string) => {
    if (navigator.vibrate) navigator.vibrate(10);
    removeFavorite(id);
    setFavorites(prev => prev.filter(f => f.id !== id));
    toast.success('Favorite removed');
  };

  const handleView = (favorite: Favorite) => {
    if (navigator.vibrate) navigator.vibrate(5);
    navigate('/results', {
      state: {
        pickup: favorite.pickup,
        destination: favorite.destination,
      },
    });
  };

  return (
    <div className={`min-h-full ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b px-5 pt-14 pb-5 ${
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isDark ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <Heart className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </div>
          <div>
            <h1 className={`${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '22px', fontWeight: 700 }}>
              {t('favorites', lang)}
            </h1>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              {favorites.length} saved {favorites.length === 1 ? 'route' : 'routes'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 pb-6">
        {favorites.length === 0 ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Card className={`p-8 text-center rounded-2xl border-0 shadow-sm ${isDark ? 'bg-gray-900 shadow-black/20' : ''}`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isDark ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <Heart className={`w-10 h-10 ${isDark ? 'text-gray-600' : 'text-gray-200'}`} />
              </div>
              <h2 className={`mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '17px', fontWeight: 600 }}>
                {t('noFavorites', lang)}
              </h2>
              <p className={`text-sm mb-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Save your frequent routes for quick access
              </p>
              <Button
                onClick={() => navigate('/')}
                className="bg-green-600 hover:bg-green-700 rounded-xl active:scale-[0.98] transition-all"
              >
                <Route className="w-4 h-4 mr-2" />
                {t('searchRoutes', lang)}
              </Button>
            </Card>
          </motion.div>
        ) : (
          <div className="space-y-2.5">
            <AnimatePresence>
              {favorites.map((favorite, index) => (
                <motion.div
                  key={favorite.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100, height: 0, marginBottom: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`p-4 rounded-xl border-0 shadow-sm active:scale-[0.99] transition-all ${
                    isDark ? 'bg-gray-900 shadow-black/20' : ''
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isDark ? 'bg-gray-800' : 'bg-gray-100'
                      }`}>
                        <MapPin className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`mb-1.5 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '15px', fontWeight: 600 }}>
                          {favorite.name}
                        </h3>
                        <div className="space-y-1">
                          <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                            <span className="truncate">{favorite.pickup.address}</span>
                          </div>
                          <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                            <span className="truncate">{favorite.destination.address}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            onClick={() => handleView(favorite)}
                            className="bg-green-600 hover:bg-green-700 rounded-lg active:scale-[0.97] transition-all h-8"
                          >
                            {t('viewPrices', lang)}
                            <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemove(favorite.id)}
                            className={`rounded-lg active:scale-[0.97] transition-all h-8 text-red-500 hover:text-red-600 ${
                              isDark ? 'hover:bg-red-900/30 border-gray-700' : 'hover:bg-red-50'
                            }`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
