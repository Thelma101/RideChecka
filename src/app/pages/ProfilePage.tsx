// Profile page — native mobile app settings with dark mode toggle, notifications, and analytics
import { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '../components/ui/drawer';
import { Switch } from '../components/ui/switch';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { NotificationCenter, useUnreadNotifCount } from '../components/NotificationCenter';
import { getUser, saveUser, clearUser, getLanguage, saveLanguage } from '../services/storage';
import { signUpWithPhone, signInWithPhone, signInWithGoogle, signInWithApple, signOut as authSignOut, getCurrentUser as getAuthUser } from '../services/auth';
import { User as UserIcon, LogOut, Globe, ChevronRight, Shield, Bell, Moon, Sun, Monitor, Smartphone, Palette, FileText, HelpCircle } from 'lucide-react';
import { User, Language } from '../types';
import { t } from '../utils/i18n';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { useTheme, ThemeMode } from '../contexts/ThemeContext';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router';
import { Onboarding } from '../components/Onboarding';

export function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>(getLanguage());
  const [showAuthDrawer, setShowAuthDrawer] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [authPhone, setAuthPhone] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');
  const { theme, resolvedTheme, setTheme, isOLED, setIsOLED } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const unreadCount = useUnreadNotifCount();
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Try Supabase auth first, then fall back to localStorage
    getAuthUser().then((authUser) => {
      if (authUser) {
        setUser({ id: authUser.id, name: authUser.fullName, email: authUser.phone || authUser.email || '', language });
      } else {
        setUser(getUser());
      }
    }).catch(() => setUser(getUser()));
  }, []);

  const handleSignIn = async () => {
    if (authMode === 'signup' && !authName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!authPhone.trim() || !/^(\+?234|0)[0-9]{10}$/.test(authPhone.replace(/\s/g, ''))) {
      toast.error('Enter a valid Nigerian phone number');
      return;
    }
    if (!authPassword || authPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      let authUser;
      if (authMode === 'signin') {
        authUser = await signInWithPhone(authPhone.trim(), authPassword);
      } else {
        authUser = await signUpWithPhone(authName.trim(), authPhone.trim(), authPassword);
      }
      const newUser: User = {
        id: authUser.id,
        name: authUser.fullName,
        email: authUser.phone,
        language,
      };
      saveUser(newUser);
      setUser(newUser);
      setShowAuthDrawer(false);
      toast.success(authMode === 'signin' ? 'Welcome back!' : 'Welcome to RideChecka!');
    } catch (err: any) {
      if (authMode === 'signin') {
        toast.error(err?.message || 'Invalid credentials. Please try again.');
        return;
      }
      // Fall back to local for sign-up
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: authName.trim(),
        email: authPhone.trim(),
        language,
      };
      saveUser(newUser);
      setUser(newUser);
      setShowAuthDrawer(false);
      toast.success('Welcome to RideChecka!');
    }
    setAuthPhone('');
    setAuthName('');
    setAuthPassword('');
  };

  const handleSignOut = async () => {
    if (navigator.vibrate) navigator.vibrate(10);
    await authSignOut();
    clearUser();
    setUser(null);
    toast.success('Signed out successfully');
  };

  const handleLanguageChange = (newLang: Language) => {
    if (navigator.vibrate) navigator.vibrate(5);
    setLanguage(newLang);
    saveLanguage(newLang);
    if (user) {
      const updatedUser = { ...user, language: newLang };
      saveUser(updatedUser);
      setUser(updatedUser);
    }
    toast.success('Language updated');
    window.location.reload();
  };

  const themeOptions: { value: ThemeMode; icon: React.ElementType; label: string }[] = [
    { value: 'light', icon: Sun, label: t('lightMode', language) },
    { value: 'dark', icon: Moon, label: t('darkMode', language) },
    { value: 'system', icon: Monitor, label: t('systemTheme', language) },
  ];

  return (
    <div className={`min-h-full ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Profile Header */}
      <div className={`px-5 pt-14 pb-8 border-b ${
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 ${
            isDark ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <UserIcon className={`w-10 h-10 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          {user ? (
            <>
              <h1 className={`text-xl mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 700 }}>{user.name}</h1>
              <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{user.email}</p>
            </>
          ) : (
            <>
              <h1 className={`text-xl mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 700 }}>Guest User</h1>
              <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Sign in to save your preferences</p>
            </>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 pb-6 -mt-3 relative z-10">
        {/* Account section */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className={`rounded-2xl border-0 shadow-sm overflow-hidden mb-4 ${
            isDark ? 'bg-gray-900 shadow-black/20' : ''
          }`}>
            <button
              onClick={() => user ? handleSignOut() : setShowAuthDrawer(true)}
              className={`w-full flex items-center gap-4 p-4 transition-colors ${
                isDark ? 'active:bg-gray-800' : 'active:bg-gray-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                user
                  ? isDark ? 'bg-green-900/40' : 'bg-green-100'
                  : isDark ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <UserIcon className={`w-5 h-5 ${
                  user
                    ? isDark ? 'text-green-400' : 'text-green-600'
                    : isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
              <div className="flex-1 text-left">
                <p className={`${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '15px', fontWeight: 600 }}>Account</p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  {user ? 'Signed in' : 'Not signed in'}
                </p>
              </div>
              {user ? (
                <LogOut className={`w-5 h-5 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
              ) : (
                <span className="text-xs bg-green-600 text-white px-3 py-1 rounded-lg" style={{ fontWeight: 600 }}>
                  Sign Up
                </span>
              )}
            </button>
          </Card>
        </motion.div>

        {/* Appearance section */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.12 }}
        >
          <h2 className={`text-xs px-1 mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} style={{ fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {t('appearance', language)}
          </h2>
          <Card className={`rounded-2xl border-0 shadow-sm overflow-hidden mb-4 ${
            isDark ? 'bg-gray-900 shadow-black/20' : ''
          }`}>
            {/* Theme selector */}
            <div className={`p-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-50'}`}>
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <Palette className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                </div>
                <p className={`flex-1 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '15px', fontWeight: 500 }}>
                  Theme
                </p>
              </div>
              <div className="flex gap-2 ml-14">
                {themeOptions.map(({ value, icon: Icon, label }) => (
                  <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all active:scale-[0.97] ${
                      theme === value
                        ? isDark
                          ? 'bg-gray-700 border border-gray-600'
                          : 'bg-gray-200 border border-gray-300'
                        : isDark
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-gray-50 border border-gray-100'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${
                      theme === value
                        ? isDark ? 'text-white' : 'text-gray-900'
                        : isDark ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <span className={`text-[10px] ${
                      theme === value
                        ? isDark ? 'text-white' : 'text-gray-900'
                        : isDark ? 'text-gray-400' : 'text-gray-500'
                    }`} style={{ fontWeight: theme === value ? 600 : 400 }}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* OLED mode toggle */}
            {(theme === 'dark' || (theme === 'system' && isDark)) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className={`flex items-center gap-4 p-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-50'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <Smartphone className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <div className="flex-1">
                  <p className={`${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '15px', fontWeight: 500 }}>
                    {t('oledMode', language)}
                  </p>
                  <p className={`text-[11px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    True black background for OLED screens
                  </p>
                </div>
                <Switch checked={isOLED} onCheckedChange={setIsOLED} />
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Settings section */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className={`text-xs px-1 mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} style={{ fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {t('settings', language)}
          </h2>
          <Card className={`rounded-2xl border-0 shadow-sm overflow-hidden mb-4 ${
            isDark ? 'bg-gray-900 shadow-black/20' : ''
          }`}>
            {/* Language */}
            <div className={`flex items-center gap-4 p-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-50'}`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <Globe className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </div>
              <div className="flex-1">
                <p className={`${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '15px', fontWeight: 500 }}>
                  {t('language', language)}
                </p>
              </div>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className={`w-[120px] h-9 text-sm rounded-lg ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200'}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{t('english', language)}</SelectItem>
                  <SelectItem value="yo">{t('yoruba', language)}</SelectItem>
                  <SelectItem value="ha">{t('hausa', language)}</SelectItem>
                  <SelectItem value="ig">{t('igbo', language)}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notifications */}
            <button
              onClick={() => setShowNotifications(true)}
              className={`w-full flex items-center gap-4 p-4 border-b transition-colors ${
                isDark ? 'border-gray-800 active:bg-gray-800' : 'border-gray-50 active:bg-gray-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <Bell className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </div>
              <div className="flex-1 text-left">
                <p className={`${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '15px', fontWeight: 500 }}>
                  {t('notifications', language)}
                </p>
                {unreadCount > 0 && (
                  <p className={`text-[11px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {unreadCount} unread
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Badge className="bg-red-500 text-white text-[10px] px-1.5 h-5 rounded-full">
                    {unreadCount}
                  </Badge>
                )}
                <ChevronRight className={`w-5 h-5 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
              </div>
            </button>

            {/* Privacy */}
            <div className={`flex items-center gap-4 p-4 opacity-60`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <Shield className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </div>
              <div className="flex-1">
                <p className={`${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '15px', fontWeight: 500 }}>
                  {t('privacy', language)}
                </p>
                <p className={`text-[11px] ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>Coming soon</p>
              </div>
              <ChevronRight className={`w-5 h-5 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
            </div>

            {/* Documentation Center */}
            <button
              onClick={() => navigate('/docs')}
              className={`w-full flex items-center gap-4 p-4 border-b transition-colors ${
                isDark ? 'border-gray-800 active:bg-gray-800' : 'border-gray-50 active:bg-gray-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isDark ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <FileText className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </div>
              <div className="flex-1 text-left">
                <p className={`${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '15px', fontWeight: 500 }}>
                  Documentation
                </p>
                <p className={`text-[11px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>How it works, guides & brand info</p>
              </div>
              <ChevronRight className={`w-5 h-5 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
            </button>

            {/* App Tour / Onboarding replay */}
            <button
              onClick={() => setShowOnboarding(true)}
              className={`w-full flex items-center gap-4 p-4 transition-colors ${
                isDark ? 'active:bg-gray-800' : 'active:bg-gray-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isDark ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <HelpCircle className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </div>
              <div className="flex-1 text-left">
                <p className={`${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '15px', fontWeight: 500 }}>
                  App Tour & Info
                </p>
                <p className={`text-[11px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Replay onboarding & feature guide</p>
              </div>
              <ChevronRight className={`w-5 h-5 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
            </button>
          </Card>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={`text-xs px-1 mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} style={{ fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {t('about', language)}
          </h2>
          <Card className={`rounded-2xl border-0 shadow-sm overflow-hidden mb-4 p-5 ${
            isDark ? 'bg-gray-900 shadow-black/20' : ''
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🚗</span>
              </div>
              <div>
                <h3 className={`${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 700 }}>
                  {t('appName', language)}
                </h3>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {t('version', language)} 2.0.0
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '16', label: 'Services' },
                { value: '99.9%', label: 'Uptime' },
                { value: '<1s', label: 'Response' },
              ].map((stat, idx) => (
                <div key={idx} className={`text-center p-3 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <p className={`${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '20px', fontWeight: 700 }}>
                    {stat.value}
                  </p>
                  <p className={`text-[10px] mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Premium card */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <Card className={`rounded-2xl border shadow-sm overflow-hidden p-5 ${
            isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isDark ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <span className="text-xl">⭐</span>
              </div>
              <div>
                <h3 className={`mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '15px', fontWeight: 600 }}>
                  {t('premium', language)} Coming Soon
                </h3>
                <ul className={`text-xs space-y-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li>• Price alerts & notifications</li>
                  <li>• Route optimization</li>
                  <li>• Driver ratings comparison</li>
                  <li>• Multi-stop routing</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Accessibility note */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4"
        >
          <div className={`rounded-2xl p-4 border ${
            isDark ? 'border-gray-800 bg-gray-900/50' : 'border-gray-100 bg-gray-50'
          }`}>
            <p className={`text-[11px] text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              RideChecka supports WCAG 2.1 accessibility standards.
              <br />
              Dark mode is optimized for OLED displays.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Auth Drawer — sign-up / sign-in form */}
      <Drawer open={showAuthDrawer} onOpenChange={setShowAuthDrawer}>
        <DrawerContent className={isDark ? 'bg-gray-900 border-gray-800' : ''}>
          <DrawerHeader>
            <DrawerTitle className={isDark ? 'text-white' : ''}>
              {authMode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </DrawerTitle>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {authMode === 'signin'
                ? 'Sign in to access your saved data'
                : 'Sign up to save preferences & report fares'}
            </p>
          </DrawerHeader>

          <div className="px-5 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {authMode === 'signup' && (
              <div>
                <Label htmlFor="auth-name" className={`mb-2 block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name
                </Label>
                <Input
                  id="auth-name"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  placeholder="e.g. Firstname Lastname"
                  className={`rounded-xl h-12 ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}
                  autoComplete="name"
                />
              </div>
            )}
            <div>
              <Label htmlFor="auth-phone" className={`mb-2 block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Phone Number
              </Label>
              <Input
                id="auth-phone"
                type="tel"
                value={authPhone}
                onChange={(e) => setAuthPhone(e.target.value)}
                placeholder="e.g. 08012345678"
                className={`rounded-xl h-12 ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}
                autoComplete="tel"
              />
            </div>
            <div>
              <Label htmlFor="auth-password" className={`mb-2 block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </Label>
              <div className="relative">
                <Input
                  id="auth-password"
                  type={showPw ? 'text' : 'password'}
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className={`rounded-xl h-12 pr-10 ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}
                  autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <Button onClick={handleSignIn} className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 text-sm font-semibold">
              {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
            </Button>

            {/* Toggle between sign-in / sign-up */}
            <button
              onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
              className={`w-full text-center text-sm py-1 ${isDark ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'}`}
            >
              {authMode === 'signin'
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Sign In'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className={`h-px flex-1 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>or continue with</span>
              <div className={`h-px flex-1 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={async () => {
                  try {
                    await signInWithGoogle();
                    setShowAuthDrawer(false);
                  } catch (err: any) {
                    toast.error(err?.message || 'Google sign-in failed');
                  }
                }}
                className={`w-full rounded-xl h-11 ${isDark ? 'border-gray-700' : ''}`}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                onClick={async () => {
                  try {
                    await signInWithApple();
                    setShowAuthDrawer(false);
                  } catch (err: any) {
                    toast.error(err?.message || 'Apple sign-in failed');
                  }
                }}
                className={`w-full rounded-xl h-11 ${isDark ? 'border-gray-700' : ''}`}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Apple
              </Button>
            </div>
          </div>

          <DrawerFooter>
            <button
              onClick={() => setShowAuthDrawer(false)}
              className={`w-full text-center text-sm py-2 ${isDark ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Cancel
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Notification Center */}
      <NotificationCenter
        open={showNotifications}
        onOpenChange={setShowNotifications}
      />

      {/* Onboarding replay overlay */}
      {showOnboarding && (
        <Onboarding onComplete={() => setShowOnboarding(false)} />
      )}
    </div>
  );
}