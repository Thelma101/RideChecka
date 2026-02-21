// Push notification center with preference controls and smart management
import React, { useState, useEffect, useCallback } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from './ui/drawer';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Bell, BellOff, TrendingDown, Clock, AlertTriangle, Zap, Star, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

const NOTIF_PREFS_KEY = 'ridechecka_notif_prefs';
const NOTIF_LOG_KEY = 'ridechecka_notifications';

interface NotifPrefs {
  enabled: boolean;
  priceDrops: boolean;
  surgeAlerts: boolean;
  dailyDigest: boolean;
  promoDeals: boolean;
  routeUpdates: boolean;
  quietHoursStart: number; // 0-23
  quietHoursEnd: number;
}

interface Notification {
  id: string;
  type: 'price_drop' | 'surge' | 'promo' | 'route_update' | 'system';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  actionUrl?: string;
}

function getNotifPrefs(): NotifPrefs {
  try {
    const stored = localStorage.getItem(NOTIF_PREFS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {
    enabled: true,
    priceDrops: true,
    surgeAlerts: true,
    dailyDigest: false,
    promoDeals: true,
    routeUpdates: true,
    quietHoursStart: 22,
    quietHoursEnd: 7,
  };
}

function saveNotifPrefs(prefs: NotifPrefs) {
  localStorage.setItem(NOTIF_PREFS_KEY, JSON.stringify(prefs));
}

function getNotifications(): Notification[] {
  try {
    const stored = localStorage.getItem(NOTIF_LOG_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  // Return mock notifications
  return [
    {
      id: 'n1',
      type: 'price_drop',
      title: 'Price Drop Alert',
      message: 'Bolt prices on Lekki → VI route dropped 15% in the last hour!',
      timestamp: Date.now() - 1800000,
      read: false,
    },
    {
      id: 'n2',
      type: 'surge',
      title: 'Surge Warning',
      message: 'High demand detected near Ikeja. Consider waiting 30 minutes for better prices.',
      timestamp: Date.now() - 7200000,
      read: false,
    },
    {
      id: 'n3',
      type: 'promo',
      title: 'New Deal Available',
      message: 'inDriver is offering 20% off all rides this evening. Compare now!',
      timestamp: Date.now() - 14400000,
      read: true,
    },
    {
      id: 'n4',
      type: 'system',
      title: 'Welcome to RideChecka',
      message: 'Start comparing ride prices across 50+ services to save money on every trip.',
      timestamp: Date.now() - 86400000,
      read: true,
    },
  ];
}

function saveNotifications(notifs: Notification[]) {
  localStorage.setItem(NOTIF_LOG_KEY, JSON.stringify(notifs));
}

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  price_drop: { icon: TrendingDown, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/40' },
  surge: { icon: AlertTriangle, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/40' },
  promo: { icon: Zap, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/40' },
  route_update: { icon: Clock, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/40' },
  system: { icon: Star, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/40' },
};

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

interface NotificationCenterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotificationCenter({ open, onOpenChange }: NotificationCenterProps) {
  const [prefs, setPrefs] = useState<NotifPrefs>(getNotifPrefs);
  const [notifications, setNotifications] = useState<Notification[]>(getNotifications);
  const [showPrefs, setShowPrefs] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const updatePref = useCallback((key: keyof NotifPrefs, value: boolean) => {
    setPrefs(prev => {
      const updated = { ...prev, [key]: value };
      saveNotifPrefs(updated);
      return updated;
    });
    if (navigator.vibrate) navigator.vibrate(5);
  }, []);

  const markAllRead = useCallback(() => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    saveNotifications(updated);
    toast.success('All notifications marked as read');
  }, [notifications]);

  const clearAll = useCallback(() => {
    setNotifications([]);
    saveNotifications([]);
    if (navigator.vibrate) navigator.vibrate(10);
    toast.success('Notifications cleared');
  }, []);

  const markRead = useCallback((id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    saveNotifications(updated);
  }, [notifications]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="flex items-center justify-between pb-2">
          <DrawerTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white text-[10px] px-1.5 h-5 rounded-full">
                {unreadCount}
              </Badge>
            )}
          </DrawerTitle>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPrefs(!showPrefs)}
              className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full"
            >
              {showPrefs ? 'Inbox' : 'Settings'}
            </button>
            {!showPrefs && notifications.length > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-red-500 bg-red-50 dark:bg-red-900/30 px-2 py-1.5 rounded-full"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        </DrawerHeader>

        <div className="px-4 pb-6 overflow-y-auto max-h-[65vh]">
          {showPrefs ? (
            // Notification preferences
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label className="text-sm text-gray-900 dark:text-gray-100" style={{ fontWeight: 600 }}>
                    Enable Notifications
                  </Label>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Master switch for all notifications</p>
                </div>
                <Switch checked={prefs.enabled} onCheckedChange={(v) => updatePref('enabled', v)} />
              </div>

              {prefs.enabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-3 border-t border-gray-100 dark:border-gray-800 pt-3"
                >
                  {[
                    { key: 'priceDrops' as const, label: 'Price Drop Alerts', desc: 'When prices drop on your saved routes' },
                    { key: 'surgeAlerts' as const, label: 'Surge Warnings', desc: 'When surge pricing is detected' },
                    { key: 'promoDeals' as const, label: 'Promo & Deals', desc: 'New discounts and offers' },
                    { key: 'routeUpdates' as const, label: 'Route Updates', desc: 'Changes on your favorite routes' },
                    { key: 'dailyDigest' as const, label: 'Daily Digest', desc: 'Summary of best prices at 8am' },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between py-1">
                      <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300" style={{ fontWeight: 500 }}>{label}</p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500">{desc}</p>
                      </div>
                      <Switch checked={prefs[key]} onCheckedChange={(v) => updatePref(key, v)} />
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ) : (
            // Notification list
            <div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-green-600 dark:text-green-400 mb-3 block"
                  style={{ fontWeight: 500 }}
                >
                  Mark all as read
                </button>
              )}

              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <BellOff className="w-12 h-12 text-gray-200 dark:text-gray-700 mx-auto mb-3" />
                  <p className="text-sm text-gray-400 dark:text-gray-500">No notifications yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <AnimatePresence>
                    {notifications.map((notif) => {
                      const config = typeConfig[notif.type] || typeConfig.system;
                      const Icon = config.icon;
                      return (
                        <motion.div
                          key={notif.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          className={`p-3.5 rounded-xl transition-all ${
                            notif.read
                              ? 'bg-gray-50 dark:bg-gray-900/50'
                              : 'bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700'
                          }`}
                          onClick={() => markRead(notif.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${config.bg}`}>
                              <Icon className={`w-4 h-4 ${config.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <p className="text-sm text-gray-900 dark:text-gray-100 truncate" style={{ fontWeight: notif.read ? 400 : 600 }}>
                                  {notif.title}
                                </p>
                                {!notif.read && (
                                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{notif.message}</p>
                              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">{timeAgo(notif.timestamp)}</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function useUnreadNotifCount(): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const notifs = getNotifications();
    setCount(notifs.filter(n => !n.read).length);
  }, []);

  return count;
}
