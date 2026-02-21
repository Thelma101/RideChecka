// Local storage service for offline caching and data persistence
import { Favorite, RouteSearch, User, Language } from '../types';

const KEYS = {
  USER: 'ridechecka_user',
  FAVORITES: 'ridechecka_favorites',
  SEARCH_HISTORY: 'ridechecka_search_history',
  LANGUAGE: 'ridechecka_language',
  CACHED_ROUTES: 'ridechecka_cached_routes',
  THEME: 'ridechecka_theme',
  OLED: 'ridechecka_oled',
  ONBOARDING: 'ridechecka_onboarding_complete',
  NOTIF_PREFS: 'ridechecka_notif_prefs',
};

// User management
export function saveUser(user: User): void {
  localStorage.setItem(KEYS.USER, JSON.stringify(user));
}

export function getUser(): User | null {
  const data = localStorage.getItem(KEYS.USER);
  return data ? JSON.parse(data) : null;
}

export function clearUser(): void {
  localStorage.removeItem(KEYS.USER);
}

// Favorites management
export function getFavorites(): Favorite[] {
  const data = localStorage.getItem(KEYS.FAVORITES);
  return data ? JSON.parse(data) : [];
}

export function saveFavorite(favorite: Omit<Favorite, 'id' | 'createdAt'>): Favorite {
  const favorites = getFavorites();
  const newFavorite: Favorite = {
    ...favorite,
    id: `fav_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: Date.now(),
  };
  favorites.push(newFavorite);
  localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
  return newFavorite;
}

export function removeFavorite(id: string): void {
  const favorites = getFavorites().filter(f => f.id !== id);
  localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
}

export function isFavorite(pickup: string, destination: string): boolean {
  const favorites = getFavorites();
  return favorites.some(
    f => f.pickup.address === pickup && f.destination.address === destination
  );
}

// Search history management
export function getSearchHistory(): RouteSearch[] {
  const data = localStorage.getItem(KEYS.SEARCH_HISTORY);
  const history = data ? JSON.parse(data) : [];
  // Return last 50 searches, sorted by most recent
  return history.sort((a: RouteSearch, b: RouteSearch) => b.timestamp - a.timestamp).slice(0, 50);
}

export function saveSearchToHistory(search: Omit<RouteSearch, 'id'>): RouteSearch {
  const history = getSearchHistory();
  const newSearch: RouteSearch = {
    ...search,
    id: `search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };
  history.unshift(newSearch);
  // Keep only last 50 searches
  const trimmedHistory = history.slice(0, 50);
  localStorage.setItem(KEYS.SEARCH_HISTORY, JSON.stringify(trimmedHistory));
  return newSearch;
}

export function clearSearchHistory(): void {
  localStorage.removeItem(KEYS.SEARCH_HISTORY);
}

// Cached routes for offline access
export function getCachedRoute(pickup: string, destination: string): RouteSearch | null {
  const cached = localStorage.getItem(KEYS.CACHED_ROUTES);
  if (!cached) return null;
  
  const routes: Record<string, RouteSearch> = JSON.parse(cached);
  const key = `${pickup}_${destination}`;
  const route = routes[key];
  
  // Cache expires after 1 hour
  if (route && Date.now() - route.timestamp < 3600000) {
    return route;
  }
  return null;
}

export function cacheRoute(search: RouteSearch): void {
  const cached = localStorage.getItem(KEYS.CACHED_ROUTES);
  const routes: Record<string, RouteSearch> = cached ? JSON.parse(cached) : {};
  const key = `${search.pickup.address}_${search.destination.address}`;
  routes[key] = search;
  
  // Keep only last 20 cached routes
  const entries = Object.entries(routes);
  if (entries.length > 20) {
    const sorted = entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
    const trimmed = Object.fromEntries(sorted.slice(0, 20));
    localStorage.setItem(KEYS.CACHED_ROUTES, JSON.stringify(trimmed));
  } else {
    localStorage.setItem(KEYS.CACHED_ROUTES, JSON.stringify(routes));
  }
}

// Language preference
export function getLanguage(): Language {
  const lang = localStorage.getItem(KEYS.LANGUAGE);
  return (lang as Language) || 'en';
}

export function saveLanguage(lang: Language): void {
  localStorage.setItem(KEYS.LANGUAGE, lang);
}

// Get price history for a specific route
export function getPriceHistory(pickup: string, destination: string): RouteSearch[] {
  const history = getSearchHistory();
  return history.filter(
    s => s.pickup.address === pickup && s.destination.address === destination
  );
}