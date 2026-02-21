// Analytics dashboard with price insights, spending analysis, and trend visualization
import { useState, useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from './ui/drawer';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { RouteSearch } from '../types';
import { getSearchHistory } from '../services/storage';
import { TrendingDown, TrendingUp, BarChart3, MapPin, Clock, ArrowRight } from 'lucide-react';
import { format, subDays, isAfter } from 'date-fns';

interface AnalyticsDashboardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CHART_COLORS = ['#16a34a', '#2563eb', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#6366f1'];

export function AnalyticsDashboard({ open, onOpenChange }: AnalyticsDashboardProps) {
  const [period, setPeriod] = useState<'7d' | '30d' | 'all'>('7d');

  const allHistory = useMemo(() => getSearchHistory(), []);

  const history = useMemo(() => {
    if (period === 'all') return allHistory;
    const cutoff = subDays(new Date(), period === '7d' ? 7 : 30);
    return allHistory.filter(s => isAfter(new Date(s.timestamp), cutoff));
  }, [allHistory, period]);

  // Service distribution
  const serviceDistribution = useMemo(() => {
    const counts: Record<string, { count: number; totalPrice: number }> = {};
    history.forEach(search => {
      const cheapest = search.estimates.reduce((a, b) => a.price < b.price ? a : b, search.estimates[0]);
      if (cheapest) {
        if (!counts[cheapest.serviceName]) {
          counts[cheapest.serviceName] = { count: 0, totalPrice: 0 };
        }
        counts[cheapest.serviceName].count++;
        counts[cheapest.serviceName].totalPrice += cheapest.price;
      }
    });
    return Object.entries(counts)
      .map(([name, data]) => ({ name, value: data.count, avgPrice: Math.round(data.totalPrice / data.count) }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [history]);

  // Price trends over time
  const priceTrends = useMemo(() => {
    const dayMap: Record<string, { total: number; count: number; min: number; max: number }> = {};
    history.forEach(search => {
      const day = format(new Date(search.timestamp), 'MMM dd');
      const cheapest = Math.min(...search.estimates.map(e => e.price));
      const priciest = Math.max(...search.estimates.map(e => e.price));
      if (!dayMap[day]) {
        dayMap[day] = { total: 0, count: 0, min: Infinity, max: 0 };
      }
      dayMap[day].total += cheapest;
      dayMap[day].count++;
      dayMap[day].min = Math.min(dayMap[day].min, cheapest);
      dayMap[day].max = Math.max(dayMap[day].max, priciest);
    });
    return Object.entries(dayMap)
      .map(([date, data]) => ({
        date,
        avg: Math.round(data.total / data.count),
        min: data.min === Infinity ? 0 : data.min,
        max: data.max,
      }))
      .slice(-10);
  }, [history]);

  // Most searched routes
  const topRoutes = useMemo(() => {
    const routes: Record<string, { count: number; pickup: string; dest: string; avgPrice: number; totalPrice: number }> = {};
    history.forEach(search => {
      const key = `${search.pickup.address}→${search.destination.address}`;
      const cheapest = Math.min(...search.estimates.map(e => e.price));
      if (!routes[key]) {
        routes[key] = { count: 0, pickup: search.pickup.address, dest: search.destination.address, avgPrice: 0, totalPrice: 0 };
      }
      routes[key].count++;
      routes[key].totalPrice += cheapest;
    });
    return Object.values(routes)
      .map(r => ({ ...r, avgPrice: Math.round(r.totalPrice / r.count) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [history]);

  // Summary stats
  const stats = useMemo(() => {
    if (history.length === 0) return { totalSearches: 0, avgSaving: 0, totalSaved: 0, mostUsed: '' };
    let totalSaved = 0;
    history.forEach(search => {
      const prices = search.estimates.map(e => e.price);
      const cheapest = Math.min(...prices);
      const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
      totalSaved += Math.max(0, Math.round(avg - cheapest));
    });
    const mostUsed = serviceDistribution[0]?.name || 'N/A';
    return {
      totalSearches: history.length,
      avgSaving: history.length > 0 ? Math.round(totalSaved / history.length) : 0,
      totalSaved,
      mostUsed,
    };
  }, [history, serviceDistribution]);

  // Time-of-day distribution
  const hourlyData = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => ({ hour: `${i}:00`, searches: 0 }));
    history.forEach(search => {
      const hour = new Date(search.timestamp).getHours();
      hours[hour].searches++;
    });
    return hours.filter(h => h.searches > 0);
  }, [history]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Analytics
          </DrawerTitle>
        </DrawerHeader>

        <div className="px-4 pb-8 overflow-y-auto max-h-[75vh]">
          {/* Period selector */}
          <div className="flex gap-2 mb-5">
            {(['7d', '30d', 'all'] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 rounded-full text-xs transition-all ${
                  period === p
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
                style={{ fontWeight: period === p ? 600 : 400 }}
              >
                {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : 'All Time'}
              </button>
            ))}
          </div>

          {history.length === 0 ? (
            <Card className="p-8 text-center rounded-2xl border-0 shadow-sm">
              <BarChart3 className="w-12 h-12 text-gray-200 dark:text-gray-700 mx-auto mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No search data yet. Start comparing prices to see your analytics!
              </p>
            </Card>
          ) : (
            <>
              {/* Summary stats */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <Card className="p-3 rounded-xl border-0 shadow-sm">
                  <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 mb-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span className="text-[10px]" style={{ fontWeight: 600 }}>Total Saved</span>
                  </div>
                  <p className="text-gray-900 dark:text-white" style={{ fontSize: '20px', fontWeight: 700 }}>
                    ₦{stats.totalSaved.toLocaleString()}
                  </p>
                </Card>
                <Card className="p-3 rounded-xl border-0 shadow-sm">
                  <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[10px]" style={{ fontWeight: 600 }}>Searches</span>
                  </div>
                  <p className="text-gray-900 dark:text-white" style={{ fontSize: '20px', fontWeight: 700 }}>
                    {stats.totalSearches}
                  </p>
                </Card>
                <Card className="p-3 rounded-xl border-0 shadow-sm">
                  <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 mb-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span className="text-[10px]" style={{ fontWeight: 600 }}>Avg Saving</span>
                  </div>
                  <p className="text-gray-900 dark:text-white" style={{ fontSize: '20px', fontWeight: 700 }}>
                    ₦{stats.avgSaving.toLocaleString()}
                  </p>
                </Card>
                <Card className="p-3 rounded-xl border-0 shadow-sm">
                  <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-[10px]" style={{ fontWeight: 600 }}>Top Service</span>
                  </div>
                  <p className="text-gray-900 dark:text-white truncate" style={{ fontSize: '16px', fontWeight: 700 }}>
                    {stats.mostUsed}
                  </p>
                </Card>
              </div>

              {/* Price trends chart */}
              {priceTrends.length > 1 && (
                <Card className="p-4 rounded-xl border-0 shadow-sm mb-5">
                  <h3 className="text-sm text-gray-900 dark:text-white mb-3" style={{ fontWeight: 600 }}>
                    Price Trends
                  </h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={priceTrends} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₦${(v/1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value: number) => [`₦${value.toLocaleString()}`, '']} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 12 }} />
                        <Line type="monotone" dataKey="min" stroke="#16a34a" strokeWidth={2} dot={{ r: 3 }} name="Cheapest" />
                        <Line type="monotone" dataKey="avg" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} name="Average" />
                        <Line type="monotone" dataKey="max" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} name="Most Expensive" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex gap-4 mt-2 justify-center">
                    {[{ color: '#16a34a', label: 'Min' }, { color: '#2563eb', label: 'Avg' }, { color: '#ef4444', label: 'Max' }].map(l => (
                      <div key={l.label} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                        <span className="text-[10px] text-gray-500 dark:text-gray-400">{l.label}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Service distribution */}
              {serviceDistribution.length > 0 && (
                <Card className="p-4 rounded-xl border-0 shadow-sm mb-5">
                  <h3 className="text-sm text-gray-900 dark:text-white mb-3" style={{ fontWeight: 600 }}>
                    Cheapest Service Distribution
                  </h3>
                  <div className="h-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={serviceDistribution} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 12 }} />
                        <Bar dataKey="value" name="Times Cheapest" radius={[6, 6, 0, 0]}>
                          {serviceDistribution.map((_, index) => (
                            <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              )}

              {/* Top routes */}
              {topRoutes.length > 0 && (
                <Card className="p-4 rounded-xl border-0 shadow-sm mb-5">
                  <h3 className="text-sm text-gray-900 dark:text-white mb-3" style={{ fontWeight: 600 }}>
                    Most Searched Routes
                  </h3>
                  <div className="space-y-3">
                    {topRoutes.map((route, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center flex-shrink-0 text-green-600 dark:text-green-400 text-xs" style={{ fontWeight: 700 }}>
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300 truncate">
                            <span className="truncate">{route.pickup.split(',')[0]}</span>
                            <ArrowRight className="w-3 h-3 flex-shrink-0 text-gray-400" />
                            <span className="truncate">{route.dest.split(',')[0]}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                            Avg ₦{route.avgPrice.toLocaleString()} · {route.count}x
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-[10px] rounded-full">
                          {route.count}x
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Search time distribution */}
              {hourlyData.length > 0 && (
                <Card className="p-4 rounded-xl border-0 shadow-sm">
                  <h3 className="text-sm text-gray-900 dark:text-white mb-3" style={{ fontWeight: 600 }}>
                    When You Search
                  </h3>
                  <div className="h-36">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={hourlyData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                        <XAxis dataKey="hour" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 12 }} />
                        <Bar dataKey="searches" name="Searches" fill="#16a34a" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
